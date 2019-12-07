# Short Description
A User need to register with unique Username to get access in the Dashboard. After Successful registration and login, user can create notes which is only maintained by that authorized user ID. User can write his/her content in any language. Deleted notes can't be revived but user can update note as many as he/she wants. To secure account, user can logout from his/her Logged in account.

# Installation Instructions
run on terminal:
1) git clone https://github.com/TusharRoy23/viva.git
2) npm install
3) npm run build <br>
** wait for few seconds ** <br>
4) npm run dev

# NPM Modules
dependencies =>
<br>
axios, bcryptjs, body-parser, dotenv, express, materialize-css, uuid, vee-validate, vue, vue-router, vuex, yup

devDependencies => <br>
@babel/cli, @babel/core, @babel/node, @babel/preset-env, babel-loader, babel-plugin-module-resolver, css-loader, mini-css-extract-plugin, moment, nodemon, vue-loader, vue-template-compiler, webpack, webpack-cli, webpack-dev-middleware, webpack-hot-middleware

# Few Notes
Vee-validate (Front-End Validation) <br>
Yup (Back-End Validation) <br>
uui (Random number generator) <br>
bcryptjs (Hashing password) <br>
.babelrc (Define custom folder path) <br>
.env (Project configuration) <br>
Data will always store in JSON files <br>
path: server/data/*
