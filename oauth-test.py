import oauth2 as oauth
import os
import sys

import set_env

def get_creds():
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
#    (resp, content) = client.request(request_token_url, "GET")
#    print resp
#    print content

    signed_GET_req = "GET&https%3A%2F%2Fapi.twitter.com%2F1.1%2Fsearch%2Ftweets.json&count%3D4%26max_id%3D250126199840518145%26oauth_consumer_key%3DRGLL48Bow3PMHPrdI7altWyty%26oauth_nonce%3Df1adc531b566057ea529684fa2879757%26oauth_signature_method%3DHMAC-SHA1%26oauth_timestamp%3D1428164885%26oauth_version%3D1.0%26q%3D%2523freebandnames%26result_type%3Dmixed%26since_id%3D24012619984051000"

    (resp, content) = client.request("https://api.twitter.com/1.1/search/tweets.json", "q=%23freebandnames&since_id=24012619984051000&max_id=250126199840518145&result_type=mixed&count=4")
    
    print resp
    print '\n\n\n\n\n'
    print content

get_creds()
