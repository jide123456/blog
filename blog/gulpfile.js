var gulp = require('gulp')

gulp.task('moveStatic', () => {
	gulp
		.src('./dist/**')
		.pipe(gulp.dest('../server/public/dist'))
})

gulp.task('moveIndex', () => {
	gulp
		.src('./index.html')
		.pipe(gulp.dest('../server/public/'))
})

gulp.task('default', ['moveStatic', 'moveIndex'])