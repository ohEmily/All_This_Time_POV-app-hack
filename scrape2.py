from bs4 import BeautifulSoup
import json
from urllib import urlopen

def scrape_keyword(search_term):

	url_stub = 'https://twitter.com/i/search/timeline?f=realtime&q='+ search_term.replace(" ", "%20") + '&include_available_features=1&include_entities=1&scroll_cursor='
	scroll_cursor = "TWEET-583784383259127808-583784383259127808-B"

	mongo_list = []

	for x in xrange(1, 3):
		# this should run until a condition
		# the tweets are sequential so you can find tweets between 5439459345793453 and 923492743237442
		# for tweets in a time period
		print "__________________________________________________________"
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
			print(tweettimestamp.get('href')) # tweet permalink
			print(timestamp.get('data-time-ms')) # tweet unix time
			print(tweettimestamp.get('title')) # tweet human readable time
			profile = last_a_tag.find(class_="tweet");
			avatar = last_a_tag.find(class_="avatar");
			print(avatar.get('src')) # profile pic
			print(profile.get('data-name')) # display name
			print(profile.get('data-screen-name')) # username
			print "***********************************"
			item = {}
			item["ID"] = tweettimestamp.get('href')
			item["tweet"] = tweettext.text
			item["time"] = timestamp.get('data-time-ms')
			item["username"] = profile.get('data-screen-name')
			mongo_list.append(item)
			print len(mongo_list)

	return mongo_list

print scrape_keyword("imissyougrandma")






