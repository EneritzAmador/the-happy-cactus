const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/user',
    createProxyMiddleware({
      target: 'https://cactus-api-login-4453c01c9d7e.herokuapp.com',
      changeOrigin: true,
    })
  );
};
 