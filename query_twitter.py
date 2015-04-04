import env_var_setup
import search_tweets

if __name__ == "__main__":
    # set up credentials
    env_var_setup.setup()

    search_term = raw_input('Enter a search term or phrase. ')
    tweet_list = search_tweets.search(search_term.split())
