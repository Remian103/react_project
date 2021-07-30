import csv
import json

json_data = dict()

with open('regionList.csv', 'r', encoding='utf-8') as f:
	rdr = csv.reader(f)
	for line in rdr:
		if len(line) is 4:
			if line[0] not in json_data:
				json_data[line[0]] = set()
			if line[1] is not "":
				json_data[line[0]].add(line[1])
			if line[2] is not "":
				json_data[line[0]].add(line[2])

for key in json_data:
	json_data[key] = list(json_data[key])		
print(json_data)

region = dict()
region["region"] = []
for key in json_data:
	tmp = dict()
	tmp["big"] = key
	tmp["small"] = json_data[key]
	region["region"].append(tmp)

print(region)

with open("region.json", "w", encoding='UTF8') as json_file:
    json.dump(region, json_file, ensure_ascii=False)