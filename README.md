# tutorial

react + redux + immutable で何かやってみるチュートリアルをやった結果です。

## はじめに

モダンなJS何も知らないので適当にググってでてきたこれをもとにやってみます。
<https://www.sitepoint.com/how-to-build-a-todo-app-using-react-redux-and-immutable-js/>

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

<https://webpack.js.org/guides/migrating/#module-loaders-is-now-module-rules>

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
ここからはチュートリアルから離れて独自にやっていく。

## babel-preset-env

babel-preset-es2015はobsoleteということなのでbabel-preset-envに入れ替える。

```bash
npm uninstall -D babel-preset-es2015
npm install -D babel-preset-env
```

して、`webpack.config.js`を書き換える。

## semistandard

linterというかフォーマッタがほしいのでrebuildで聞いたsemistandardを入れる。

babelやreactを使っているせいかインストールするものが多い。

```bash
npm install -D eslint babel-eslint eslint-config-semistandard-react eslint-plugin-semistandard-react eslint-loader
```

`webpack.config.js`の`rules`にsemistandardを呼び出す設定を入れておく。

ついでに `npx semistandard --fix` して必要箇所を直しておく。
(むしろそれを `npm run build` のときに一緒にやってほしいよな？)

## proptypes

semistandardをかけるとcomponentsの中でアクセスしてるpropsのプロパティが定義されてないよというエラーになるので、propTypesを使って定義しておく。

## static変数を使う

propTypesがclassの中に入っていないのは気持ち悪いかなぁと思ったので、es6のstatic構文を使えるように、babelのプラグインを入れる。

```bash
npm i -D babel-plugin-transform-class-properties
```

## TypeScript化する

型ないと辛いのでflowかTypeScriptかを使ってみる。
flowはImmutableと相性良くなさそうなので、TypeScriptでやる。

目指すところとしてはこんな感じ

* 全ファイルTSで書く
* Immutableなオブジェクトにちゃんと型を付ける
* エディタで補完できたり警告がでて楽ができるようにする
* 自動整形

参考文献
<https://github.com/piotrwitek/react-redux-typescript-guide>
<https://qiita.com/uryyyyyyy/items/3ad88cf9ca9393335f8c>
<http://blog.mgechev.com/2018/01/18/react-typescript-redux-immutable/>

## 型定義ファイルのインストール

とりあえずreact-redux-typescript-guideに従ってType Definitionsをインストールする

```bash
npm i -D @types/react @types/react-dom @types/react-redux
```

["utility-types"](https://github.com/piotrwitek/utility-types)と["typesafe-actions"](https://github.com/piotrwitek/typesafe-actions)もおすすめされているのでインストールしておく

```bash
npm i --save utility-types typesafe-actions
```

## TSコンパイラのインストール

そもそもこれがないと始まらない。

```bash
npm i -D ts-loader typescript
```

`webpack.config.js`のrulesは一旦バッサリ短くしてしまう

```js
rules: [
  {
    test: /\.tsx?$/,
    use: [
      {loader: 'ts-loader'}
    ]
  }
]
```

`tsconfig.json`はこんな感じ。中身は一旦気にしない。
<https://qiita.com/uryyyyyyy/items/63969d6ed9341affdffb>

`module`が`es2015`になっているのは、webpackのtree shakingを有効にするために重要。
↑の記事だと`ES2015`、`ES2017`と大文字になっているけど、書いてみたら警告が出たので小文字にしてある。

```json
{
  "compilerOptions": {
    "strictNullChecks": true,
    "noUnusedLocals" : true,
    "noImplicitThis": true,
    "alwaysStrict": true,
    "outDir": "./dist/",
    "sourceMap": true,
    "noImplicitAny": true,
    "lib": ["dom", "es2017"],
    "module": "es2015",
    "target": "es5",
    "jsx": "react"
  }
}
```

## Let's begin enjoy typescript

TSへの書き換えを始めるために全部のjsファイルをtsかtsxにリネームする。

## "moduleResolution": "node"

reduxとimmutableをimportするところで、モジュールが見つかりませんというエラーになるので、
`tsconfig.json`に`"moduleResolution":"node"`を追加する。

## 型定義

<http://blog.mgechev.com/2018/01/18/react-typescript-redux-immutable/>
で紹介されているRecordFactoryはもう不要で、Immutableの`Record<T>()`をつかうと最初からいい感じになる。

`models.ts`にTodo型をRecordを継承して定義する。

型定義はできたものの、別の問題が、、
componentで`List<Todo>`をmapしようとするところで、
要素の型は`Todo | undefined`だと言われてうまくいかない。

[既に問題は報告済みで解決しているみたい](https://github.com/facebook/immutable-js/issues/1246)なので、immutable.jsを現時点の最新の4.0.0-rc.9に更新する。

```bash
npm i --save immutable@4.0.0-rc.9
```

## Type actions

["typesafe-actions"](https://github.com/piotrwitek/typesafe-actions)の`createAction`メソッドを使って各アクションを生成する。

アクション名の重複を避けるにはどうすればいいのかな？
ガイドでは `'@@module_name/ACTION_NAME'` のようなフォーマットにすることで重複を避けている。
こういう決まったプレフィクスをつけるのは良いパターンな気がする。

この時点ではreducerが新しい形式のactionに対応していないので、エラーになるけど一旦おいておく。
ビジネスロジックの混入を避けるため、アクションが返す値はシンプルなものにしておく。

## Type the reducer

ところで参考にしている[piotrwitek/react-redux-typescript-guide](https://github.com/piotrwitek/react-redux-typescript-guide)はRedux 4.x.xの型定義をベースにしてあるので、`combineReducers`の型が足りないことに気付いた。β版だけど最新のreduxにしておく。

```bash
npm i --save react@next
```

その後`combineReducers`を使って(combineしてないけど、、)Reducerを定義する。

Todoを作成する処理と`isDone`をトグルするのはビジネスロジックなので`Todo`クラス側に置くようにする。

## TSLint

どういうスタイルにするか考えるコストが無駄なのでsemistandardスタイルでやる。

```bash
npm i -D tslint tslint-config-standard tslint-react
```

```tslint.json:json
{
  "extends": [
    "tslint-config-standard",
    "tslint-react"
  ],
  "rules": {
    "semicolon": [
      true,
      "always"
    ]
  }
}
```
