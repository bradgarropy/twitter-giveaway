const twitter = require("./twitter")

const getRetweeters = async id => {
    let params

    params = {
        id,
        count: 100,
        stringify_ids: true,
    }

    const {ids} = await twitter.get("statuses/retweeters/ids", params)

    params = {
        user_id: ids.join(","),
        include_entities: false,
        tweet_mode: false,
    }

    const users = await twitter.get("users/lookup", params)
    const retweeters = users.map(user => user.screen_name)
    return retweeters
}

module.exports = getRetweeters
