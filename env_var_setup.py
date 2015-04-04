import os
import set_env
from requests_oauthlib import OAuth1Session
import webbrowser

REQUEST_TOKEN_URL = 'https://api.twitter.com/oauth/request_token'
ACCESS_TOKEN_URL = 'https://api.twitter.com/oauth/access_token'
AUTHORIZATION_URL = 'https://api.twitter.com/oauth/authorize'
SIGNIN_URL = 'https://api.twitter.com/oauth/authenticate'

# from Twitter's official Python library:
# https://github.com/bear/python-twitter/blob/master/get_access_token.py
def get_access_token(consumer_key, consumer_secret):
    oauth_client = OAuth1Session(
        consumer_key, 
        client_secret=consumer_secret
    )
    
    print 'Requesting temp token from Twitter'
    try:
        resp = oauth_client.fetch_request_token(REQUEST_TOKEN_URL)
    except ValueError, e:
        print 'Invalid respond from Twitter requesting temp token: %s' % e
        return
    url = oauth_client.authorization_url(AUTHORIZATION_URL)
    
    print ''
    print 'I will try to start a browser to visit the following Twitter page'
    print 'if a browser will not start, copy the URL to your browser'
    print 'and retrieve the pincode to be used'
    print 'in the next step to obtaining an Authentication Token:'
    print ''
    print url
    print ''
    
    webbrowser.open(url)
    pincode = raw_input('Pincode? ')
    print ''
    print 'Generating and signing request for an access token'
    print ''
    
    oauth_client = OAuth1Session(consumer_key, client_secret=consumer_secret,
            resource_owner_key=resp.get('oauth_token'),
            resource_owner_secret=resp.get('oauth_token_secret'),
            verifier=pincode
            )
    
    try:
        resp = oauth_client.fetch_access_token(ACCESS_TOKEN_URL)
    except ValueError, e:
         print 'Invalid respond from Twitter requesting access token: %s' % e
         return

    os.environ["TWITTER_OAUTH_TOKEN"] = resp.get('oauth_token')
    os.environ["TWITTER_OAUTH_TOKEN_SECRET"] = resp.get('oauth_token_secret')
    
    print 'Your Twitter Access Token key: %s' % resp.get('oauth_token')
    print ' Access Token secret: %s' % resp.get('oauth_token_secret')
    print ''

def setup():
    try:
        os.environ["TWITTER_CONSUMER_KEY"]
        os.environ["TWITTER_CONSUMER_SECRET"]
    except KeyError:
        set_env.set_env_vars()

    twitter_consumer_key = os.environ['TWITTER_CONSUMER_KEY']
    twitter_consumer_secret = os.environ['TWITTER_CONSUMER_SECRET'] 

    try:
        os.environ["TWITTER_OAUTH_TOKEN"]
        os.environ["TWITTER_OAUTH_TOKEN_SECRET"]
    except KeyError:
        get_access_token(twitter_consumer_key, twitter_consumer_secret)

    twitter_oauth_token = os.environ["TWITTER_OAUTH_TOKEN"]
    twitter_oauth_token_secret = os.environ["TWITTER_OAUTH_TOKEN_SECRET"]
