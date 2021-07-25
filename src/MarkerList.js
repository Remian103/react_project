import React, { useState, useEffect } from 'react';
import { Marker } from 'react-naver-maps';
import Modal from './Modal';

function MarkerList({navermaps, waterSpringList, center}) {
/*
	// api 써서 불러오는 코드
	useEffect(() => {
		window
			.fetch(`http://api.data.go.kr/openapi/tn_pubr_public_appn_mnrlsp_info_api?serviceKey=CtR%2FUM6cMUC%2F0tN%2BAIEE9qng30I6%2BpqASCWBpWhHRF5EdYpe8%2F32a6tZ3gFbw8ynUqUjE%2Bk1Vuv0bFIlT2AvkQ%3D%3D&pageNo=0&numOfRows=100&type=json`)
			.then((res) => res.json())
			.then((data) => {
				console.log(data.response.body.items);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);
*/

    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

	return (
		<>
			{waterSpringList.map((item, index) => {
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
					<>
					<Marker
						key={index+1}
						position={
							new navermaps.LatLng(
								item.latitude,
								item.longitude
							)
						}
						animation={0}
						onClick={() => {
							console.log(this);
							console.log(item);
							alert(item.lnmadr + item.mnrlspNm);
						}}
					/>
					<Modal open={ modalOpen } close={ closeModal } header="Modal heading">
                		{item.lnmadr}
                		{item.mnrlspNm}
            		</Modal>
					</>
				)
			})}
		</>
	);

}


export default MarkerList; 