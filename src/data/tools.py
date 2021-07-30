from urllib.request import urlopen
from urllib.parse import urlencode, unquote, quote_plus
import requests
import json
from datetime import datetime, timedelta

#-----------------------------------------------------------------------------------

def checkTime():
	now = datetime.now()
	endday = now + timedelta(days=-1)
	startday = now + timedelta(days=-5)
	endDt = str(endday.year) + str(endday.month).zfill(2) + str(endday.day).zfill(2)
	endHh = str(endday.hour).zfill(2)
	startDt = str(startday.year) + str(startday.month).zfill(2) + str(startday.day).zfill(2)
	startHh = str(startday.hour).zfill(2) #날짜 지정
	return endDt, endHh, startDt, startHh

#-----------------------------------------------------------------------------------
def sdf():
	wellname = input('약수터명을 입력해주세요 ')

	url = 'http://api.data.go.kr/openapi/tn_pubr_public_appn_mnrlsp_info_api'
	queryParams = '?' + urlencode({quote_plus('serviceKey') :  'CtR%2FUM6cMUC%2F0tN%2BAIEE9qng30I6%2BpqASCWBpWhHRF5EdYpe8%2F32a6tZ3gFbw8ynUqUjE%2Bk1Vuv0bFIlT2AvkQ%3D%3D', quote_plus('numOfRows') : 100, quote_plus('pageNo') : 1, quote_plus('mnrlspNm') : wellname, quote_plus('type') : 'json'})

	get_data2 = requests.get(url + unquote(queryParams))
	result_data2 = get_data2.json()

	localname = result_data2['response']['body']['items'][0]['institutionNm']
	drink_ok = result_data2['response']['body']['items'][0]['qltwtrInspctResultType']
	day_ok = result_data2['response']['body']['items'][0]['qltwtrInspctDate']
	latitude = result_data2['response']['body']['items'][0]['latitude']
	longitude = result_data2['response']['body']['items'][0]['longitude']
	roadname = result_data2['response']['body']['items'][0]['lnmadr']
	#localname : 관할 기관명, drink_ok : 수질검사 결과, day_ok : 수질검사 날짜, latitude : 위도, longitude : 경도
	print(day_ok, drink_ok, latitude, longitude)

#------------------------------------------------------------------------------------

