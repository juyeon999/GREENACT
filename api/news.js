const axios = require("axios");
const cheerio = require("cheerio");
const log = console.log;
let news = [];
const getHtml = async () => {
  try {
    return await axios.get(
      "https://search.naver.com/search.naver?where=news&query=%EB%B6%84%EB%A6%AC%20%EB%B0%B0%EC%B6%9C&sm=tab_srt&sort=0&photo=0&field=0&reporter_article=&pd=0&ds=&de=&docid=&nso=so%3Ar%2Cp%3Aall%2Ca%3Aall&mynews=0&refresh_start=0&related=0"
    );
  } catch (error) {
    console.error(error);
  }
};
const refreshNews = () => {
  getHtml()
    .then((html) => {
      let ulList = [];
      const $ = cheerio.load(html.data);
      const $bodyList = $("ul.list_news").children("li.bx");
      // log($);
      $bodyList.each(function (i, elem) {
        ulList[i] = {
          title: $(this).find("div.news_area a.news_tit").text(), // title
          url: $(this).find("div.news_area a.news_tit").attr("href"), // url
          image_url: $(this)
            .find("div.news_wrap a.dsc_thumb img.thumb")
            .attr("src"), // image_url
          /*,
                        image_alt: $(this).find('p.poto a img').attr('alt'),
                        summary: $(this).find('p.lead').text().slice(0, -11),
                        date: $(this).find('span.p-time').text()   */
        };
      });
      //return ulList;
      return ulList;
    })
    .then((newList) => (news = [...news, ...newList]));
};

const getNews = (request, response) => response.json(news);

module.exports.refreshNews = refreshNews;
module.exports.getNews = getNews;
