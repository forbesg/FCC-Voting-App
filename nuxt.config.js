module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'Voting App',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'A Voting App for Free Code Camp' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://picturepan2.github.io/spectre/dist/spectre.min.css'},
      { rel: 'stylesheet', href: 'https://picturepan2.github.io/spectre/dist/spectre-icons.min.css'}
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  /*
  ** Style loading bar
  */
  loading: {
    color: '#ddd',
    height: '1px'
  },
  /*
  ** Set Environment Variables for Nuxt
  */
  env: {
    baseUrl: process.env.HOST && process.env.PORT ? `${process.env.HOST}:${process.env.PORT}` : 'http://0.0.0.0:3000'
  }
}
