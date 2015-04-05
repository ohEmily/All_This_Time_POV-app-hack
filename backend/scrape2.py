from bs4 import BeautifulSoup
import json
from urllib import urlopen

def scrape_keyword(search_term):

	url_stub = 'https://twitter.com/i/search/timeline?f=realtime&q='+ search_term.replace(" ", "%20") + '&include_available_features=1&include_entities=1&scroll_cursor='
	scroll_cursor = "TWEET-583784383259127808-583784383259127808-B"
	scroll_cursor = "TWEET-548710045295595520-548710045295595520-B"

	mongo_list = []
	# today scroll cursor 583784383259127808
	# new years day scroll cursor https://twitter.com/PPDCrimeScene/status/550877054544412672
	# chrismas eve scroll cursor https://twitter.com/fckali/status/547366341439942656
	# boxing day https://twitter.com/amychea/status/548710045295595520

	for x in xrange(1, 30):
		# this should run until a condition
		# the tweets are sequential so you can find tweets between 5439459345793453 and 923492743237442
		# for tweets in a time period
		#print "__________________________________________________________"
		url = urlopen(url_stub + scroll_cursor)
		data = json.load(url)
		scroll_cursor = data["scroll_cursor"]
		soup = BeautifulSoup(data["items_html"])

		for last_a_tag in soup.find_all("li", attrs={"data-item-type": "tweet"}):
			tweettext = last_a_tag.find(class_="tweet-text");
			tweettimestamp = last_a_tag.find(class_="tweet-timestamp");
			timestamp = last_a_tag.find(class_="_timestamp");
			#print(last_a_tag.prettify())
			#print(tweettext.text) # tweet content
			#print(tweettimestamp.get('href')) # tweet permalink
			#print(timestamp.get('data-time-ms')) # tweet unix time
			print(tweettimestamp.get('title')) # tweet human readable time
			profile = last_a_tag.find(class_="tweet");
			avatar = last_a_tag.find(class_="avatar");
			#print(avatar.get('src')) # profile pic
			#print(profile.get('data-name')) # display name
			#print(profile.get('data-screen-name')) # username
			#print "***********************************"
			item = {}
			item["id"] = profile.get('data-item-id')
			#item["ID"] = tweettimestamp.get('href')
			item["content"] = tweettext.text
			#item["time"] = timestamp.get('data-time-ms')
			item["date"] = tweettimestamp.get('title')
			item["user"] = profile.get('data-screen-name')
			mongo_list.append(item)
			#print len(mongo_list)

	return mongo_list

def christmas_search(search_term):

	url_stub = 'https://twitter.com/i/search/timeline?f=realtime&q='+ search_term.replace(" ", "%20") + '&include_available_features=1&include_entities=1&scroll_cursor='
	scroll_cursor = "TWEET-583784383259127808-583784383259127808-B"
	scroll_cursor = "TWEET-548710045295595520-548710045295595520-B"
	tweet_id = "550877054544412672"

	mongo_list = []
	# today scroll cursor 583784383259127808
	# new years day scroll cursor https://twitter.com/PPDCrimeScene/status/550877054544412672
	# chrismas eve scroll cursor https://twitter.com/fckali/status/547366341439942656

	while tweet_id > "547366341439942656" and len(mongo_list) < 40:
		# this should run until a condition
		# the tweets are sequential so you can find tweets between 5439459345793453 and 923492743237442
		# for tweets in a time period
		#print "__________________________________________________________"
		url = urlopen(url_stub + scroll_cursor)
		data = json.load(url)
		scroll_cursor = data["scroll_cursor"]
		soup = BeautifulSoup(data["items_html"])

		for last_a_tag in soup.find_all("li", attrs={"data-item-type": "tweet"}):
			tweettext = last_a_tag.find(class_="tweet-text");
			tweettimestamp = last_a_tag.find(class_="tweet-timestamp");
			timestamp = last_a_tag.find(class_="_timestamp");
			#print(last_a_tag.prettify())
			print(tweettext.text) # tweet content
			#print(tweettimestamp.get('href')) # tweet permalink
			#print(timestamp.get('data-time-ms')) # tweet unix time
			print(tweettimestamp.get('title')) # tweet human readable time
			profile = last_a_tag.find(class_="tweet");
			avatar = last_a_tag.find(class_="avatar");
			#print(avatar.get('src')) # profile pic
			#print(profile.get('data-name')) # display name
			#print(profile.get('data-screen-name')) # username
			#print "***********************************"
			item = {}
			item["id"] = profile.get('data-item-id')
			tweet_id = profile.get('data-item-id')
			if tweet_id < "547366341439942656":
				break
			#item["ID"] = tweettimestamp.get('href')
			item["content"] = tweettext.text
			#item["time"] = timestamp.get('data-time-ms')
			item["date"] = tweettimestamp.get('title')
			item["user"] = profile.get('data-screen-name')
			mongo_list.append(item)
			#print len(mongo_list)

	return mongo_list
	

#print christmas_search('my "passed away yesterday"')
#print christmas_search('"decided to go for a run"')
#print christmas_search('"number one record"')
#print christmas_search('"the tv was on"')
#print christmas_search('"i spent the night watching"')
#print christmas_search('"the biggest news story"')
#print christmas_search('"christmas represents"')
#print christmas_search('"For you the holidays represent"') #not so good
#print christmas_search('"But you are not alone"')
#print christmas_search('"But I am not alone"')
#print christmas_search('"But we are not alone"')
#print christmas_search('"number of days till christmas"')
#print christmas_search('my "passed away yesterday"')
#print christmas_search('"my father died" "days ago"')
#print christmas_search('"the temperature was"')
##print christmas_search('"on this day, you are not alone"') #not so good






