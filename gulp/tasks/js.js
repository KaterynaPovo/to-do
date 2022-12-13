import webpackStream from "webpack-stream";

export const js = () => {
  return (
    app.gulp
      .src(app.path.src.js, { sourcemap: true })
      .pipe(
        app.plugins.gulpPlumber(
          app.plugins.notify.onError({
            title: "JS",
            message: "Error: <%= error.message %>",
          })
        )
      )
      .pipe(
        webpackStream({
          mode: "development",
          output: {
            filename: "app.min.js",
          },
        })
      )
      // .pipe(app.plugins.replace(/@img\//g, "../img/"))
      // .pipe(
      //   sass({
      //     outputStyle: "expanded",
      //   })
      // )
      // .pipe(groupCssMediaQueries())
      // .pipe(
      //   webpcss({
      //     webpClass: ".webp",
      //     noWebpClass: ".no-webp",
      //   })
      // )
      // .pipe(
      //   autoPrefixer({
      //     grid: true,
      //     overrideBrowserslist: ["last 3 versions"],
      //     cascade: true,
      //   })
      // )
      // .pipe(GulpCleanCss())
      // .pipe(
      //   rename({
      //     extname: ".min.css",
      //   })
      // )
      .pipe(app.gulp.dest(app.path.build.js))
      .pipe(app.plugins.browserSync.stream())
  );
};
