import { Image } from "@11ty/eleventy-img";

export default function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");
  eleventyConfig.addPassthroughCopy("src/.well-known");

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");
  eleventyConfig.addWatchTarget("src/.well-known/");

  // ---------------------------------------------------------------------------
  // Collections
  // ---------------------------------------------------------------------------

  // Deduplicated array of language metadata (one entry per lang code)
  eleventyConfig.addCollection("languages", function(collectionApi) {
    const seen = new Set();
    return collectionApi
      .getAll()
      .filter((item) => item.data.lang)
      .reduce((acc, item) => {
        if (!seen.has(item.data.lang)) {
          seen.add(item.data.lang);
          acc.push({
            lang: item.data.lang,
            locale: item.data.locale,
            url: item.url,
            title: item.data.title
          });
        }
        return acc;
      }, []);
  });

  // Pages grouped by language code → { en: [...], uk: [...], ... }
  eleventyConfig.addCollection("pagesByLanguage", function(collectionApi) {
    return collectionApi
      .getAll()
      .filter((item) => item.data.lang)
      .reduce((groups, item) => {
        const key = item.data.lang;
        (groups[key] = groups[key] || []).push(item);
        return groups;
      }, {});
  });

  // ---------------------------------------------------------------------------
  // Image processing
  // ---------------------------------------------------------------------------

  // Responsive image shortcode (avif + webp + jpeg)
  eleventyConfig.addAsyncShortcode("image", async function(src, alt, sizes = "100vw") {
    const metadata = await Image(src, {
      widths: [400, 800, 1200],
      formats: ["avif", "webp", "jpeg"],
      outputDir: "_site/assets/img/",
      urlPath: "/assets/img/"
    });

    return Image.generateHTML(metadata, {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async"
    });
  });

  // Build an absolute image URL from a relative path
  eleventyConfig.addFilter("absoluteImageUrl", function(relativePath) {
    const siteUrl = this.ctx?.site?.url || "https://koztechie.pp.ua";
    const baseUrl = siteUrl.replace(/\/+$/, "");
    const cleanPath = relativePath.replace(/^\/+/, "");
    return `${baseUrl}/${cleanPath}`;
  });

  // ---------------------------------------------------------------------------
  // Icon shortcode — inline SVG by name
  // ---------------------------------------------------------------------------

  const ICONS = {
    github: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
   <path d="M0 0h256v256H0z" fill="none" />
   <path fill="currentColor" d="M208.31 75.68A59.78 59.78 0 0 0 202.93 28a8 8 0 0 0-6.93-4a59.75 59.75 0 0 0-48 24h-24a59.75 59.75 0 0 0-48-24a8 8 0 0 0-6.93 4a59.78 59.78 0 0 0-5.38 47.68A58.14 58.14 0 0 0 56 104v8a56.06 56.06 0 0 0 48.44 55.47A39.8 39.8 0 0 0 96 192v8H72a24 24 0 0 1-24-24a40 40 0 0 0-40-40a8 8 0 0 0 0 16a24 24 0 0 1 24 24a40 40 0 0 0 40 40h24v16a8 8 0 0 0 16 0v-40a24 24 0 0 1 48 0v40a8 8 0 0 0 16 0v-40a39.8 39.8 0 0 0-8.44-24.53A56.06 56.06 0 0 0 216 112v-8a58.14 58.14 0 0 0-7.69-28.32M200 112a40 40 0 0 1-40 40h-48a40 40 0 0 1-40-40v-8a41.74 41.74 0 0 1 6.9-22.48a8 8 0 0 0 1.1-7.69a43.8 43.8 0 0 1 .79-33.58a43.88 43.88 0 0 1 32.32 20.06a8 8 0 0 0 6.71 3.69h32.35a8 8 0 0 0 6.74-3.69a43.87 43.87 0 0 1 32.32-20.06a43.8 43.8 0 0 1 .77 33.58a8.09 8.09 0 0 0 1 7.65a41.7 41.7 0 0 1 7 22.52Z" />
</svg>`,
    twitter: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
   <path d="M0 0h256v256H0z" fill="none" />
   <path fill="currentColor" d="M247.39 68.94A8 8 0 0 0 240 64h-30.43a48.66 48.66 0 0 0-41.47-24a46.9 46.9 0 0 0-33.75 13.7A47.9 47.9 0 0 0 120 88v6.09C79.74 83.47 46.81 50.72 46.46 50.37a8 8 0 0 0-13.65 4.92c-4.31 47.79 9.57 79.77 22 98.18a111 111 0 0 0 21.88 24.2c-15.23 17.53-39.21 26.74-39.47 26.84a8 8 0 0 0-3.85 11.93c.75 1.12 3.75 5.05 11.08 8.72C53.51 229.7 65.48 232 80 232c70.67 0 129.72-54.42 135.75-124.44l29.91-29.9a8 8 0 0 0 1.73-8.72m-45 29.41a8 8 0 0 0-2.32 5.14C196 166.58 143.28 216 80 216c-10.56 0-18-1.4-23.22-3.08c11.51-6.25 27.56-17 37.88-32.48A8 8 0 0 0 92 169.08c-.47-.27-43.91-26.34-44-96c16 13 45.25 33.17 78.67 38.79A8 8 0 0 0 136 104V88a32 32 0 0 1 9.6-22.92A30.94 30.94 0 0 1 167.9 56c12.66.16 24.49 7.88 29.44 19.21a8 8 0 0 0 7.33 4.79h16Z" />
</svg>`,
    telegram: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
   <path d="M0 0h256v256H0z" fill="none" />
   <path fill="currentColor" d="M228.88 26.19a9 9 0 0 0-9.16-1.57L17.06 103.93a14.22 14.22 0 0 0 2.43 27.21L72 141.45V200a15.92 15.92 0 0 0 10 14.83a15.91 15.91 0 0 0 17.51-3.73l25.32-26.26L165 220a15.88 15.88 0 0 0 10.51 4a16.3 16.3 0 0 0 5-.79a15.85 15.85 0 0 0 10.67-11.63L231.77 35a9 9 0 0 0-2.89-8.81m-61.14 36l-89.59 64.16l-49.6-9.73ZM88 200v-47.48l24.79 21.74Zm87.53 8l-82.68-72.5l119-85.29Z" />
</svg>`,
    facebook: `<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256">
   <path d="M0 0h256v256H0z" fill="none" />
   <path fill="currentColor" d="M128 24a104 104 0 1 0 104 104A104.11 104.11 0 0 0 128 24m8 191.63V152h24a8 8 0 0 0 0-16h-24v-24a16 16 0 0 1 16-16h16a8 8 0 0 0 0-16h-16a32 32 0 0 0-32 32v24H96a8 8 0 0 0 0 16h24v63.63a88 88 0 1 1 16 0" />
</svg>`
  };

  eleventyConfig.addShortcode("icon", function(name, classes = "") {
    return ICONS[name] || "";
  });

  // ---------------------------------------------------------------------------
  // Filters
  // ---------------------------------------------------------------------------

  // Date filter
  eleventyConfig.addFilter("date", function(value, format) {
    if (value === "now") {
      return new Date().getFullYear().toString();
    }
    const d = new Date(value);
    if (format === "yyyy") return d.getFullYear().toString();
    if (format === "yyyy-MM-dd") return d.toISOString().split("T")[0];
    return d.toISOString();
  });

  // Shortcode для отримання перекладів за мовою
  eleventyConfig.addFilter("t", function(lang) {
    // translations доступні через глобальний data
    return this.ctx?.translations?.[lang] || {};
  });

  // Set template formats
  return {
    templateFormats: ["njk", "html", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    }
  };
}
