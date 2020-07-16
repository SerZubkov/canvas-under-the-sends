# Under the sends (Canvas)

#### Project to evaluate my strength in code

## Setup
1. <code>git clone https://github.com/SerZubkov/canvas-under-the-sends.git</code> clone and run <code>yarn</code> in project folder
2. <code>npm run build:dev</code> or just <code>npm start</code> which also starts the dev mode

## Development
--> <code>npm run build:dev</code><br>
  starts dev server on <code>localhost:8080</code> with livereload, sourcemap

--> <code>npm run build:prod</code><br>
  creates prod files to <code>/dist</code> with:

  1. compiles sass/stylus/less to css <br>
  2. autoprefixer for vendor prefixes (browser compability)<br>
  3. compiles typescript to ES5 <br>
  4. minifying for css/js <br>
  5. uglyfing js code <br>
  6. hash css and js file (file versioning for browser caching -> cache busting)<br>
