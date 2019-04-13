# doujinantena Downloader

form [nHentaiDownloader](https://github.com/Darkborderman/nHentaiDownloader)

----

## Usage

First of all, we need NVM (node version manager) https://nodejs.org/en/

After installed, restart your IDE or terminal if you use Windows.

Then type command in terminal to install: npm install

Usage: node main.js [bookNumber]

----

## development

For "doujinantena" site, the page number will be under a class named "notice"

Use `document.getElementsByClassName('notice')` to get that HTML pattern

Then we have to get the total pages, use replace and split along with regular expression to get the number we want