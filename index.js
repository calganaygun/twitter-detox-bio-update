require("dotenv").config();

const Twitter = require("twitter");

const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_SECRET,
});

const detoxDate = new Date("04/12/2022");

const dayDiff = Math.ceil(
  (Date.now() - detoxDate.getTime()) / (1000 * 60 * 60 * 24)
);

const bio = `⚠️ i'm on twitter detox until 31/04 ⚠️

I am detoxing for ${dayDiff} days. (bot updates)

Public speaker, cloud champion, backend engineer, community organizer`;

(async () => {
  try {
    const response = await client.post("account/update_profile", {
      description: bio,
    });
    
    if(!response.id){
        throw new Error("No response id")
    }

    console.log(`Successfully updated bio to ${dayDiff}`);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
})();
