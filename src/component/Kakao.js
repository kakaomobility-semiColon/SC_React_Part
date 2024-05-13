import React, { useEffect } from "react";
import { markerdata } from "./Data/markerData";
import './Kakao.css'

function Kakao() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_API_KEY}&libraries=services,drawing`;
        script.async = true;
        script.onload = () => {
            mapscript();
        };
        script.onerror = (error) => {
            console.error("Error loading Kakao maps script:", error);
        };
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const mapscript = () => {
        //지도 표시
        if (window.kakao && window.kakao.maps) {
            var container = document.getElementById('map');
            var options = {
                center: new window.kakao.maps.LatLng(37.336382765356035, 127.26531823399158),
                level: 3
            };
            const map = new window.kakao.maps.Map(container, options);

            markerdata.forEach((el) => {
                //마커 생성하기
                const marker = new window.kakao.maps.Marker({
                    //마커가 표시될 지도
                    map: map, //표시할 위치
                    position: new window.kakao.maps.LatLng(el.lat, el.lng),
                });

                //커스텀 오버레이에 표시할 컨텐츠입니다.
                //커스텀 오버레이는 아래와 같이 사용자가 
                //자유롭게 컨텐츠를 구상하고 이벤트를 제어할 수 있기 때문에
                //별도의 이벤트 메소드를 제공하지 않습니다.
                var content = '<div class="wrap">' + 
                            '    <div class="info">' + 
                            '        <div class="title">' + 
                            '            한국외국어대학교 글로벌캠퍼스' + 
                            '            <div class="close" onclick="closeOverlay()" title="닫기"></div>' + 
                            '        </div>' + 
                            '        <div class="body">' + 
                            '            <div class="img">' +
                            '                <img src="https://cfile181.uf.daum.net/image/250649365602043421936D" width="73" height="70">' +
                            '           </div>' + 
                            '            <div class="desc">' + 
                            '                <div class="ellipsis">경기도 용인시 처인구 모현읍 외대로 81</div>' + 
                            '                <div class="jibun ellipsis"> 한국외국어대학교 글로벌 캠퍼스는</div>' + 
                            '                <div class="jibun ellipsis"> 용인에 위치한 대단한 학교다. </div>' + 
                            '            </div>' + 
                            '        </div>' + 
                            '    </div>' +    
                            '</div>';

                // 마커 위에 커스텀오버레이를 표시합니다
                // 마커를 중심으로 커스텀 오버레이를 표시하기위해 CSS를 이용해 위치를 설정했습니다
                var overlay = new window.kakao.maps.CustomOverlay({
                    content: content,
                    map: map,
                    position: marker.getPosition()
                });
                //info 열기
                window.kakao.maps.event.addListener(marker, "click", function(){
                    overlay.setMap(map);
                });
                //info 닫기
                window.kakao.maps.event.addListener(map, "click", function(){
                    overlay.setMap(null);
                });
            });
        }
    };

    return (
        <div id="map" style={{ width: "1194px", height: "834px" }}></div>
    );
}

export default Kakao;
