const { createProxyMiddleware } = require('http-proxy-middleware');


// 수정하면 서버 재가동 해야됨
module.exports = function (app) {

	app.use(
		'/openapi',
		createProxyMiddleware({
			target: `http://api.data.go.kr/openapi`,
			changeOrigin: true,
			pathRewrite: {
				'^/openapi': '' // 하위 url 초기화
			}
		})
	);
};