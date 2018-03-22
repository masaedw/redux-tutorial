# tutorial

react + redux + immutable で何かやってみるチュートリアルをやった結果です。

## はじめに

モダンなJS何も知らないので適当にググってでてきたこれをもとにやってみます。
https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/

以下はチュートリアルを進めながらやったことをメモしたものです。
コミットにだいたい対応してます。

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

## Redux and Immutable

言われた通りに書き換える。
モダンJS界隈ではimport行をソートするルールは決まってるのかな？と思いつつ
最後の行にimportを追加しておく。

importは決まったルールで勝手にソートされてほしいものだ。
gitネイティブ時代ではソートは正義である。不要なコンフリクトを防げる。

## Designing Actions

言われた通りに`actions.js`を作る。
これ`type`プロパティを持つ生のJSのオブジェクトを返すことになってるけど、
直和型があれば型で縛れてよりよさそうだと思った。

Immutable.jsには代数的データ型はないのかしら。あってもよさそう。

## Designing a Reducer

言われた通りに`reducer.js`を作る。

## Connecting Everything

言われた通りに編集する。

急に難しくなった、、このチュートリアルから得た理解を整理しておくと、、、

### Component

props(JSオブジェクト)を受け取ってjsxを返す関数。
≒viewの定義。

propsでは、そのComponentが扱う対象物のstateとイベントハンドラを受け取る。
イベントハンドラは適切なメッセージ(`{type="HOGE"}`なオブジェクト)を作ってdispatchを呼ぶ。

Componentは最終的にrenderメソッドで呼び出されるか、別のComponentに組み込まれる形で利用される。

### Container

Componentみたいなもの。
Componentは利用するときにstateやイベントハンドラを渡さないといけないけど、
Containerは事前にstateとイベントハンドラを設定済みなので、呼び出すときはタグを書くだけでよい。

Containerを作るにはconnectメソッドを使う。

stateはstoreから取り出されたものから取り出す。(mapStateToProps)
(Containerを呼び出すときに引数がないということは、storeは同一Providerの中で同一と思われる)
(dispacherも同様にProviderの中で唯一のインスタンスと思われる)

## webpack-serv

ホットリロードとかできるのかなと思って webpack-serv をいれてみた。
ついでにソースマップも作れるのかなと思って`webpack.config.js`に

```json
devtool: "cheap-module-eval-source-map",
```

を設定してみた。

## おわり

うーん、これだけで何か作れるようになった気がしないぞ、、

## つづき

せっかくなのでもう少し環境構築的なところを独自に進めてみる。

## babel-preset-env

babel-preset-es2015はobsoleteということなのでbabel-preset-envに入れ替える。
