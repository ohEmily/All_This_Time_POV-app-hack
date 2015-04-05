import search_tweets
import scrape2
import db
import sys

MAX_INSERTION_COUNT = 20

if __name__ == "__main__":
    mongo_search = db.init()    

    twitter_queries =  {"temperature" : '"the temperature was"',
			"president" : '"the president was"',
			"number1" : '"number one record"',
			"top_news" : '"the biggest news story"',
			"television" : '"the tv was on"',
			"wonderful_life" : '"i spent the night watching"',
			"run" : '"decided to go for a run"',
			"alone" : '"But you are not alone"',
			"father" : 'my "passed away yesterday"',
			"snowflakes" : '"the first snowflakes"',
			"cold" : '"the temperature was"',
			"represents" : '"christmas represents"',
			"lost" : '"lost someone"',
			"complex" : '"complex emotions"',
			"almost" : '"it was almost beautiful"',
			}
    #search_term = raw_input('Enter a search term or phrase. ')

    #if search_term not in db.COLLECTIONS:
    #    print 'This is not one of the collections included in this app.'
    #    sys.exit(0)    

    #tweet_list = search_tweets.search(search_term.split())
    #tweet_list = scrape2.scrape_keyword(search_term)
    for search_term in db.COLLECTIONS:
	    tweet_list = scrape2.christmas_search(twitter_queries[search_term])

	    if (tweet_list):
		for tweet_curr in tweet_list[0:MAX_INSERTION_COUNT]:
		    db.insert(mongo_search, tweet_curr, search_term) #db.db possibly confusing or mongo_search
		#print db.query(mongo_search, search_term)
	    else:
		print 'This search yielded no results. No entries added to database.'
