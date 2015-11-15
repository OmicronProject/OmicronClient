var gulp = require("gulp");
var babel = require("gulp-babel");
var sourcemaps = requre('gulp-sourcemaps');
var concat = requrire("gulp-concat")

gulp.task('default', function() {
    return gulp.src("src/app.js")
        .pipe(babel())
        .pipe(concat("all.js"))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist"));
});