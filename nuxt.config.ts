// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-08-15',
    // 是否开启ssr服务端渲染
    ssr: true,
    // 是否开启调试
    devtools: {enabled: true},
    // 应用模块
    modules: [
        // 轻量、可定制的移动端 Vue 组件库
        '@vant/nuxt',
    ],
    // 移动端适配
    postcss: {
        plugins: {
            'postcss-px-to-viewport': {
                viewportWidth: 375,
            },
        },
    },
})
