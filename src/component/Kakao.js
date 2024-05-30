import React, { useEffect } from "react";
import { useKakaomap } from "./useKakaomap";
import './Kakao.css';

function Kakao() {
  const mapscript = useKakaomap();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.REACT_APP_KAKAOMAP_API_KEY}&libraries=services,clusterer,drawing`;
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
  }, [mapscript]);

  return (
    <div id="map" style={{ width: "100%", height: "100vh" }}></div>
  );
}

export default Kakao;
