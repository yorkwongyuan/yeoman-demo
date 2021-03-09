const plugins = require('gulp-load-plugins')()
const { src, dest, series, watch } = require('gulp')
// const del = require('del')
const browserSync = require('browser-sync').create()
const reload = browserSync.reload

function serve (cb) {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })
  cb()
}
// 压缩js
function js (cb) {
  console.log('this is js')
  src('js/*.js')
  .pipe(plugins.uglify())
  .pipe(dest('./dist/js'))
  .pipe(reload({stream: true}))
  cb()
}
// 对css/less进行编译
function css (cb) {
  src('css/*.scss')
  .pipe(plugins.sass({outputStyle: 'compressed'}))
  .pipe(plugins.autoprefixer({
    cascade: false,
    remove: false
  }))
  .pipe(dest('./dist/css'))
  .pipe(reload({stream: true}))
  cb()
  console.log('this is css')
}
// 监听文件变化
function watcher (cb) {
  watch("js/*.js", js)
  watch("css/*.scss", css)
  cb()
  console.log('this is watcher')
}

// 删除dist中的目录
function clean (cb) {
  console.log('this is c1lean')
  // del('./dist')
  cb()
}
exports.js = js
exports.css = css
exports.watcher = watcher
exports.clean = clean
exports.default = series([
  clean,
  js,
  css,
  serve,
  watcher
])