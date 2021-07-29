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
/*
	useEffect(() => {
		//1번 방법) axios, http-proxy-middleware 사용
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
		//2번 방법) local data 사용
		setItems(localData.items);
	}, [items]);
*/

	// 약수터 필터 정보 option
	const [option, setOption] = useState(null);
	const [soption, setSOption] = useState(null);

	//big option  ex) 서울, 경기, ...
	const options = useMemo(()=> {
		let list = [];
		region.region.map(r => list.push({value:r.big, label:r.big}));
		return list;
	}, []);
	const selectChangeA = (e) => {
		setOption(e);
	};

	// small option  ex) 부평구, 수원시, ...
	const soptions = useMemo(()=> {
		let list = [];
		console.log(option);
		if(option === null) return list;
		region.region.filter(r => r.big === option.value).map(r => r.small.map(k => list.push({value:k, label:k})));
		console.log(list);
		return list;
	}, [option]);
	const selectChangeB = (e) => {
		setSOption(e);
	};

	// 지역 초기화 옵션
	const [optionReset, setOptionReset] = useState(true);
	const resetOption = () => {
		setOption(null)
		setSOption(null)
		setOptionReset(boolElement => !boolElement);
	};

	return (
		<>
			<CautionPage />
			<div style={{fontWeight:'bold', marginTop:'3%', marginBottom:'3%', fontSize:'larger', textAlign: 'center'}}>
				우리 동네 약수터 안심하고 먹을만 한가요...?
			</div>
			<div style={{
				marginLeft:'35%',
				marginRight:'35%',
				textAlign: 'center'
			}}>
				<div style={{marginBottom:'5%'}}>
					<Select
						value={option}
						options={options}
						onChange={selectChangeA}
						placeholder="대분류.."
					/>
				</div>
				<Select
					value={soption}
					options={soptions}
					onChange={selectChangeB}
					placeholder="소분류.."
				/>
				<div style={{marginTop:'3%', marginBottom:'3%'}}>
					<button onClick={resetOption}>초기화</button>
				</div>
			</div>
			<div>
				<RenderAfterNavermapsLoaded
					ncpClientId={'qc9tjlbthj'} // personal client id
					error={<p>Maps Load Error...</p>}
					loading={<p>Maps Loading...</p>}
				>
					<NaverMapAPI
						waterSpringList={items}
						regionOption={option === null ? "" : option.value}
						smallOption={soption === null ? "" : soption.value}
						optionReset={optionReset}
					/>
				</RenderAfterNavermapsLoaded>
			</div>
		</>
	);
}

export default App;
