# tutorial

react + redux + immutable で何かやってみるチュートリアルをやった結果です。

## はじめに

モダンなJS何も知らないので適当にググってでてきたこれをもとにやってみます。
https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/

## Setup

```bash
npm install --save-dev webpack babel-core babel-loader babel-preset-es2015 babel-preset-react
```

したら、下記の警告がでてきたので、たぶん babel-preset-env を使うのが良いんだろうけどとりあえず無視する。

    Thanks for using Babel: we recommend using babel-preset-env now: please read babeljs.io/env to update!

次に`package.json`に下記を追加しろと書いてあるんだけど、

```json
"script": {
  "build": "webpack --debug"
}
```

これを追加して、`npm run build`しても`missing script: build`と言われてしまう。
`"scripts"`という項目がすでに`package.json`に入ってるので、そこに`"build": "webpack --debug"`の行を追加することにする。

満を持して`npm run build`すると、、
    The CLI moved into a separate package: webpack-cli.
    Please install 'webpack-cli' in addition to webpack itself to use the CLI.
    -> When using npm: npm install webpack-cli -D
    -> When using yarn: yarn add webpack-cli -D
だそうで。

言われた通りに`npm install webpack-cli -D`を実行する。

(このあたりこのチュートリアルちょっと古いのでは、、、？という疑惑)