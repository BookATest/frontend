module.exports = {
  baseUrl: "/",
  outputDir: "dist",
  indexPath: "index.html",
  filenameHashing: true,
  lintOnSave: true,
  productionSourceMap: true,
  pluginOptions: {
    s3Deploy: {
      region: 'eu-west-1',
      bucket: undefined,
      assetPath: 'dist',
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: undefined,
      cloudfrontMatchers: '/*',
      uploadConcurrency: 5,
      pluginVersion: '3.0.0'
    }
  }
}
