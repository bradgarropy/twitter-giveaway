const twitter = require("./twitter")

const getQuoters = async query => {
    const params = {
        q: query,
    }

    const {statuses} = await twitter.get("search/tweets", params)
    const quoters = statuses.map(status => status.user.screen_name)
    return quoters
}

module.exports = getQuoters
