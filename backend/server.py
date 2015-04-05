from flask import Flask, render_template, send_from_directory
import db

app = Flask(__name__, static_url_path='')

@app.route('/scripts/js/<path:path>')
def send_js(path):
    return send_from_directory('scripts/js', path)


@app.route('/assets/<path:path>')
def send_assets(path):
    return send_from_directory('assets', path)


@app.route('/styles/css/<path:path>')
def send_css(path):
    return send_from_directory('styles/css', path)


#  test route for searching things
@app.route('/search/<a_string>')
def search(a_string):
    if a_string not in db.COLLECTIONS:
        return 'Bad search string.'

    mongo_search = db.init() 
    retval = mongo_search.query(a_string)

    return str(retval)


@app.route('/')
def send_index():
    return render_template('index.html')


if __name__== '__main__':
    app.run()
