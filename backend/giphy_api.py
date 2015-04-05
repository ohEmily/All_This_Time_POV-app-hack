import urllib, json

SEARCH_URL = 'http://api.giphy.com/v1/gifs/search?' 
ROULETTE_URL = 'http://api.giphy.com/v1/stickers/random?'
RESPONSE_LIMIT = '5'

def roulette_giphy(query_string):
    query_dict = { 
        'api_key' : "dc6zaTOxFJmzC",
        'tag' : query_string
    }

    request_url = ROULETTE_URL + urllib.urlencode(query_dict)
    print 'Sending roulette request to %s' % request_url
    return json.loads(urllib.urlopen(request_url).read())


def search_giphy(query_string):
    query_dict = { 
        'q' : query_string,
        'api_key' : "dc6zaTOxFJmzC",
        'limit' : RESPONSE_LIMIT
    }

    request_url = SEARCH_URL + urllib.urlencode(query_dict)
    
    return json.loads(urllib.urlopen(request_url).read())


def main():
    query = raw_input('What would you like to search Giphy for?  ')
    json_data = roulette_giphy(query)

    print json.dumps(json_data, sort_keys=True, indent=4)

main()
