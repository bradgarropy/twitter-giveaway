const getLikers = require("./likers")
const getQuoters = require("./quoters")
const getFollowers = require("./followers")
const getRetweeters = require("./retweeters")

const execute = async () => {
    // arguments
    const url = new URL(process.argv[2])
    const screenName = url.pathname.split("/")[1]
    const tweetId = url.pathname.split("/")[3]

    // followers
    const followers = await getFollowers(screenName, "deepak_io")
    console.log("FOLLOWERS")
    console.log(followers)

    // retweeters
    const retweeters = await getRetweeters(tweetId)
    console.log("RETWEETERS")
    console.log(retweeters)

    // quoters
    const quoters = await getQuoters(tweetId)
    console.log("QUOTERS")
    console.log(quoters)

    // likers
    const likers = await getLikers(screenName, tweetId)
    console.log("LIKERS")
    console.log(likers)

    // winner
    // todo
}

execute()
