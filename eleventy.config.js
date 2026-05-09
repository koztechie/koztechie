export default function(eleventyConfig) {
  // Pass through static assets
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy({ "src/assets/img": "assets/img" });
  eleventyConfig.addPassthroughCopy("src/robots.txt");

  // Watch targets
  eleventyConfig.addWatchTarget("src/assets/css/");
  eleventyConfig.addWatchTarget("src/assets/js/");

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
