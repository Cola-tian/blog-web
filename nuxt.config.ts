// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/custom.scss'],
  modules: ['nuxt-quasar-ui'],
  plugins: [
    {
      src: '~/plugins/wang-editor',
      mode: 'client',
    }
  ],
  quasar: {
    plugins: [
      'BottomSheet',
      'Dialog',
      'Loading',
      'LoadingBar',
      'Notify',
      'Dark',
    ],
    extras: {
      font: 'roboto-font',
    },
    components: {
      defaults: {
        QBtn: {
          unelevated: true,
        },
      },
    },
  },
  runtimeConfig: {
    // 这个属性只能在服务端获取到
    apiSecret: '123',
    // public对象中的属性，服务端和客户端都能获取到
    public: {
      baseURL: 'http://127.0.0.1:7001'
    }
  }
});
