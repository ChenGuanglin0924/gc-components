const gulp = require("gulp");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const concat = require("gulp-concat");
const replace = require("gulp-replace");
const less = require("gulp-less");
const sourcemaps = require("gulp-sourcemaps");
const autoprefixer = require("gulp-autoprefixer");
const size = require("gulp-filesize");
const { resolve, name } = require("./util.js");

const distDir = resolve("dist");
const libDir = resolve("lib");
const esDir = resolve("es");
const lessDir = resolve("components/**/*.less");
const indexJsDir = resolve("components/**/style/index.js");

// 复制 less 文件到 lib es 文件夹下
gulp.task("copy-less", () => {
  return gulp
    .src(lessDir)
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(libDir))
    .pipe(gulp.dest(esDir));
});

// 根据 index.js 创建一个全新的 css.js 供按需加载 styel:'css' 使用
gulp.task("replace-indexjs", () => {
  return gulp
    .src(indexJsDir)
    .pipe(sourcemaps.init())
    .pipe(replace("less", "css"))
    .pipe(
      rename(function(path) {
        path.basename = "css";
        path.extname = ".js";
      })
    )
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(libDir))
    .pipe(gulp.dest(esDir));
});

// 编译 less 文件到 es 和 lib 文件夹下
gulp.task("compile-less", () => {
  return gulp
    .src(lessDir)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(libDir))
    .pipe(gulp.dest(esDir));
});

// 编译 less 到 dist 文件夹下
gulp.task("dist-css", () => {
  return gulp
    .src(lessDir)
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(autoprefixer())

    // .pipe(concat(`${name}.css`))
    // .pipe(size())
    // .pipe(sourcemaps.write("."))
    // .pipe(gulp.dest(distDir))

    .pipe(concat(`${name}.min.css`))
    .pipe(size())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write("."))
    .pipe(gulp.dest(distDir));
});

gulp.task("compile", gulp.series(gulp.parallel("copy-less", "replace-indexjs", "compile-less", "dist-css")));