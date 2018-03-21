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

`npm run build` を実行すると

    Invalid configuration object. Webpack has been initialised using a configuration object that does not match the API schema.
     - configuration.module has an unknown property 'loaders'. These properties are valid:
       object { exprContextCritical?, exprContextRecursive?, exprContextRegExp?, exprContextRequest?, noParse?, rules?, defaultRules?, unknownContextCritical?, unknown ContextRecursive?, unknownContextRegExp?, unknownContextRequest?, unsafeCache?, wrappedContextCritical?, wrappedContextRecursive?, wrappedContextRegExp?, strictExportPresence?, strictThisContextOnImports? }
       -> Options affecting the normal modules (`NormalModuleFactory`).

というエラーが出るけどとりあえず無視する。

## React and Components

書いてある通りに

* `src/components.js`
* `src/app.js`
* `index.html`
* `style.css`

を作る。

## webpack

`npm run build` がエラーになるので直す。

`loaders`というプロパティは知らんよということなのでググるとこういうことらしい。

https://webpack.js.org/guides/migrating/#module-loaders-is-now-module-rules

(たぶんこのチュートリアルが古いと感じたのは、webpack v1のころのものだからで、いまはv2なんだろうな、と想像)

この説明の通りに書き換えてみる。
今回は `loaders` を `rules` に変更するだけで大丈夫そう。

`bundle.js`が生成されるので、gitの管理外になるようにしておく。