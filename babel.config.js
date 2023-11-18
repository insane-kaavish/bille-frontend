module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
// module.exports = {
//   assets: ['./extra/fonts'],
// };