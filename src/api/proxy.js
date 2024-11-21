// 该服务为 vercel serve跨域处理
const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = (req, res) => {
  let target = "";
  if (req.url.startsWith("/api")) {
    //这里使用/api可能会与vercel serverless 的 api 路径冲突，根据接口进行调整
    target = "http://103.194.106.195:8000"; //这里就是在vite中配置的一样
  }
  // 创建代理对象并转发请求
  createProxyMiddleware({
    target,
    changeOrigin: true,
    pathRewrite: {
      // 通过路径重写，去除请求路径中的 `/api`
      "^/api/": "/",
    },
  })(req, res);
};
