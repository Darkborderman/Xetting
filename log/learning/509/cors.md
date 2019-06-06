# cors
簡單講是一個瀏覽器的限制，檔掉非同域的請求，避免有心人讓你流覽一次這個網站Dos別人網站N次，或是盜用別人網站app的key
由於是抓網站圖片，有三種解法
1. server載下來再給別人(最正確的作法...但是電腦空間不大...宿網又慢...)
2. 把網址塞img的src裡，再讀出來(可試)
3. 自己開一個cors Proxy(牛刀殺雞)
當我們發現doujinantena圖片載不下來時，我們開一個cors Proxy，以為萬解，然後...發現問題不在那裡
原來doujinantena有檢查Referrer，rel="noreferrer"就好了

