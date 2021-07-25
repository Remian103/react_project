import React, { useState, useEffect } from 'react';
import { Marker } from 'react-naver-maps';
import Modal from './Modal';


function CustomMarker({ item, id, navermaps, children }) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

    function kk(item) {
    	const style = {
    		color: item.isDrinkable === "True" ? "green" : "red",
    	}
		return
			<div style={style}>
				{item.mnrlspNm}
			</div>
    }

	return (
		<>
			<Marker
				key={id}
				position={
					new navermaps.LatLng(
						item.latitude,
						item.longitude
					)
				}
				animation={0}
				onClick={openModal}
			/>
			<Modal
				open={ modalOpen }
				close={ closeModal }
				header={
					<div style={{color: item.isDrinkable === "True" ? "green" : "red",}}>
						{item.mnrlspNm}
					</div>
				}
			>
	    		{item.lnmadr}<br/>
	    		{item.isDrinkable}<br/>
	    		기관명 : {item.institutionNm}
			</Modal>
		</>
	)
}


export default CustomMarker;