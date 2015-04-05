from flask import Flask
import db

app = Flask(__name__)

@app.route('/')
def index():
    return 'hi!'

#  test route for searching things
@app.route('/search/<a_string>')
def search(a_string):
    if a_string not in db.COLLECTIONS:
        return 'Bad search string.'

    mongo_search = db.init() 
    retval = mongo_search.query(a_string)

    return str(retval)


if __name__== '__main__':
    app.run()
