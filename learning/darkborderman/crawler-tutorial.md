# 網頁爬蟲範例

爬蟲是指利用程式語言來自動在網站上擷取所需要的資訊

方式有很多,在python有`beautiful soup`可以使用

至於Javascript我是使用最基本的`request`+`JSDOM`去實作

# 網址解析

以下是一個對網站某一本本子的某頁的位置

http://doujinantena.com/page.php?id=d7c3f65508d37c8355a2030d840eeee9&p=2

我們可以把整個URL拆成:

- http://doujinantena.com/page.php

這個是網頁的位址

- ?id=d7c3f65508d37c8355a2030d840eeee9&p=2

這個是我們對於本子所做的query

query還能拆成

- id=d7c3f65508d37c8355a2030d840eeee9

- p=2

其中id應該是這本本子的id,p則是頁碼

瞭解了query方式,就可以對網站的任意本子做爬蟲工作了

# 爬蟲

我們可以利用迴圈把網頁慢慢抓下來

```javascript
//iterate through full book and get each page's HTML

let html=[];
for(let i=0;i<page.length;i++){
    html.push( await request(`${http}?${id}&p=${i}`));
}
```

知道網址之後,我們需要去瞭解這個網站的HTML

用F12可以找到有一個div存了頁面數,我們會需要這個去知道共幾頁

可以用`$(element).value`等方式拿到長度

網頁裡有一個image element(廢話),attribute有這張圖的實際位址

對這張圖去做直接的request然後存起來就大功告成了

