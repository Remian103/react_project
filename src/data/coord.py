#pip install -U googlemaps : 라이브러리 설치
import googlemaps

def find_coord(address, googleKey):
	json_data = json.load(open('key.json', 'r'))

	GOOGLEMAPS_KEY = googleKey
	gmaps = googlemaps.Client(key = GOOGLEMAPS_KEY)
	geocoded = gmaps.geocode(address, language = 'ko')
	latitude = geocoded[0]["geometry"]["location"]["lat"]
	longitude = geocoded[0]["geometry"]["location"]["lng"]
	return latitude, longitude