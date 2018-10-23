const path = require('path');

module.exports = getAlias = () => ({
  '@src': path.resolve('./src'),
  '@core': path.resolve('./src/core'),
  '@components': path.resolve('./src/components'),
  '@antdSvgs': path.resolve('./node_modules/@ant-design/icons/lib/outline'),
});
