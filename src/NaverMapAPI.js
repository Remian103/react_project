import React, {useState, useEffect} from 'react';
import { NaverMap, Marker } from 'react-naver-maps';
import CustomMarker from './CustomMarker';

function NaverMapAPI({waterSpringList, regionOption}) {
	const navermaps = window.naver.maps;
	// gps 위치
	const [GPSpos, setGPSpos] = useState(
		{}
	);

	const [center, setCenter] = useState(
		new navermaps.LatLng(37.554722, 126.970833)
	);

	const [zoom, setZoom] = useState(10);
	
	// gps 정보 수신
	const getLocation = () => {
		if(navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				function(position) {
					console.log(position.coords);
					// position.coords.latitude , longitude
					if(position.coords.latitude !== GPSpos._lat ||
						position.coords.longitude !== GPSpos._lng)
						setGPSpos(
							new navermaps.LatLng(
								position.coords.latitude,
								position.coords.longitude
							)
						);
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

	const handleCenterChanged = (pos) => {
		setCenter(pos);
	}

	const onClickButton = () => {
		getLocation();

	}

	// 위치 초기화
	const onClickButton2 = () => {
		setCenter(
			new navermaps.LatLng(37.554722, 126.970833)
		);
	}

	const [regionPin, setRegionPin] = useState(waterSpringList);
	useEffect(() => {
		setRegionPin(waterSpringList.filter(item => item.lnmadr.includes(regionOption)));
	}, [regionOption]);

	return (
		<>
			<button onClick={onClickButton}>현재위치</button>
			<button onClick={onClickButton2}>원위치</button>
			<NaverMap
				mapDivId={'maps-getting-started-uncontrolled'}
				style={{
					width:'100%', // 네이버지도 가로 길이
					height:'85vh' // 네이버지도 세로 길이
				}}
				center={center}
				onCenterChanged={handleCenterChanged}
				zoom={zoom}
    			minZoom={6}
    			mapTypeControl={true}
    			zoomControl={true}
    			zoomControlOptions={{
        			position:navermaps.Position.RIGHT_CENTER
    			}}
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
							navermaps={navermaps}
						/>
					)
				})}
			</NaverMap>
		</>
	);
}



export default NaverMapAPI;