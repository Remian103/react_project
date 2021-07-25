import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import './cautionPage.css'


function CautionPage(props) {
    // useState를 사용하여 open상태를 변경한다. (open일때 true로 만들어 열리는 방식)
    const [ modalOpen, setModalOpen ] = useState(true);


    const openModal = () => {
        setModalOpen(true);
    }
    const closeModal = () => {
        setModalOpen(false);
    }

	return (
		<>
			<Modal
				open={ modalOpen }
				close={ closeModal }
				header={
					"<약수터 이용 시 주의사항>"
				}
			>
				<div className="indent_line">
					<p>· 약수터 근처 쓰레기나 동물 배설에 의한 오염이 있는지 확인 후 음용 권장</p>
					<p>· 비가 내린 후에는 수질이 오염될 가능성 상승</p>
					<p>· 음용 부적합 판정 시 음용을 금지하여 식중독 등 피해를 예방</p>
					<p>· 약수물 용기는 깨끗하게 세척 및 소독하여 사용</p>
					<p>· 장기간 약수물 보관 시 오염될 가능성 상승</p>
					<p>· 약수터 살균시설이 있을 시 가동여부 확인 후 음용</p>
				</div>
			</Modal>
		</>
	)
}

export default CautionPage;