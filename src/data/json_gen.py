from tools import checkTime, checkWeather
# endDt, endHh, startDt, startHh = checkTime()
# bool, total_rn = checkWeather(wellname, localname, drink_ok, endDt, endHh, startDt, startHh)
from coord import find_coord
import json
import requests

json_data = json.load(open('key.json', 'r'))
serviceKey = json_data["DATA_GO_KR_KEY"]
googleKey = json_data["GOOGLEMAPS_KEY"]

endDt, endHh, startDt, startHh = checkTime()

total_col = 0
samenamenum = 0
wellnamelist = set({})
keylist = set({})
samename = set({})
wellnum = 0;
well_list = []

for pageNo in range(0, 15):
	url = 'http://api.data.go.kr/openapi/tn_pubr_public_appn_mnrlsp_info_api?serviceKey='+serviceKey+'&pageNo='+str(pageNo)+'&numOfRows=100&type=json'
	res = requests.get(url).json();

	for item in res['response']['body']['items']:
		key = item['mnrlspNm'] + "&" + item['lnmadr']


		if item['mnrlspNm'] in wellnamelist:
			if key not in keylist:
				print(key, "/ 이름이 같은 약수터가 있습니다..")
				samenamenum += 1
				samename.add(item['mnrlspNm'])
		wellnamelist.add(item['mnrlspNm'])
		keylist.add(key)
		total_col += 1
		if len(wellnamelist) != len(well_list):
			well_list.append(item)

print("약수터 개수", len(wellnamelist))
print("쿼리 개수", total_col)
print("같은 이름 약수터 개수", samenamenum)
print(samename)
print(len(samename))

for well in well_list:
	isDrinkable, total_rn = checkWeather(well['mnrlspNm'], well['institutionNm'], well['lnmadr'], well['qltwtrInspctResultType'], endDt, endHh, startDt, startHh, serviceKey)
	well['isDrinkable'] = str(isDrinkable)
	well['total_rn'] = str(total_rn)
	if well['latitude'] == "":
		lat, lng = find_coord(well['lnmadr'], googleKey)
		well['latitude'] = str(lat)
		well['longitude'] = str(lng)

json_data = dict()
json_data['items'] = well_list
with open("well_list_file.json", "w", encoding='UTF8') as json_file:
    json.dump(json_data, json_file, ensure_ascii=False)