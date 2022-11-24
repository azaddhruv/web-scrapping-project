Project Name - News Website data Scrapping 
===========================================

1. What this application does =>

a. You can make a "get" request to the endpoint "/news/:date" where date should be an actual date and it should be in the form of "11-22-2022" and you will get all the latest news of that date in JSON format.

b. News is not pulled from a database but scrapped from a website endpoint which is "https://news.ycombinator.com/newest".

c. Which is then saved in a "csv" file. Different dates news are stored in different files.

d. Data are refreshed on every 15 minute so it always gives the latest news.

===========================================================================================================================

2. Technologies and Packages used

a. JavaScript
b. Node.JS
c. Express.JS
d. fs modules
d. Cheerio
e. json2csv
f. csvtojson
g. cron-node
h. uuid-by-string

=========================================

3. How to run the Project

a. You can first download or clone this reprository.

b. Then in your terminal change directory to the downloaded file and execute "npm install".

c. Then to start the server you have to execute "node app.js".

d. Your server is up and running.

e. CSV files will be saved in "savedCsvFiles" folder.

===================================================================================================

4. How code in the backend works

a. In the server is started a function is executed "task.start()" after which the function inside the "task" which is in "scrape.js" file will be execuetd after every 15 minutes. It is done with the help of "node-cron" package.

b. The way I comapred old data with latest ones is through ids, whenever a news post was created I attached an id with it which is based on author and date,  it is done with the help of uuid-by-string.

c. So whenever an particular file will be updated with new data we can simply check by creating an id based on title and date, if its the same news post then there id will also be same and we can easily seprate which post is present and which is not.

d. Function inside the "task" named as "fn" function handles and manages all the "csv" files data.

e. It checks if the current date file exists or not, if it does not exist then it creates one and fills it with latest new scapped from the news website. And if there is a file already then also it grabs all the data from the news website and checks and only add the ones which are not present. Means our "csv" files always contains latest data without and duplicacy.

f. The way we scrape data from the news website is with the help of Cheerio. Through Cheerio we load the whole data and through logic and code we create an array of objects which will be converted or added into "csv" files.

g. csv files are stored in date manner so whenver anyone makes a request we simply go to the file name and convert it to an JSON object and then an respond we send that object. If the required date file is not stored we simply alert the client with a 404 error.

===========================================================================================================================


Thank You
