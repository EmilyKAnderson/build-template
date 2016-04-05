dev project setup 
==

Key file:

* `Gulpfile.js` - build file for the Gulp build tool

Dependencies
--

You will need:

* NodeJS with NPM installed

You will also need to install [Gulp](http://gulpjs.com/)

```bash
# using Gulp:
npm install --global gulp
```

Installation
--

Clone this repository to a directory on your computer. Then, install the dependencies with:

```bash
npm install
```

Running the Gulp build
--

Running it once:

```bash
gulp
```

Running it in "watch" mode, with a local webserver on http://localhost:3003/ :

```bash
gulp dev
```

LiveReload
--

Install [LiveReload for Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/related). Yay! gulp files have live reload configuration. That means automatic updates when you change something.

