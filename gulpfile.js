//Declaración de variables asociado a las dependencias instaladas
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var obfuscate = require('gulp-obfuscate');
var sass = require('gulp-sass');
var browserSync = require("browser-sync").create();
//Ubicaciones de los archivos que se van a utilizar
var rutas = {
	rutaJS: './src/assets/js/*.js',
	rutaSCSS: './src/assets/scss/*.scss',
	html: "./src/**/*.html"
};
//Los cambios que se realizan en html de desarrollo los copia al html de public
gulp.task("mover_html",function(){
	gulp.src(rutas.html)
		.pipe(gulp.dest('./public'));
});
//Toma todos los js que hay en producción, los minifica y reemplaza caracteres(ofusca) y los copia a la carpeta public
gulp.task('pruebaJS', function(){
	gulp.src(rutas.rutaJS)
	.pipe(uglify())
	.pipe(obfuscate())
	.pipe(gulp.dest('public/assets/js/'))
});
//Toma el archivo scss y lo convierte a css y lo copia en la carpeta publica
gulp.task('pruebaCSS', function(){
	gulp.src(rutas.rutaSCSS)
	.pipe(sass({outputStyle:'compressed'})
	.on('error', sass.logError))
	.pipe(gulp.dest('public/assets/css/'))
});
//Cuando se encuentre algun cambio en el archivo scss el browser se actualice
gulp.task('sass-watch', ['pruebaCSS'],function(){
	browserSync.reload();
});
//Cuando se encuentre algun cambio en el archivo html el browser se actualice
gulp.task('html-watch',['mover_html'],function(){
	browserSync.reload();
});
//Cuando se encuentre algun cambio en el archivo js el browser se actualice
gulp.task('js-watch',['pruebaJS'],function(){
	browserSync.reload();
});
//Monitorea los cambios en cada archivo y lo refleja en el navegador
gulp.task('watchChangesCSS',function(){
	browserSync.init({
		server:{
			baseDir: "./public"
		}
	});
//Los 3 archivos que se monitorean en la función anterior
	gulp.watch(rutas.rutaSCSS,['sass-watch'])
	gulp.watch(rutas.html,['html-watch'])
	gulp.watch(rutas.rutaJS,['js-watch'])
});
