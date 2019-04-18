# doujinantena Downloader

form [nHentaiDownloader](https://github.com/Darkborderman/nHentaiDownloader)

----

## Usage

First of all, we need NVM (node version manager) https://nodejs.org/en/

After installed, restart your IDE or terminal if you use Windows.

Then type command in terminal to install: npm install

Usage: node main.js [bookNumber] 

(For example: http://doujinantena.com/page.php?id=3da99d4c9259ecdf52f5237bbf835fd8&p=1 

The code after "id=" is what we want, that is "3da99d4c9259ecdf52f5237bbf835fd")

----

## development

For "doujinantena" site, the page number will be under a class named "notice" 

(only the first page, so our request must make sure that's first page)

Use `document.getElementsByClassName('notice')` to get that HTML pattern

Then we have to get the total pages, use replace and split along with regular expression to get the number we want.

Next, we want to make sure that the booknumber is what we want, so that our crawler will download the right picture.

Finally, the picture format might not be what we think, just use `split()` to get that.

After aquired what we want, we can send our request to the site and download all of them, Yeah.

Note that the page number in doujinantena is coded as 001、002、003......, `padStart()` can help us with that.