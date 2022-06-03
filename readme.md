# Frontend Template

Startup front-end template for building fast, robust, and adaptable web apps or sites. Included Bourbon.

* Version: 4.0
* Author: ed49 (edytor49@gmail.com)

### Quick start

1. clone the git repo — `git clone https://github.com/edytor49/gulp-frontend-template.git` or Download
2. copy content to project root
3. install all dev packages - `npm install` or `npm i` in console
4. run gulp - `gulp` in console

### Browser support

* Chrome *(latest 2)*
* Edge *(latest 2)*
* Firefox *(latest 2)*
* Internet Explorer 11
* Opera *(latest 2)*
* Safari *(latest 2)*

### Contributing

* NPM - `https://www.npmjs.com/`
* Gulp - `https://gulpjs.com/`
* SASS (SCSS) - `https://sass-scss.ru/`
* Twig - `https://twig.symfony.com/`
* Bourbon -- `https://www.bourbon.io/`

### Features

* BEM Methodology (class naming)
* SMACSS (project styles architecture) `http://sass-guidelin.es/`
* CSS Framework: Bootstrap / Tailwind CSS / Bulma / UIKit

### Advance

* `npm outdated` -- check last version for packages
* `npm upgrade` or `npm global upgrade` -- for upgrade all packages
* `npm update <package>` -- update some package
* `npm i [package]@version]` -- package install in /node_modules/ dir
* `gulp build` -- build project for production
* `/favicon` -- place for your favicon
* `npm i bootstrap --save` and import in `_src/stylesheet/stylesheet.scss` -- if you need Bootstrap
* `npm i font-awesome`, copy fonts files to `_src/font/` dir and uncomment in `_src/stylesheet/stylesheet.scss` -- if you need Font Awesome

### If you like use Bower

* `bower init` -- для создания bower.json
* `bower install` -- установка vendor скриптов от которых зависит проект (к примеру: jQuery)

### WebP in styles (hack for old browser support)

Если необходимо выполнять проверку поддержки браузером формата WebP для использования его в стилях. Вставить в подвал сайта скрипт:

`!function(e){"use strict";function s(s){if(s){var t=e.documentElement;t.classList?t.classList.add("webp"):t.className+=" webp",window.sessionStorage.setItem("webpSupport",!0)}}!function(e){if(window.sessionStorage&&window.sessionStorage.getItem("webpSupport"))s(!0);else{var t=new Image;t.onload=t.onerror=function(){e(2===t.height)},t.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"}}(s)}(document);`

Скрипт должен отработать как можно раньше и добавит `<html class='webp'>`, в дальнейшем с стилях необходимо все фоновые изображения прописывать через миксин `@include bg-url('image/background.jpg', $webp1x: 'image/background.webp');` из файла `stylesheet/_utils/_mixins.scss`. Подробнее почитать о данном fallback для webp можно в статье в Reference Links

## License

The code is available under the MIT license

### Reference Links

* [HTML template, Apache & Nginx configs] (https://github.com/h5bp/html5-boilerplate)
* [Lightweight startup HTML5 template, based on Gulp] (https://github.com/agragregra/OptimizedHTML-5)
* [Пошаговая инструкция по настройке сборки Gulp 4 для верстки сайтов] (https://www.youtube.com/watch?v=stFOy0Noahg&t=4056s)
* [Свежий взгляд на Gulp: функции и ES-модули] (https://www.youtube.com/watch?v=fgJmCevEtL4)
* [Стартовый шаблон автора канала FrontCoder] (https://github.com/FARCER/Start-template-gulp-4-pug-sass/)
* [Шаблон gulpfile с деплоем для Opencart] (https://gist.github.com/ZeRRoCull/6cfd9063b9e1db61703dc98549db0509)
* [WebP image and background usage in web projects] (https://raoulkramer.de/webp-image-and-background-usage-in-web-projects/)
