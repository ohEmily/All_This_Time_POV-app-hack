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

# puts tweet into correct database
def insert(db, tweet, search_term):
    if search_term not in COLLECTIONS:
        return False

    collection = db[search_term]

    post_id = posts.insert_one(tweet).inserted_id

    print "Inserted post %d into collection %s." % post_id, search_term

# returns the corresponding collection for that search term
def query(db, search_term):
    if search_term not in COLLECTIONS:
        return False

    collection = db[search_term]

    return collection.find()
