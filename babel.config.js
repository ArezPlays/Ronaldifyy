module.exports = function (api) {
  api.cache(true);
  return {
    presets: [["babel-preset-expo", { unstable_transformImportMeta: true }]],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./"],          // project root
          alias: {
            "@": "./app"          // @/ → app folder
          },
        },
      ],
    ],
  };
};
