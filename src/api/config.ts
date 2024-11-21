export const serverConfig = {
    baseURL: process.env.NODE_ENV === 'production'
        ? 'https://ai-medical-assistant-web.vercel.app/api' // 生产环境使用 https
        : 'http://103.194.106.195:8000', // 非生产环境使用 http
    useTokenAuthorization: true // 是否开启 token 认证
};