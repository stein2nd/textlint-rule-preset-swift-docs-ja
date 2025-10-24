export default {
    rules: {
      "preset-ja-technical-writing": true,
      terminology: {
        defaultTerms: false,
        terms: new URL("../../dict/terminology.json", import.meta.url).pathname
      },
      "no-doubled-joshi": true,
      "ja-no-abusage": true,
      "ja-space-between-half-and-full-width": true
    },
    filters: {
      comments: true,
      code: {
        allow: ["swift"]
      }
    }
  };
  