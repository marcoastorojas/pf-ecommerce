
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getSucursal } from "../../redux/actions";

import map from "../../media/svg/map.svg";
import store from "../../media/svg/store.svg";

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import style from './Mapita.module.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const markerIcon = new window.L.Icon({
    iconUrl: map,
    iconSize: [35, 45],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46]
});

const storeIcon = new window.L.Icon({
    iconUrl: store,
    iconSize: [35, 45],
    iconAnchor: [17, 46], //[left/right, top/bottom]
    popupAnchor: [0, -46]
});

export default function Mapita ({X = 51.505,Y = -0.09}) {

   const dispatch = useDispatch();
  const sucursal = useSelector((state) => state.sucursal);
  
  useEffect(() => {
    dispatch(getSucursal())
  }, [])
    
    const position = [X, Y]

    return (
        <div id='map' className={style.contMapita}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={style.leaflet_container}>
                <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={markerIcon}>
                    <Popup>
                        Your position
                    </Popup>
                </Marker>
                {sucursal.length > 0 && sucursal.map((sl) => {
                    return  <Marker position={[sl.lat, sl.lng]} icon={storeIcon} key={sl.id}>
                    <Popup>
                       {sl.name}
                    </Popup>
                </Marker>
                })}
            </MapContainer>
        </div>
    )
}