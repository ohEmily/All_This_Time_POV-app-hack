from pymongo import MongoClient

DB_NAME = "POV-hack"

LAUGH_TERM = "laugh"
CRY_TERM = "cry"
THINK_TERM = "think"
COLLECTIONS = [LAUGH_TERM, CRY_TERM, THINK_TERM]

def init():
    client = MongoClient('localhost', 8000)
    db = client[DB_NAME]

    return db

def insert(db, tweet, search_term):
    if search_term not in COLLECTIONS:
        return -1

    collection = db[search_term]

    row = {"ID" = tweet['id'],
           "content" = tweet['content'],
           "user" = tweet['user'],
           "date" = tweet['date']
    }

    post_id = posts.insert_one(row).inserted_id

    print "Inserted post %d into collection %s." % post_id, search_term


