# 選擇Javascriot的理由

我們可以分前端跟後端

## 前端

前端到現在仍然是JS的天下,Web browser雖然有其他的語言支援(web assembly)

但是短期內也無法打動JS在瀏覽器的地位,各個JS框架和library還正在開發

## 後端

後端對於JS是相對弱的一塊,因為其弱型態會對DB導致危險

後端也有弱型態語言,像是python雖然也是弱型態,但是在error上比JS敏感

Python有django,相當強力,有admin及各式DB的管理套件

PHP對於後端DB控制也很好,也有像codeIgniter,Laravel這些框架等

但是我們目前不會用到DB及admin這類功能,只需要前端Render以及爬蟲

所以就這個部份主要用較方便的JS+express做route即可

# 選擇Pug的理由

其實也有很多preprocessing 的language

像是mustache等等

會選擇Pug主要是因為Express有直接支援Pug的模版render

不必再找一套接到Express上

# 選擇SCSS的理由

SCSS還有一個主要對手就是SASS

選SCSS是因為

1. CSS compactible,SCSS和CSS可無痛轉換
2. 加入了SASS的功能(都有了)

所以SCSS相較之下比SASS好了一點點,故選擇SCSS