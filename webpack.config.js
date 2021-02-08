
module.exports = {
    resolve: {
        alias: {
            vue: 'vue/dist/vue.js'
        }
    },
     module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
          test: /\.svg$/,
          use: {
            loader: 'svg-inline-loader'
          }
      }
    ]
  }
}