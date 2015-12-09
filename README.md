# gulp-js-base64-inject

This is a small Gulp plugin for injecting a javascript file directly into your script tag's src attribute as a base64 string and deletes the actual javascript file.

## What is it

The simplest example. HTML code:

```html
<script src="index.html">
```

...and Gulp task:

```js
var gulp = require('gulp');
var inject = require('gulp-js-base64-inject');

gulp.task('js', function() {
    return gulp.src('path/to/your/html/*.html')
        .pipe(inject({
            basepath: 'path/to/your/data/',
            pattern: 'index.js'
        }))
        .pipe(gulp.dest('path/for/output'));
});
```

If we use this plugin, the resulting HTML will be:

```html
<script src="data:text/javascript;base64, YWxlcnQoJ2xvYWRlZCcpOw0K">
```

## Options

Option | Type | Default | Details
------ | ---- | ------- | -------
basepath | string | `""` | Base path to look up referenced files from
pattern | string | `index.js` | Pattern to match javascript references.
