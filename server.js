const express = require('express');
const webpackDevMiddlware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config.js');

const app = express();

const compiler = webpack(webpackConfig)

app.use(express.static(__dirname + '/www'));

app.use(webpackDevMiddlware(compiler, {
  hot: true,
  filename: 'bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
  },
  historyApiFallback: true,
}));

app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname + '/www/index.html'));
});

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`App listening at http://${host}:${port}`);
})
