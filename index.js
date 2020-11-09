const dotenv = require("dotenv")
const Twitter = require("twitter")

dotenv.config()

const SCREEN_NAME = "bradgarropy"
const TWEET_ID = "1324086847102840832"

const client = new Twitter({
    consumer_key: process.env.API_KEY,
    consumer_secret: process.env.API_SECRET_KEY,
    access_token_key: process.env.ACCESS_TOKEN,
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
})

const getRetweeters = async id => {
    let params

    params = {
        id,
        count: 100,
        stringify_ids: true,
    }

    const {ids} = await client.get("statuses/retweeters/ids", params)

    params = {
        user_id: ids.join(","),
        include_entities: false,
        tweet_mode: false,
    }

    const users = await client.get("users/lookup", params)
    const retweeters = users.map(user => user.screen_name)
    return retweeters
}

const getQuoters = async query => {
    const params = {
        q: query,
    }

    const {statuses} = await client.get("search/tweets", params)
    const quoters = statuses.map(status => status.user.screen_name)
    return quoters
}

const getFollowers = async (screenName, cutoff) => {
    const params = {
        screen_name: screenName,
        count: 200,
    }

    const {users} = await client.get("followers/list", params)
    const index = users.findIndex(e => e.screen_name === cutoff)
    const followers = users.slice(0, index).map(user => user.screen_name)

    return followers
}

const getLikers = async () => {}

const execute = async () => {
    // followers
    const followers = await getFollowers(SCREEN_NAME, "deepak_io")
    console.log("FOLLOWERS")
    console.log(followers)

    // retweeters
    const retweeters = await getRetweeters(TWEET_ID)
    console.log("RETWEETERS")
    console.log(retweeters)

    // quote tweeters
    const quoters = await getQuoters(TWEET_ID)
    console.log("QUOTERS")
    console.log(quoters)

    // likers
    const likers = await getLikers(SCREEN_NAME, TWEET_ID)
    console.log("LIKERS")
    console.log(likers)
}

execute()
