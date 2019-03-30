### example

http://doujinantena.com/page.php?id=d7c3f65508d37c8355a2030d840eeee9&p=2

可以拆成:

- http://doujinantena.com/page.php?

- id=d7c3f65508d37c8355a2030d840eeee9

- &p=2

```
for(let i=0;i<page.length;i++){
    request(`${http}?${id}&p=${i}`);
    html檔
    html -> data 
    save
}
```

div 存頁面數

get div.innerHTML -> 找出length

doujinantena.com

<a href="page.php?id=d7c3f65508d37c8355a2030d840eeee9" '="" target="_blank"></a>

從超連結中取得ID串接就是自己要的本子位置

紳士漫畫的原理同上
