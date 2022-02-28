console.log('This is the background page.');
console.log('Put the background scripts here .');
import { TwitterClient } from 'twitter-api-client';

const twitterClient = new TwitterClient({
    apiKey: process.env.TWITTER_API_KEY,
    apiSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessTokenSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET
})

chrome.webNavigation.onBeforeNavigate.addListener(
    async function (details) {
        // console.log(details);
        const url = details.url;
        if (url.startsWith("https://www.google.com/search?q=")) {
            console.log(url);
            const params = (new URL(url)).searchParams;
            console.log(params)
            const query = params.get('q');
            console.log(query)

            twitterClient.tweetsV2.createTweet({
                text: query
            }).then(response => {
                console.log("Tweeted!", response)
            }).catch(err => {
                console.error(err)
            })
        }
        return;
    },
    { urls: ["<all_urls>"] }
);