// all gulp tasks are located in the ./build/tasks directory
// gulp configuration is in files in ./build directory
require('require-dir')('build/tasks');

var gulp      = require('gulp'),
    rename    = require('gulp-rename'),     
    sass      = require('gulp-sass'),/* ,  */      
    minifyCss = require('gulp-minify-css'),
    uglify    = require('gulp-uglify'); 
	
	/* Compilation de SASS */
gulp.task('css', function() {
  return gulp.src('./styles/sass/*.scss')    // Prend en entr�e les fichiers *.scss
    .pipe(sass({
        style: 'compressed',
        errLogToConsole: false,
        onError: function(err) {
            return notify().write(err);
        }
    }))                      // Compile les fichiers
    .pipe(minifyCss())                 // Minifie le CSS qui a �t� g�n�r�
    .pipe(gulp.dest('./styles/css/'));  // Sauvegarde le tout dans /src/style
});

	/* Minifie les fichiers JS */
gulp.task('js-uglify', function(){
  return gulp.src('./src/*.js')    // Prend en entr�e les fichiers *.src.js
    .pipe(rename(function(path){
      // Il y a diff�rentes m�thodes pour renommer les fichiers
      // Voir ici pour plus d'infos : https://www.npmjs.org/package/gulp-rename
      path.basename = path.basename.replace(".js$", ".min.js");
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));
});