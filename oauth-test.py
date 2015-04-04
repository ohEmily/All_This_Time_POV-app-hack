import oauth2 as oauth
import os
import sys

import set_env

def main():
    try:
        os.environ["TWITTER_CONSUMER_KEY"]
        os.environ["TWITTER_CONSUMER_SECRET"]
    except KeyError:
        set_env.set_env_vars()
#        print "Please set env variables."
#        sys.exit(1)

    twitter_consumer_key = os.environ['TWITTER_CONSUMER_KEY']
    twitter_consumer_secret = os.environ['TWITTER_CONSUMER_SECRET'] 

    # create consumer with the proper key/secret
    consumer = oauth.Consumer(
        key = twitter_consumer_key, 
        secret = twitter_consumer_secret
    )

    # request token URL from Twitter
    request_token_url = "https://twitter.com/oauth/request_token"
    
    # create our client
    client = oauth.Client(consumer)

    # the OAuth Client request works just like httplib2 for the most part
    (resp, content) = client.request(request_token_url, "GET")
    print resp
    print content

main()
