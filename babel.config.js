module.exports = (api) => {
  api.cache(false);

  const prodPlugins =
    process.env.NODE_ENV === 'production'
      ? ['@babel/plugin-transform-react-constant-elements']
      : [];

  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ...prodPlugins,
      '@babel/plugin-transform-runtime',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-proposal-decorators',
        {
          legacy: true,
        },
      ],
      "babel-plugin-lodash"
    ],
  };
};
