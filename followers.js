const twitter = require("./twitter")

const getFollowers = async (screenName, cutoff) => {
    const params = {
        screen_name: screenName,
        count: 200,
    }

    const {users} = await twitter.get("followers/list", params)
    const index = users.findIndex(e => e.screen_name === cutoff)
    const followers = users.slice(0, index).map(user => user.screen_name)

    return followers
}

module.exports = getFollowers
