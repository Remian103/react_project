import React, { useState, useEffect, useMemo } from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import CustomMarker from './CustomMarker';

function NaverMapAPI({waterSpringList, regionOption, smallOption, optionReset}) {
	const navermaps = window.naver.maps;
	// gps 위치
	const [GPSpos, setGPSpos] = useState(
		{}
	);

	const defaultPos = new navermaps.LatLng(35.714091, 127.7179033);
	const defaultZoom = 7;
	const [center, setCenter] = useState(defaultPos);
	const [zoom, setZoom] = useState(defaultZoom);
	
	// gps 정보 수신
	const getLocation = () => {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log("현재 위치 설정됨")
					console.log(position.coords);
					// position.coords.latitude , longitude
					if(position.coords.latitude !== GPSpos._lat ||
						position.coords.longitude !== GPSpos._lng) {
						setGPSpos(
							new navermaps.LatLng(
								position.coords.latitude,
								position.coords.longitude
							)
						);
						setZoom(14);
					}
					setCenter(
						new navermaps.LatLng(
							position.coords.latitude,
							position.coords.longitude
						)
					);
				},
				function(error) {
					console.error(error);
				},
				{
					enableHighAccuracy:false,
					maximumAge:0,
					timeoout:Infinity
				}
			);
		}
		else {
			alert('GPS를 지원하지 않습니다...');
		}
	}

	// 맵 움직임
	const handleCenterChanged = (pos) => {
		setCenter(pos);
	}
	const handleZoomChanged = (zoom) => {
		setZoom(zoom);
	}

	const onClickButton = () => {
		getLocation();

	}

	// 위치 초기화
	const onClickButton2 = () => {
		setCenter(defaultPos);
		setZoom(defaultZoom);
	}

	const [regionPin, setRegionPin] = useState([]);

	useEffect(() => {
		if(regionOption !== "")
			setRegionPin(
				waterSpringList
				.filter(item => item.lnmadr.includes(regionOption))
				.filter(item => item.lnmadr.includes(smallOption))
			);
			setCenter(defaultPos);
			setZoom(defaultZoom);
	}, [regionOption, smallOption]);

	// 첫 시작 페이지에 유명 약수터 표기하기 위한 변수 설정
	const popularList = useMemo(() =>[
		"원산면옥(초정약수터)",
		"달기약수탕",
		"신촌약수탕",
		"초수골약수터(상탕)",
		"초수골약수터(하탕)",
		"도동약수터",
		"고란약수",
		"당몰샘",
		"영실물",
		"함박산약수터",
		"상원사샘터",
	], []);

	// 초기화 실행
	useEffect(() => {
		setRegionPin(waterSpringList.filter(item => popularList.includes(item.mnrlspNm)))
		setCenter(defaultPos);
		setZoom(defaultZoom);
	}, [optionReset]);


	// test 용 버튼
	const onClickHandle = () => {
		console.log(center);
		console.log(zoom);
	};

	// 핀 누르면 자동으로 이동
	const [currentPin, setCurrentPin] = useState(null);
	useEffect(() => {
		if(currentPin !== null) {
			setCenter(new navermaps.LatLng(currentPin.latitude,currentPin.longitude));
			setZoom(13);
		}
	}, [currentPin]);

	return (
		<>
			<div style={{display:'flex', justifyContent:'center'}}>
				<div>
					<button onClick={onClickButton}>현재위치</button>
					<button onClick={onClickButton2}>원위치</button>
					<button onClick={onClickHandle}>테스트</button>
				</div>
				<div> {regionPin.length}개 약수터 발견 </div>
			</div>
			<NaverMap
				mapDivId={'maps-getting-started-uncontrolled'}
				style={{
					width:'100%', // 네이버지도 가로 길이
					height:'85vh' // 네이버지도 세로 길이
				}}
				center={center}
				onCenterChanged={handleCenterChanged}
				zoom={zoom}
				onZoomChanged={handleZoomChanged}
    			logoControlOptions={{
					position: navermaps.Position.LEFT_BOTTOM
    			}}
    			disableKineticPan={true}
			>
				{(Object.keys(GPSpos).length === 0) ? <></> :
					<Marker
						key={0}
						position={GPSpos}
						animation={0}
						onClick={() => {alert('현재위치');}}
					/>
				}
				{regionPin.map((item, index) => {
					if(item.latitude === "") {
						console.log(item.mnrlspNm + "는 좌표값이 없습니다!");
						return (
							<></>
						)
					}
					if(item.mnrlspNm === "탑동약수터") {
						console.log("탑동 약수터는 좌표값이 이상합니다...");
						return (
							<></>
						)
					}
					return (
						<CustomMarker
							item={item}
							id={index+1}
							setter={setCurrentPin}
							navermaps={navermaps}
						/>
					)
				})}
			</NaverMap>
		</>
	);
}



export default NaverMapAPI;