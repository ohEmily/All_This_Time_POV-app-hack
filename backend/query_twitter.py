import search_tweets
import scrape2
import db
import sys

MAX_INSERTION_COUNT = 20

if __name__ == "__main__":
    mongo_search = db.init()    

    twitter_queries =  {"temperature" : '"the temperature was"',
			"president" : '"the temperature was"',
			"number1" : '"the temperature was"',
			"top_news" : '"the biggest news story"',
			"television" : '"the tv was on"',
			"wonderful_life" : '"i spent the night watching"',
			"run" : '"decided to go for a run"',
			"alone" : '"But you are not alone"',
			"father" : 'my "passed away yesterday"',
			"snowflakes" : '"the first snowflakes"',
			"cold" : '"the temperature was"',
			"represents" : '"christmas represents"',
			}
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
