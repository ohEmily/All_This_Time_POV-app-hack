from flask import Flask, render_template, send_from_directory, redirect
import db
import giphy_api
import random

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
    search_json = giphy_api.search_giphy(a_string)
    rand_index = random.randint(0, (int(giphy_api.RESPONSE_LIMIT) - 1))
    
    return redirect(search_json['data'][rand_index]['embed_url'])

@app.route('/')
def send_index():
    return render_template('index.html')


if __name__== '__main__':
    app.run()
