const puppeteer = require("puppeteer");
const download = require("image-downloader");

var final_array = [];

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  const product_images_urls = [
    "https://www.flickr.com/photos/182334539@N02/48373218487",
    "https://www.flickr.com/photos/145688645@N02/48195583846",
    "https://www.flickr.com/photos/53726379@N00/48195436787",
    "https://www.flickr.com/photos/145688645@N02/48187809947",
    "https://www.flickr.com/photos/145688645@N02/48178806591",
    "https://www.flickr.com/photos/89551118@N04/47950013056",
    "https://www.flickr.com/photos/135311329@N08/47943613172",
    "https://www.flickr.com/photos/8166986@N04/46988337575",
    "https://www.flickr.com/photos/66682533@N07/31861999937",
    "https://www.flickr.com/photos/13815526@N02/44225162254",
    "https://www.flickr.com/photos/13815526@N02/44896768862",
    "https://www.flickr.com/photos/13815526@N02/31072901398",
    "https://www.flickr.com/photos/13815526@N02/44225150674",
    "https://www.flickr.com/photos/146274265@N03/43122138030",
    "https://www.flickr.com/photos/145149294@N06/42851411671",
    "https://www.flickr.com/photos/7221539@N06/8145571669",
    "https://www.flickr.com/photos/146274265@N03/48782848468",
    "https://www.flickr.com/photos/146274265@N03/48783214521",
    "https://www.flickr.com/photos/145900290@N02/48731206403",
    "https://www.flickr.com/photos/169095658@N03/48604589651",
    "https://www.flickr.com/photos/182380355@N04/48238557012",
    "https://www.flickr.com/photos/182380355@N04/48218309347",
    "https://www.flickr.com/photos/182380355@N04/48218309122",
    "https://www.flickr.com/photos/182380355@N04/48218259896",
    "https://www.flickr.com/photos/182380355@N04/48212789977",
    "https://www.flickr.com/photos/182380355@N04/48212789512",
    "https://www.flickr.com/photos/182380355@N04/48212789192",
    "https://www.flickr.com/photos/182380355@N04/48212734106",
    "https://www.flickr.com/photos/182380355@N04/48212733786",
    "https://www.flickr.com/photos/182380355@N04/48212787602",
    "https://www.flickr.com/photos/182380355@N04/48212732666",
    "https://www.flickr.com/photos/182380355@N04/48212787242",
    "https://www.flickr.com/photos/182380355@N04/48212787012",
    "https://www.flickr.com/photos/182380355@N04/48212732196",
    "https://www.flickr.com/photos/53726379@N00/48195442027",
    "https://www.flickr.com/photos/182380355@N04/48176811181",
    "https://www.flickr.com/photos/34595032@N05/48088593942",
    "https://www.flickr.com/photos/8166986@N04/47932041668",
    "https://www.flickr.com/photos/57386290@N00/32929413717",
    "https://www.flickr.com/photos/170801895@N07/47692433392",
    "https://www.flickr.com/photos/170801895@N07/47745251061",
    "https://www.flickr.com/photos/157529542@N04/47744131311",
    "https://www.flickr.com/photos/157529542@N04/46826717895",
    "https://www.flickr.com/photos/164638249@N02/46582092265",
    "https://www.flickr.com/photos/67596892@N00/40338479163",
    "https://www.flickr.com/photos/67596892@N00/32361491567",
    "https://www.flickr.com/photos/67596892@N00/47303210781",
    "https://www.flickr.com/photos/67596892@N00/40338479093",
    "https://www.flickr.com/photos/159383925@N04/46674168981",
    "https://www.flickr.com/photos/59110392@N06/44237095344",
    "https://www.flickr.com/photos/87747789@N06/31083020028",
    "https://www.flickr.com/photos/131299699@N05/43137799160",
    "https://www.flickr.com/photos/154867992@N05/44898181052",
    "https://www.flickr.com/photos/158947444@N05/44897660382",
    "https://www.flickr.com/photos/154099405@N07/31071154658",
    "https://www.flickr.com/photos/131299699@N05/44883639652",
    "https://www.flickr.com/photos/31019971@N02/28834975705",
    "https://www.flickr.com/photos/137877159@N07/25965849316",
    "https://www.flickr.com/photos/139386374@N06/24945463842",
    "https://www.flickr.com/photos/136653096@N08/22920182703",
    "https://www.flickr.com/photos/93291142@N02/15117361488",
    "https://www.flickr.com/photos/31885064@N03/13488077404",
    "https://www.flickr.com/photos/7592107@N07/3096788535",
  ];

  for (let i = 0; i < product_images_urls.length; i++) {
    await page.goto(product_images_urls[i]);

    try {
      // Get number of views
      const views = await page.evaluate(
        () => document.querySelector(".view-count-label").innerText
      );
      // console.log(`number of views: ${views}`);

      // Get number of faves
      const faves = await page.evaluate(
        () => document.querySelector(".fave-count-label").innerText
      );
      // console.log(`number of faves: ${faves}`);

      // Get number of comments
      const comments = await page.evaluate(
        () => document.querySelector(".comment-count-label").innerText
      );
      // console.log(`number of comments: ${comments}`);

      // Get date uploaded
      const date = await page.evaluate(
        () => document.querySelector(".date-taken-label").innerText
      );
      // console.log(`date uploaded: ${date}`);

      // Get poste by name
      const name = await page.evaluate(
        () => document.querySelector(".owner-name").innerText
      );
      // console.log(`uploaded by: ${name}`);

      // Get poste by name
      const image = await page.evaluate(() =>
        document.querySelector(".main-photo").getAttribute("src")
      );

      const image_download_url = "https://" + image.split("//")[1];
      const options = {
        url: image_download_url,
        dest: `./Oculus Quest/${i}.jpg`, // will be saved to /path/to/dest/image.jpg
      };

      download
        .image(options)
        .then(() => {
          console.log("Saved to", options.dest); // saved to /path/to/dest/photo.jpg
        })
        .catch((err) => console.error(err));

      // console.log(`uploaded by: ${name}`);

      // Get photo id
      const photo_id_arr = await product_images_urls[i].split("/");
      const photo_id = await photo_id_arr[photo_id_arr.length - 1];
      // console.log(`photo id: ${photo_id}`);

      // create data object
      // var data = {
      //   id: photo_id,
      //   views: views,
      //   faves: faves,
      //   comments: comments,
      //   date: date,
      //   name: name,
      // };

      final_array.push({
        id: photo_id,
        name: name,
        date: date,
        views: views,
        faves: faves,
        comments: comments,
        image: image.split("//")[1],
        url: product_images_urls[i],
        image_url: options.dest,
      });
    } catch (e) {}
  }

  // await page.goto("https://www.flickr.com/search/?text=Roomba%20i7");

  // await page.setViewport({
  //   width: 1200,
  //   height: 800,
  // });

  // await autoScroll(page);

  // Extracting image urls from single flickr url
  // const hrefs1 = await page.evaluate(() =>
  //   Array.from(document.querySelectorAll("a[href]"), (a) =>
  //     a.getAttribute("href")
  //   )
  // );

  // var allUrls = [];

  // var set = await new Set(hrefs1);

  // await set.forEach((h)=>{

  //     //       // console.log(e);
  //     //       image_ref_array.push(e);
  //     //     }

  //     console.log(h);

  //     if(h.length === 34 || h.length === 28){
  //       allUrls.push(h);
  //     }

  // })
  // await console.log(`Number of product images = ${allUrls.length}`)
  // await console.log(allUrls);

  //   var image_ref_array = [];

  //  await hrefs1.forEach((e) => {
  //     if (e.length === 29) {
  //       // console.log(e);
  //       image_ref_array.push(e);
  //     }
  //   });

  //   // console.log("Length = " + image_ref_array.length);

  //   // goToImagePage(image_ref_array[0], browser);

  //   const page1 = await browser.newPage();

  //   const all_image_data = [];

  //   for (let i = 0; i < image_ref_array.length; i++) {
  //     const url = (await "https://www.flickr.com") + image_ref_array[i];

  //     // console.log(url);

  //     await page1.goto(url);

  //     // Get number of views
  //     const views = await page1.evaluate(
  //       () => document.querySelector(".view-count-label").innerText
  //     );
  //     // console.log(`number of views: ${views}`);

  //     // Get number of faves
  //     const faves = await page1.evaluate(
  //       () => document.querySelector(".fave-count-label").innerText
  //     );
  //     // console.log(`number of faves: ${faves}`);

  //     // Get number of comments
  //     const comments = await page1.evaluate(
  //       () => document.querySelector(".comment-count-label").innerText
  //     );
  //     // console.log(`number of comments: ${comments}`);

  //     // Get date uploaded
  //     const date = await page1.evaluate(
  //       () => document.querySelector(".date-taken-label").innerText
  //     );
  //     // console.log(`date uploaded: ${date}`);

  //     // Get poste by name
  //     const name = await page1.evaluate(
  //       () => document.querySelector(".owner-name-with-by").innerText
  //     );
  //     // console.log(`uploaded by: ${name}`);

  //     // Get photo id
  //     const photo_id_arr = await image_ref_array[i].split("/");
  //     const photo_id = await photo_id_arr[photo_id_arr.length - 2];
  //     // console.log(`photo id: ${photo_id}`);

  //     // create data object
  //     var data = {
  //       id: photo_id,
  //       views: views,
  //       faves: faves,
  //       comments: comments,
  //       date: date,
  //       name: name,
  //     };
  //     // console.log(JSON.stringify(data));

  //     all_image_data.push(data);
  //   }

  //   // await console.log(`all image data number = ${all_image_data.length}`);

  //   browser.close();
})().then(() => {
  console.log(final_array);
});

async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve, reject) => {
      var totalHeight = 0;
      var distance = 100;
      var timer = setInterval(() => {
        var scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}
