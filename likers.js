const puppeteer = require("puppeteer")

const getLikers = async (screenName, id) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    // change viewport to show
    // username and password fields
    await page.setViewport({
        width: 1920,
        height: 1080,
    })

    await page.goto("https://twitter.com", {waitUntil: "networkidle2"})

    // fill username
    await page.$eval(
        '[name="session[username_or_email]"]',
        (el, username) => (el.value = username),
        process.env.TWITTER_USERNAME,
    )

    // fill password
    await page.$eval(
        '[name="session[password]"]',
        (el, password) => (el.value = password),
        process.env.TWITTER_PASSWORD,
    )

    // submit form and wait
    await Promise.all([page.click('[role="button"]'), page.waitForNavigation()])

    // you're now logged in!

    // load tweet likers
    await page.goto(`https://twitter.com/${screenName}/status/${id}/likes`, {
        waitUntil: "networkidle2",
    })

    // modify modal css to display all likers
    await page.$eval('div[role="dialog"]', el => {
        el.style.maxHeight = "none"
        el.style.height = "auto"
    })

    await page.waitForTimeout(1000)

    // scrape likers
    const likers = await page.$$eval(
        'div[role="dialog"] div[dir="ltr"] span',
        els => {
            const likers = els.map(el => el.innerText.slice(1))
            return likers
        },
    )

    await browser.close()
    return likers
}

module.exports = getLikers
