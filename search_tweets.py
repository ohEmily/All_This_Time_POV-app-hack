from TwitterSearch import * # search library
from TwitterSearch import TwitterSearchException
import os

from config import TWITTER_CONSUMER_KEY, TWITTER_CONSUMER_SECRET, TWITTER_ACCESS_TOKEN, TWITTER_ACCESS_TOKEN_SECRET


# Python Twitter search library
# https://github.com/ckoepp/TwitterSearch
def search(keywords):
    # set up TwitterSearch
    try:
        tso = TwitterSearchOrder()
        tso.set_language('en')
        tso.set_include_entities(False)

        tso.set_keywords(keywords)
        ts = TwitterSearch(
                consumer_key = TWITTER_CONSUMER_KEY,
                consumer_secret = TWITTER_CONSUMER_SECRET,
                access_token = TWITTER_ACCESS_TOKEN,
                access_token_secret = TWITTER_ACCESS_TOKEN_SECRET
        )

        for tweet_curr in ts.search_tweets_iterable(tso):
            print('@%s tweeted: %s' % ( tweet_curr['user']['screen_name'], tweet_curr['text']))

        # take care of all those ugly errors if there are some 
    except TwitterSearchException as e: 
        print(e)
