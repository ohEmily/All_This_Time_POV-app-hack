from TwitterSearch import * # search library
from TwitterSearch import TwitterSearchException
import os
import db

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
        
        tweet_list = []

        count = 0
        for tweet_curr in ts.search_tweets_iterable(tso):
            tweet = {}
            tweet['id'] = tweet_curr['id_str']
            tweet['content'] = tweet_curr['text']
            tweet['user'] = tweet_curr['user']['screen_name']
            tweet['date'] = tweet_curr['created_at']

            tweet_list.append(tweet)
                
            # print('@%s tweeted: %s' % ( tweet_curr['user']['screen_name'], tweet_curr['text']))
            count += 1

        print 'Query returned %d tweets' % count
        return tweet_list
    
    # take care of all those ugly errors if there are some 
    except TwitterSearchException as e: 
        print(e)
