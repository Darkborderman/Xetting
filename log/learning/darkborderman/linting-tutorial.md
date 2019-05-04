# linting教學

## 前言

[lint](https://en.wikipedia.org/wiki/Lint_(software))本來是一個軟體,用來找出code可能會有error的地方(ex: undefined behavior)

使得程式碼更為robust,而後來linting成為一個名詞,指專門挑出不符某些rule的程式碼

在這裡的rule並不一定是**有問題**,只要是**不服大家寫code規範**的其實都算

例如tab空白數,換行,大括號等**宗教戰爭**都可以列入rule中

當大家都遵守rule時,寫出來的程式碼才有品質,才**有資格被稱為code,有其使用的價值**

在Javascript中Linting module最紅的莫過於esLint

可定義的東西千奇百怪,族繁不及備載,可以到達雞蛋裡挑骨頭的等級

而rule的話則因javascript的彈性相當大,rule其實不好定義

從最嚴苛的Airbnb版本到不怎麼管的standard都有

其實這個應該要納入每個Javascript的專案中,只要你想做的東西不是toy都應該要

專案目前沒有引入,因為目前的組員都是初學者,當開始深入後就會開始使用linting

## Eslint

[傳送門](https://github.com/eslint/eslint)

安裝很簡單

`npm install eslint --save-dev`

初始化

`./node_modules/.bin/eslint --init`

去對程式做linting

`./node_modules/.bin/eslint yourfile.js`

## Rules

個人推荐使用Airbnb的rules

[傳送門](https://github.com/airbnb/javascript)

Airbnb的rule要另外安裝

`npx install-peerdeps --dev eslint-config-airbnb`

在`.eslintrc`中新增`"extends": "airbnb"`即可使用

## 後記

Javascript真的變動很大,本來符合的code(約3年前),符合當初的Airbnb rules

現在重新做linting出了好幾百個errors

自從ES6,7出了之後對於Javascript的語法有很大的影響,也難怪error會很多
