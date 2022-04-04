const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/df',
    createProxyMiddleware({
      target: 'https://api.neople.co.kr',
      changeOrigin: true,
    })
  );
  app.use(
    '/server',
    createProxyMiddleware({
      target: 'http://169.254.130.121:23129',
      changeOrigin: true,
    })
  );
};