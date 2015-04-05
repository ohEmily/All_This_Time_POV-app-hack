from pymongo import MongoClient

DB_NAME = "POV-hack"

LAUGH_TERM = "laugh"
CRY_TERM = "cry"
THINK_TERM = "think"


TEMPERATURE_TERM = "temperature"
PRESIDENT_TERM = "president"
NUMBER1_TERM = "number1"
TOP_NEWS_TERM = "top_news"
TELEVISION_TERM = "television"
WONDERFUL_LIFE_TERM = "wonderful_life"
RUN_TERM = "run"
ALONE_TERM = "alone"
FATHER_TERM = "father"
SNOWFLAKES_TERM = "snowflakes"
COLD_TERM = "cold"
REPRESENTS_TERM = "represents"
LOST_TERM = "lost"
COMPLEX_TERM = "complex"
ALMOST_TERM = "almost"

# LAUGH_TERM, CRY_TERM, THINK_TERM, removed temporarily
COLLECTIONS = [TEMPERATURE_TERM, PRESIDENT_TERM, NUMBER1_TERM, TOP_NEWS_TERM, TELEVISION_TERM, WONDERFUL_LIFE_TERM, RUN_TERM, ALONE_TERM, FATHER_TERM, SNOWFLAKES_TERM, COLD_TERM, REPRESENTS_TERM, LOST_TERM, COMPLEX_TERM, ALMOST_TERM]


def init():
    client = MongoClient('localhost', 27017) # default Mongo port
    db = client[DB_NAME]

    return db

# puts tweet into correct database
def insert(db, tweet, search_term):
    if search_term not in COLLECTIONS:
        return False

    collection = db[search_term]

    #post_id = collection.insert(tweet).inserted_id
    collection.insert(tweet)
    #print collection.find_one()

    #print "Inserted post %d into collection %s." % collection.find_one()._id, search_term

# returns the corresponding collection for that search term
def query(db, search_term):
    if search_term not in COLLECTIONS:
        return False

    collection = db[search_term]

    return list(collection.find())
