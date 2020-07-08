const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
	app.use(
		["/api/users/logout"],
		createProxyMiddleware({
			target: "http://localhost:3001",
		}),
	);
};
