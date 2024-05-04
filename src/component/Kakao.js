import React, { useEffect } from "react";
import { markerdata } from "./Data/markerData";

const {kakao} = window;

function Kakao(){
    useEffect(()=>{
        mapscript();
    },[]);

    const mapscript = () => {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
	        center: new kakao.maps.LatLng(37.336382765356035, 127.26531823399158), //지도의 중심좌표.
	        level: 3 //지도의 레벨(확대, 축소 정도)
        };

        const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        markerdata.forEach((el) => {
            // 마커를 생성합니다
            const marker = new kakao.maps.Marker({
                //마커가 표시 될 지도
                map: map,
                //마커가 표시 될 위치
                position: new kakao.maps.LatLng(el.lat, el.lng),
            });
            //마커에 표시할 인포윈도우 생성
            var infowindow = new kakao.maps.InfoWindow({
                    content: el.title, // 인포윈도우에 표시할 내용
            });

            //add mouseover,mouseout event
            //이벤트 리스너로는 클로저를 만들어 등록
            //클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됨
            new kakao.maps.event.addListener(
                marker,
                "mouseover",
                makeOverListener(map, marker, infowindow)
            );
            new kakao.maps.event.addListener(
                marker,
                "mouseout",
                makeOutListener(infowindow)
            );
        });

        //인포윈도우를 표시하는 클로저를 만드는 함수
        function makeOverListener(map,marker,infowindow){
            return function(){
                infowindow.open(map,marker);
            };
        }

        //인포윈도우를 닫는 클로저를 만드는 함수
        function makeOutListener(infowindow){
            return function () {
                infowindow.close();
            };
        }
    }

    return (
        <div id="map" style={{
            width: "1440px", height: "1024px"
        }}></div>
    )
}
export default Kakao;