def checkWeather(wellname, localname, roadname, drink_ok, endDt, endHh, startDt, startHh):
	localcode = 0
	if '서울' in localname :
		localcode = 108
	elif '광명' in localname :
		localcode = 108
	elif '중랑구청' in localname :
		localcode = 108
	elif '성북구' in localname :
		localcode = 108
	elif '구리시' in localname :
		localcode = 108
	elif '노원구' in localname :
		localcode = 108
	elif '강북구' in localname :
		localcode = 108
	elif '의정부' in localname :
		localcode = 108
	elif '속초' in localname :
		localcode = 90
	elif '양양군' in localname :
		localcode = 90
	elif '북춘천' in localname :
		localcode = 93
	elif '가평군' in localname :
		localcode = 93
	elif '철원' in localname :
		localcode = 95
	elif '화천군' in localname :
		localcode = 95
	elif '동두천' in localname :
		localcode = 98
	elif '연천군' in localname :
		localcode = 98
	elif '상하수과' in localname :
		localcode = 98
	elif '파주' in localname :
		localcode = 99
	elif '고양시' in localname :
		localcode = 99
	elif '김포시' in localname :
		localcode = 99
	elif '양주' in localname :
		localcode = 99
	elif '대관령' in localname :
		localcode = 100
	elif '춘천' in localname :
		localcode = 101
	elif '백령도' in localname :
		localcode = 102
	elif '북강릉' in localname :
		localcode = 104
	elif '강릉' in localname :
		localcode = 105
	elif '동해' in localname :
		localcode = 106
	elif '인천' in localname :
		localcode = 112
	elif '시흥시' in localname :
		localcode = 112
	elif '부천시' in localname :
		localcode = 112
	elif '연수구청' in localname :
		localcode = 112
	elif '원주' in localname :
		localcode = 114
	elif '울릉군' in localname :
		localcode = 115
	elif '수원' in localname :
		localcode = 119
	elif '맑은물운영과' in localname :
		localcode = 119
	elif '안산시' in localname :
		localcode = 119
	elif '처인구' in localname :
		localcode = 119
	elif '기흥구' in localname :
		localcode = 119
	elif '수지구' in localname :
		localcode = 119
	elif '오산시' in localname :
		localcode = 119
	elif '의왕' in localname :
		localcode = 119
	elif '군포시' in localname :
		localcode = 119
	elif '안양시' in localname :
		localcode = 119
	elif '과천시' in localname :
		localcode = 119
	elif '영월' in localname :
		localcode = 121
	elif '충주' in localname :
		localcode = 127
	elif '괴산' in localname :
		localcode = 127
	elif '서산' in localname :
		localcode = 129
	elif '태안군' in localname :
		localcode = 129
	elif '당진' in localname :
		localcode = 129
	elif '울진' in localname :
		localcode = 130
	elif '청주' in localname :
		localcode = 131
	elif '증평군' in localname :
		localcode = 131
	elif '대전' in localname :
		localcode = 133
	elif '추풍령' in localname :
		localcode = 135
	elif '안동' in localname :
		localcode = 136
	elif '상주' in localname :
		localcode = 137
	elif '포항' in localname :
		localcode = 138
	elif '군산' in localname :
		localcode = 140
	elif '대구' in localname :
		localcode = 143
	elif '전주' in localname :
		localcode = 146
	elif '울산' in localname :
		localcode = 152
	elif '창원' in localname :
		localcode = 155
	elif '광주광역시' in localname :
		localcode = 156
	elif '화순군청' in localname :
		localcode = 156
	elif '환경청소과' in localname :
		localcode = 156
	elif '담양' in localname :
		localcode = 156
	elif '부산' in localname :
		localcode = 159
	elif '동래구청' in localname :
		localcode = 159
	elif '영도구' in localname :
		localcode = 159
	elif '금정구청' in localname :
		localcode = 159
	elif '통영' in localname :
		localcode = 162
	elif '목포' in localname :
		localcode = 165
	elif '여수' in localname :
		localcode = 168
	elif '흑산도' in localname :
		localcode = 169
	elif '완도' in localname :
		localcode = 170
	elif '고창' in localname :
		localcode = 172
	elif '장성군' in localname :
		localcode = 172
	elif '순천' in localname :
		localcode = 174
	elif '홍성' in localname :
		localcode = 177
	elif '예산군' in localname :
		localcode = 177
	elif '청양' in localname :
		localcode = 177
	elif '제주' in localname :
		localcode = 184
	elif '고산' in localname :
		localcode = 185
	elif '성산' in localname :
		localcode = 188
	elif '서귀포' in localname :
		localcode = 189
	elif '환경보전국 물정책과' in localname :
		localcode = 189
	elif '진주' in localname :
		localcode = 192
	elif '경상남도 고성군' in localname :
		localcode = 192
	elif '건설수도과' in localname :
		localcode = 192
	elif '강화' in localname :
		localcode = 201
	elif '선원면사무소' in localname :
		localcode = 201
	elif '양평' in localname :
		localcode = 202
	elif '경기도 광주시' in localname :
		localcode = 202
	elif '성남' in localname :
		localcode = 202
	elif '하남' in localname :
		localcode = 202
	elif '이천' in localname :
		localcode = 203
	elif '인제' in localname :
		localcode = 211
	elif '양구군' in localname :
		localcode = 211
	elif '강원도 고성군' in localname :
		localcode = 211
	elif '홍천' in localname :
		localcode = 212
	elif '태백' in localname :
		localcode = 216
	elif '삼척시' in localname :
		localcode = 216
	elif '상수도사업소' in localname :
		localcode = 216
	elif '정선군' in localname :
		localcode = 217
	elif '평창군' in localname :
		localcode = 217
	elif '제천' in localname :
		localcode = 221
	elif '단양군' in localname :
		localcode = 221
	elif '보은' in localname :
		localcode = 226
	elif '천안' in localname :
		localcode = 232
	elif '아산시' in localname :
		localcode = 232
	elif '진천군' in localname :
		localcode = 232
	elif '평택시' in localname :
		localcode = 232
	elif '보령' in localname :
		localcode = 235
	elif '부여' in localname :
		localcode = 236
	elif '서천군' in localname :
		localcode = 236
	elif '금산' in localname :
		localcode = 238
	elif '옥천군' in localname :
		localcode = 238
	elif '영동군' in localname :
		localcode = 238
	elif '논산' in localname :
		localcode = 238
	elif '세종' in localname :
		localcode = 239
	elif '공주시' in localname :
		localcode = 239
	elif '계룡산 국립공원' in localname :
		localcode = 239
	elif '계룡시' in localname :
		localcode = 239
	elif '부안' in localname :
		localcode = 243
	elif '임실' in localname :
		localcode = 244
	elif '맑은물사업본부' in localname :
		localcode = 244
	elif '정읍' in localname :
		localcode = 245
	elif '남원' in localname :
		localcode = 247
	elif '구례군' in localname :
		localcode = 247
	elif '곡성군' in localname :
		localcode = 247
	elif '장수' in localname :
		localcode = 248
	elif '고창군' in localname :
		localcode = 251
	elif '영광군' in localname :
		localcode = 252
	elif '김해시' in localname :
		localcode = 253
	elif '순창군' in localname :
		localcode = 254
	elif '북창원' in localname :
		localcode = 255
	elif '양산시' in localname :
		localcode = 257
	elif '웅상출장소 도시건설과' in localname :
		localcode = 257
	elif '보성군' in localname :
		localcode = 258
	elif '강진' in localname :
		localcode = 259
	elif '수도사업소' in localname :
		localcode = 259
	elif '장흥' in localname :
		localcode = 260
	elif '해남' in localname :
		localcode = 261
	elif '고흥' in localname :
		localcode = 262
	elif '의령군' in localname :
		localcode = 263
	elif '함양군' in localname :
		localcode = 264
	elif '광양시' in localname :
		localcode = 266
	elif '진도군' in localname :
		localcode = 268
	elif '봉화' in localname :
		localcode = 271
	elif '영주' in localname :
		localcode = 272
	elif '문경' in localname :
		localcode = 273
	elif '청송군' in localname :
		localcode = 276
	elif '영덕' in localname :
		localcode = 277
	elif '의성' in localname :
		localcode = 278
	elif '구미' in localname :
		localcode = 279
	elif '영천' in localname :
		localcode = 281
	elif '경주시' in localname :
		localcode = 283
	elif '거창' in localname :
		localcode = 284
	elif '무주' in localname :
		localcode = 284
	elif '합천' in localname :
		localcode = 285
	elif '창녕군' in localname :
		localcode = 285
	elif '밀양' in localname :
		localcode = 288
	elif '산청' in localname :
		localcode = 289
	elif '거제' in localname :
		localcode = 294
	elif '남해' in localname :
		localcode = 295
	elif '충청북도 보은군' in roadname :
		localcode = 131
	elif '강원도 횡성군' in roadname :
		localcode = 114
	else:
		print(wellname, '지역 찾지 못함')
		return None, None
	print(localcode)
	#------------------------------------------------------------------------------------
	url = 'http://apis.data.go.kr/1360000/AsosHourlyInfoService/getWthrDataList'
	queryParams = '?' + urlencode({quote_plus('serviceKey') : 'CtR%2FUM6cMUC%2F0tN%2BAIEE9qng30I6%2BpqASCWBpWhHRF5EdYpe8%2F32a6tZ3gFbw8ynUqUjE%2Bk1Vuv0bFIlT2AvkQ%3D%3D', quote_plus('numOfRows') : 100, quote_plus('pageNo') : 1, quote_plus('dataCd') : 'ASOS', quote_plus('dateCd') : 'HR', quote_plus('stnIds') : localcode, quote_plus('endDt') : endDt, quote_plus('endHh') : endHh, quote_plus('startHh') : startHh, quote_plus('startDt') : startDt, quote_plus('dataType') : 'JSON'})

	get_data = requests.get(url + unquote(queryParams))
	result_data = get_data.json()
	#------------------------------------------------------강수량 데이터 불러오기(건들지 말 것!)
	total_rn = 0.0
	n = 0
	while total_rn < 10 and n+7 < int(result_data['response']['body']['totalCount']) :
		total_rn = 0.0
		for i in range(n, n+8) :
			rn = result_data['response']['body']['items']['item'][i]['rn']
			if (rn == '') :
				rn = 0.0
			total_rn += float(rn)
		n += 1
	#---------강수량 10mm이하 지역 : total_rn = 0, 10mm이상 지역 : total_rn = 내린만큼----------
	if (drink_ok == '적합' and total_rn == 0.0) :
		print(wellname, '음용에 적합한 물입니다')
		return True, total_rn
	else :
		print(wellname, total_rn, '음용에 주의가 필요한 물입니다')
		return False, total_rn

