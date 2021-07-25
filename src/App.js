//import logo from './logo.svg';
//import './App.css';
import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import NaverMapAPI from './NaverMapAPI';
import { RenderAfterNavermapsLoaded } from 'react-naver-maps';
import Select from 'react-select';
import CautionPage from './CautionPage'

//import localData from './data/test_json_data.json';
import localData from './data/well_list_file.json';
import region from './data/region.json';



function App() {
	// waterSpringList
	const [items, setItems] = useState(
		localData.items
	);

	useEffect(() => {
		/*
		// axios, http-proxy-middleware 사용
		console.log("약수터 정보 불러오는중 (axios)");
		for(let i = 1; i <= 15; i++) {
			let pageNo = String(i);
			let url = '/openapi/tn_pubr_public_appn_mnrlsp_info_api?serviceKey=CtR%2FUM6cMUC%2F0tN%2BAIEE9qng30I6%2BpqASCWBpWhHRF5EdYpe8%2F32a6tZ3gFbw8ynUqUjE%2Bk1Vuv0bFIlT2AvkQ%3D%3D&pageNo='+pageNo+'&numOfRows=100&type=json';
			console.log(url);
			axios.get(url)
			.then((res) => {
				if(res.data.response.header.resultCode === "00") {
					console.log(res.data.response.body.items);
					console.log('list updated pageNo ' + pageNo);
					setItems((items) =>([
						...items,
						...res.data.response.body.items
					]));
				}
				else {
					console.log("fail to request..")
				}
				console.log(items);
			})
			.catch((error) => {
				console.log(error);
			});
		}
		*/
		//local data 사용
		setItems(localData.items);
	}, [items]);

	const [option, setOption] = useState("");
/*	const options = useMemo(()=> [
		{value:"서울", label:"서울"},
		{value:"인천", label:"인천"},
		{value:"경기", label:"경기"},
		{value:"충청남도", label:"충남"},
	],[]);*/
	const options = useMemo(()=> {
		let list = [];
		region.region.map(r => list.push({value:r.big, label:r.big}));
		return list;
	}, [])

	const soptions = useMemo(()=> {
		let list = [];
		region.region.filter(r => r.big === option).map(r => r.small.map(k => list.push({value:k, label:k})));
		return list;
	}, [option])

	const selectChange = (option) => {
		setOption(option.value);
	};

	useEffect(() => {
		//마커 개수 바꾸기
		console.log(`option 변경됨! ${option}`);
	}, [option]);

	return (
		<>
			<CautionPage />
			<p>{option}</p>
			<div>
				{items.length === 0 ? '약수터 로딩중...' : '약수터 로딩 완료!'}
			</div>
			<div>
				<Select
					options={options}
					onChange={selectChange}
				/>
				<Select
					options={soptions}
				/>
			</div>
			<div>
				<RenderAfterNavermapsLoaded
					ncpClientId={'qc9tjlbthj'} // personal client id
					error={<p>Maps Load Error...</p>}
					loading={<p>Maps Loading...</p>}
				>
					<NaverMapAPI waterSpringList={items} regionOption={option}/>
				</RenderAfterNavermapsLoaded>
			</div>
		</>
	);
}

export default App;
