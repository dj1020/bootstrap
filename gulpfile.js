var gulp = require('gulp'), 
    sass = require('gulp-ruby-sass') ,
    notify = require("gulp-notify") ,
    browserSync = require('browser-sync'),
    bower = require('gulp-bower');

var config = {
     sassPath: './resources/assets/sass',
     bowerDir: './bower_components' 
}

gulp.task('bower', function() { 
    return bower()
         .pipe(gulp.dest(config.bowerDir)) 
});

gulp.task('icons', function() { 
    return gulp.src(config.bowerDir + '/fontawesome/fonts/**.*') 
        .pipe(gulp.dest('./public/fonts')); 
});

gulp.task('css', function() { 
    return gulp.src(config.sassPath + '/style.scss')
         .pipe(sass({
             style: 'compressed',
             loadPath: [
                 './resources/sass',
                 config.bowerDir + '/bootstrap-sass-official/assets/stylesheets',
                 config.bowerDir + '/fontawesome/scss',
             ]
         }) 
            .on("error", notify.onError(function (error) {
                 return "Error: " + error.message;
             }))) 
         .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());
});

gulp.task('serve', ['css'], function() {

    browserSync.init({
        server: "./public"
    });

    gulp.watch(config.sassPath + "/**/*.scss", ['css']);
    gulp.watch(["public/*.html", "./public/css/**/*.css"]).on('change', browserSync.reload);
});

// Rerun the task when a file changes
 gulp.task('watch', function() {
     gulp.watch(config.sassPath + '/**/*.scss', ['css']); 
});

  gulp.task('default', ['bower', 'icons', 'css']);