def FindrecentDate(wellname):
	url = 'http://api.data.go.kr/openapi/tn_pubr_public_appn_mnrlsp_info_api'
	queryParams = '?' + urlencode({quote_plus('serviceKey') :  'CtR%2FUM6cMUC%2F0tN%2BAIEE9qng30I6%2BpqASCWBpWhHRF5EdYpe8%2F32a6tZ3gFbw8ynUqUjE%2Bk1Vuv0bFIlT2AvkQ%3D%3D', quote_plus('numOfRows') : 1000, quote_plus('pageNo') : 1, quote_plus('mnrlspNm') : wellname, quote_plus('type') : 'json'})

	get_data2 = requests.get(url + unquote(queryParams))
	result_data2 = get_data2.json()

	i = 0
	n = 1
	while i+n < int(result_data2['response']['body']['totalCount']) :
	   lat = result_data2['response']['body']['items'][i]['latitude']
	   lng = result_data2['response']['body']['items'][i]['longitude']   
	   address = result_data2['response']['body']['items'][i]['lnmadr']
	   day_ok = result_data2['response']['body']['items'][i]['qltwtrInspctDate']
	   date_ok = result_data2['response']['body']['items'][i+n]['qltwtrInspctDate']
	   day = re.findall("\d+", day_ok)
	   date = re.findall("\d+", date_ok)
	   (a, b, c) = day
	   (d, e, f) = date
	   if(a>d) :
	      n += 1
	   elif(a==d and b>e) :
	      n += 1
	   else : 
	      i += 1
	      
	lat = result_data2['response']['body']['items'][i]['latitude']
	lng = result_data2['response']['body']['items'][i]['longitude']   
	address = result_data2['response']['body']['items'][i]['lnmadr']
	day_ok = result_data2['response']['body']['items'][i]['qltwtrInspctDate']
	day = re.findall("\d+", day_ok)
	date = re.findall("\d+", date_ok)
	(a, b, c) = day
	(d, e, f) = date

	return result_data2['response']['body']['items'][i]