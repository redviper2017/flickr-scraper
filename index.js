const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: true});
  const page = await browser.newPage();
  await page.goto('https://www.flickr.com/search/?text=OrCam%20MyEye');

  // Extracting image urls from single flickr url
  const hrefs1 = await page.evaluate(
    () => Array.from(
      document.querySelectorAll('a[href]'),
      a => a.getAttribute('href')
    )
  );

  var image_ref_array = [];

  hrefs1.forEach(e =>{
      if (e.length === 29){
        // console.log(e);
        image_ref_array.push(e);
      }
  })
    
  console.log("Length = "+image_ref_array.length);

  // goToImagePage(image_ref_array[0], browser);

  const page1 = await browser.newPage();

  const all_image_data = [];

  for(let i=0; i<image_ref_array.length; i++){
    const url = await 'https://www.flickr.com'+image_ref_array[i];
  
    console.log(url);
  
    await page1.goto(url);
  
    // Get number of views
    const views  = await page1.evaluate(() => document.querySelector('.view-count-label').innerText);
    // console.log(`number of views: ${views}`);
  
    // Get number of faves
    const faves  = await page1.evaluate(() => document.querySelector('.fave-count-label').innerText);
    // console.log(`number of faves: ${faves}`);
  
    // Get number of comments
    const comments  = await page1.evaluate(() => document.querySelector('.comment-count-label').innerText);
    // console.log(`number of comments: ${comments}`);
  
  
    // Get date uploaded
    const date  = await page1.evaluate(() => document.querySelector('.date-taken-label').innerText);
    // console.log(`date uploaded: ${date}`);
  
    // Get poste by name
    const name  = await page1.evaluate(() => document.querySelector('.owner-name-with-by').innerText);
    // console.log(`uploaded by: ${name}`);
  
    // Get photo id
    const photo_id_arr = await image_ref_array[i].split("/");
    const photo_id = await photo_id_arr[photo_id_arr.length-2];
    // console.log(`photo id: ${photo_id}`);
  
    // create data object
    var data = {id:photo_id, views:views, faves:faves, comments:comments, date:date, name:name};
    console.log(JSON.stringify(data));
  
    all_image_data.push(data);
  };

  await console.log(`all image data number = ${all_image_data.length}`)
 
  browser.close();

})();
