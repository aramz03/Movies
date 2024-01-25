"use strict";

var gulp = require("gulp");
var concat = require("gulp-concat");
var watch = require("gulp-watch");

gulp.task("make-css", function () {
  return gulp
    .src(["resources/css/*.css"])
    .pipe(concat("all.css"))
    .pipe(gulp.dest("public"));
});

gulp.task("make-js", function () {
  return gulp
    .src(["resources/js/*.js"])
    .pipe(concat("all.js"))
    .pipe(gulp.dest("public"));
});

gulp.task("watch", function () {
  gulp.watch("resources/css/*.css", gulp.series(["make-css"]));
  gulp.watch("resources/js/*.js", gulp.series(["make-js"]));
});



gulp.task("make", gulp.series("make-css", "make-js", "watch"));