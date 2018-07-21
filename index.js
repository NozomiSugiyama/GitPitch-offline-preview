const puppeteer = require('puppeteer');
const fs        = require('fs');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    const page = await browser.newPage();
    await page.goto(`https://gitpitch.com/${process.env.REPOSITORY_NAME}`);

    await page._client.send('Page.setDownloadBehavior', {behavior: 'allow', downloadPath: './static'});
    //await page.evaluate(() => {
    //  const inputElement = document.getElementById('arriveSearchText');
    //  console.log(document.querySelectorAll(".slideshow")[0]);
    //  document.querySelectorAll(".slideshow")[0].children[0].click();
    //});

    const downloadPage = await browser.newPage();
    await downloadPage._client.send('Page.setDownloadBehavior', {
        behavior: 'allow',
        downloadPath: './static'
    });
    try {
        await downloadPage.goto(`https://gitpitch.com/pitchme/offline/github/${process.env.REPOSITORY_NAME}/master/white/PITCHME.zip`);
    } catch {}
    const f = () => {
        fs.readdir("./static", async (err, files) => {
            if (err) {
                process.exit(1)
                return;
            }
            console.log(files);
            if (files.includes("PITCHME.zip")) {
                await browser.close();
                process.exit();
                return
            } else {
                setTimeout(f, 1000)
                return
            }
        })
    }
    f()
})();

