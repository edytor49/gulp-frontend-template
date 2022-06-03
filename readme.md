# Frontend Template

Startup front-end template for building fast, robust, and adaptable web apps or sites. Included Bourbon.

* Version: 4.0
* Author: ed49 (edytor49@gmail.com)

## Quick start

1. Clone the git repo — `git clone https://edytor49@bitbucket.org/edytor49/frontend-template.git` or Download
2. install all dev packages - `npm install` or `npm i`
3. run gulp - `gulp`

## Browser support

* Chrome *(latest 2)*
* Edge *(latest 2)*
* Firefox *(latest 2)*
* Internet Explorer 11
* Opera *(latest 2)*
* Safari *(latest 2)*

## License

The code is available under the MIT license

## Contributing

* NPM - менеджер зависимотей `https://www.npmjs.com/`
* Gulp - сборщик проекта `https://gulpjs.com/`
* SASS (SCSS) - препроцессор CSS `https://sass-scss.ru/`
* Twig - препроцессор HTML и шаблонизатор `https://twig.symfony.com/`
* Bourbon -- библиотека кросбраузерных миксинов `https://www.bourbon.io/`

## Features

* BEM (подход к наименованию классов)
* Архитектура sass стилей проекта, смесь SMACSS (Шаблон 7-1) Гайдлайн который поможет разобратся в структуре проекта тут: `http://sass-guidelin.es/`
* Framework: Bootstrap 5 (`http://getbootstrap.com/`) or UiKit 3 (`https://getuikit.com/`)
* Flexbox & Grid CSS

## Advance

* `npm outdated` -- check last version for packages
* `npm upgrade` or `npm global upgrade` -- for upgrade all packages
* insert your favicon in `/favicon`
* for Bootstrap - `npm i bootstrap --save` and uncomment in `_src/stylesheet/stylesheet.scss`
* for Font Awesome - `npm i font-awesome`, copy fonts files to `_src/font/` dir and uncomment in `_src/stylesheet/stylesheet.scss`

### Инструкция по инициализации проекта:

* Скачать последнюю версию template из Bitbucket используя для навигации теги
* Скопировать содержимое в корень проекта
* Установить зависимости проекта для разработки через пакетный менеджер npm
* `npm install` (or `npm i`) в консоли
* `npm outdated` -- проверка наличия обновлений для используемых зависимостей
* `npm update <package>` -- обновление используемых зависимостей к последней актуальной версии
* `npm i [package]@version]` -- для установки пакетов, скриптов в папку node_modules
* в случае если предпочитаете использовать Bower для подключения скриптов:
* `bower init` -- для создания bower.json
* `bower install` -- установка vendor скриптов от которых зависит проект (к примеру: jQuery)
* `gulp build` -- полная сборка проекта
* `gulp` -- запуск сборщика проекта для дальнейшей разработки, а также watcher-а

### WebP in styles (for old browser)

Если необходимо выполнять проверку поддержки браузером формата WebP для использования его в стилях. Вставить в подвал сайта скрипт: 
`!function(e){"use strict";function s(s){if(s){var t=e.documentElement;t.classList?t.classList.add("webp"):t.className+=" webp",window.sessionStorage.setItem("webpSupport",!0)}}!function(e){if(window.sessionStorage&&window.sessionStorage.getItem("webpSupport"))s(!0);else{var t=new Image;t.onload=t.onerror=function(){e(2===t.height)},t.src="data:image/webp;base64,UklGRi4AAABXRUJQVlA4TCEAAAAvAUAAEB8wAiMwAgSSNtse/cXjxyCCmrYNWPwmHRH9jwMA"}}(s)}(document);`

Скрипт должен отработать как можно раньше и добавит `<html class='webp'>`, в дальнейшем с стилях необходимо все фоновые изображения прописывать через миксин `@include bg-url('image/background.jpg', $webp1x: 'image/background.webp');` из файла `stylesheet/_utils/_mixins.scss`. Подробнее почитать о данном fallback для webp можно в статье в Reference Links

### Reference Links

* [HTML template, Apache & Nginx configs] (https://github.com/h5bp/html5-boilerplate)
* [Lightweight startup HTML5 template, based on Gulp] (https://github.com/agragregra/OptimizedHTML-5)
* [Пошаговая инструкция по настройке сборки Gulp 4 для верстки сайтов] (https://www.youtube.com/watch?v=stFOy0Noahg&t=4056s)
* [Свежий взгляд на Gulp: функции и ES-модули] (https://www.youtube.com/watch?v=fgJmCevEtL4)
* [Стартовый шаблон автора канала FrontCoder] (https://github.com/FARCER/Start-template-gulp-4-pug-sass/)
* [Шаблон gulpfile с деплоем для Opencart] (https://gist.github.com/ZeRRoCull/6cfd9063b9e1db61703dc98549db0509)
* [WebP image and background usage in web projects] (https://raoulkramer.de/webp-image-and-background-usage-in-web-projects/)
