
module.exports = {
  multipass: true,
  plugins: [
    'cleanupEnableBackground',
    // 'collapseGroups', // bugged?
    'convertPathData',
    'mergePaths',
    'removeTitle',
    'removeViewBox',
    'sortAttrs'
  ]
}
