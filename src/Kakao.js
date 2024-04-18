import React, { useEffect } from "react";

const {kakao} = window;

function Kakao(){
    useEffect(()=>{
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
	        center: new kakao.maps.LatLng(37.336382765356035, 127.26531823399158), //지도의 중심좌표.
	        level: 3 //지도의 레벨(확대, 축소 정도)
        };

        new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        return () => {}
    },[])
    return (
        <div id="map" style={{
            width: "1440px", height: "1024px"
        }}></div>
    )
}
export default Kakao;