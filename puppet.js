const dotenv = require("dotenv")
const puppeteer = require("puppeteer")

dotenv.config()

const execute = async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    await page.setViewport({
        width: 1920,
        height: 1080,
    })

    await page.goto("https://twitter.com")

    await page.$eval(
        '[name="session[username_or_email]"]',
        (el, username) => (el.value = username),
        process.env.USERNAME,
    )

    await page.$eval(
        '[name="session[password]"]',
        (el, password) => (el.value = password),
        process.env.PASSWORD,
    )

    await Promise.all([page.click('[role="button"]'), page.waitForNavigation()])

    await page.goto("https://twitter.com")

    await page.screenshot({path: "example.png"})

    await browser.close()
}

execute()
