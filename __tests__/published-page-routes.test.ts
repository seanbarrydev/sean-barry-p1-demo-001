/**
 * The render pipeline itself is tested in the SDK (create-published-page.test.tsx).
 * What matters here is the wiring: that both routes are shims over the factory,
 * and that the segment config Next.js statically analyzes survives in the files.
 */

import { existsSync, readFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";
import { describe, expect, it, vi } from "vitest";

const __dirname = dirname(fileURLToPath(import.meta.url));
const starterDir = resolve(__dirname, "..");

const factory = vi.hoisted(() => ({
  Page: () => null,
  generateMetadata: vi.fn(),
  generateStaticParams: vi.fn(),
  getDocumentLanguage: vi.fn(),
}));

vi.mock("@pantheon-systems/p1-next-sdk/server", () => ({
  createPublishedPage: vi.fn(() => factory),
  loadRouteTemplateKeys: vi.fn(),
}));

// The routes reach these through app/published-pages.tsx. Mocked so this stays
// a wiring test: importing the real modules drags in the whole datasource graph,
// which is not installed when the built template's copy of this test runs
// inside the create-p1-starter-kit package.
vi.mock("../lib/remote-datasource-fetchers", () => ({
  REMOTE_DATASOURCE_FETCHERS: [],
}));

vi.mock("../app/[[...puckPath]]/client", () => ({ Client: () => null }));
vi.mock("../components/puck/welcome-block-render", () => ({
  WelcomeBlockRender: () => null,
}));

const routes = {
  catchAll: "app/[[...puckPath]]/page.tsx",
} as const;

describe("published page routes are shims over the SDK factory", () => {
  it("wires the catch-all route to the factory", async () => {
    const route = await import("../app/[[...puckPath]]/page");
    expect(route.default).toBe(factory.Page);
    expect(route.generateMetadata).toBe(factory.generateMetadata);
    expect(route.generateStaticParams).toBe(factory.generateStaticParams);
  });

  it.each([
    ["fr", "fr"],
    [null, "en"],
  ])(
    "sets the site's <html lang> from the page's language (%s gives %s)",
    async (language, lang) => {
      factory.getDocumentLanguage.mockResolvedValue(language);
      const { default: SiteLayout } = await import("../app/[[...puckPath]]/layout");
      const element = await SiteLayout({
        children: null,
        params: Promise.resolve({ puckPath: ["a-propos"] }),
      });
      expect(element.props.lang).toBe(lang);
    },
  );

  // The optional catch-all serves "/" too, so no other route may claim it.
  it("serves the home page through the catch-all route", () => {
    expect(existsSync(resolve(starterDir, "app/page.tsx"))).toBe(false);
  });

  // Publishing a route template refreshes the pages under the SDK's default
  // segments, which include this route's directory.
  it("leaves the refreshed page segment to the SDK's default", () => {
    const source = readFileSync(resolve(starterDir, "app/p1/api/[...p1]/route.ts"), "utf-8");
    expect(source).not.toContain("publicPageSegment");
  });

  // Next.js statically analyzes segment-config exports, so this value cannot be
  // re-exported through the factory — a computed or forwarded `revalidate` goes
  // undetected and the route silently loses its revalidation window.
  it.each(Object.values(routes))(
    "keeps revalidate a literal export in %s",
    (file) => {
      const source = readFileSync(resolve(starterDir, file), "utf-8");
      expect(source).toMatch(/^export const revalidate = \d+;$/m);
    },
  );

  // The pipeline is the SDK's now; a copy growing back here is the regression
  // this guards against.
  it.each(Object.values(routes))("leaves no pipeline logic in %s", (file) => {
    const source = readFileSync(resolve(starterDir, file), "utf-8");
    for (const symbol of [
      "loadPublishedPage",
      "loadRemoteDatasourceContext",
      "resolveDataTemplates",
      "isInternalPath",
      "notFound",
    ]) {
      expect(source).not.toContain(symbol);
    }
  });
});
