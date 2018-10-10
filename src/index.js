const rp = require("request-promise");
const $ = require("cheerio");
const url = "https://www.procyclingstats.com/rankings.php";

rp(url)
  .then(function(html) {
    const cyclistArray = $(".basic > tbody", html)[0].children;
    const cyclistObjArray = [];

    cyclistArray.forEach(cyclistData => {
      // arrayKey: currentRank[0] |	prevRank[1] |	name & nationality [3]	| team[4]	| points[5]
      const natStr =
        cyclistData.children[3].children[0].children[0].attribs.class;
      const nameStr = cyclistData.children[3].children[1].children[1].data;

      const cyclistObj = {
        currentRank: cyclistData.children[0].children[0].data,
        prevRank: cyclistData.children[1].children[0].children[0].data,
        nationality: natStr.slice(6, 8),
        name: nameStr.trim(),
        team: cyclistData.children[4].children[0].children[0].data,
        points: cyclistData.children[4].children[0].children[0].data
      };
      cyclistObjArray.push(cyclistObj);
    });

    console.log(cyclistObjArray);
    document.getElementById(
      "app"
    ).innerHTML = `<h1>Check Console for object of <a href="${url}">${url}</a> page</h1>`;
  })
  .catch(function(err) {
    //handle error
  });
