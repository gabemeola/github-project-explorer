const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack(config) {
    const isDev = config.mode !== 'production';
    config.module.rules.push({
      test: /\.(t|j)sx?$/,
      use: [
        {
          loader: 'linaria/loader',
          options: {
            sourceMap: isDev,
            cacheDirectory: '.cache/linaria',
          },
        },
      ],
    });

    // Fixes npm packages that depend on `fs` module
    config.node = {
      fs: 'empty',
    };

    // Resolve files from top level
    // e.g. `import Header from 'components/Header'`
    config.resolve.modules.push(__dirname);

    return config;
  },
});
