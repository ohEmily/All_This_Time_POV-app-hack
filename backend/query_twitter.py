import search_tweets
import scrape2
import db
import sys

MAX_INSERTION_COUNT = 20

if __name__ == "__main__":
    mongo_search = db.init()    

    search_term = raw_input('Enter a search term or phrase. ')

    if search_term not in db.COLLECTIONS:
        print 'This is not one of the collections included in this app.'
        sys.exit(0)    

    tweet_list = search_tweets.search(search_term.split())
    #tweet_list = scrape2.scrape_keyword(search_term)
    #tweet_list = scrape2.christmas_search(search_term)

    if (tweet_list):
        for tweet_curr in tweet_list[0:MAX_INSERTION_COUNT]:
            db.insert(db, tweet_curr, search_term)
    else:
        print 'This search yielded no results. No entries added to database.'
