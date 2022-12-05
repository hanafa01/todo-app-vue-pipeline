This repository contains two branches,


- Default branch (main branch), todo app with Vuejs (Without Backend)
- todo-with-laravel-api branch, todo app with Vuejs and Laravel API (Without Backend)

To switch between branches use 'git checkout branchname'

NOTE FOR BRANCH todo-with-laravel-api: 
You need to add a variable in .env.local file (create if not exists) that links to laravel api project like in the following line:

VUE_APP_BASE_URL='http://localhost/todo-app-laravel-project-name/public/api'


# todo-app-vue

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### NPM used (only for info)
npm install --save vuex@next

npm i @fortawesome/fontawesome-free

npm install @meforma/vue-toaster

npm install --save vue-router@next

npm I axios --save

npm i vee-validate --save
