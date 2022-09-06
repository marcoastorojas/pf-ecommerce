import style from './RegisterSucursal.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import map from '../../../media/svg/map.svg';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { getMarker } from '../../../redux/actions';

// let DefaultIcon = L.icon({
//     iconUrl: map,
//     shadowUrl: iconShadow
// });
// L.Marker.prototype.options.icon = DefaultIcon;

function Buscador () {
    const dispatch = useDispatch();
    const [prueba, setPrueba] = useState(0)
    
    const map = useMap()
    
    useEffect(() => {
        const provider = new OpenStreetMapProvider()
        const searchControl = new GeoSearchControl({
            provider,
        })
        map.addControl(searchControl)
        return () => map.removeControl(searchControl)

    }, [])
    
    function searchEventHandler(result) {
            console.log(result.location); //Coordenadas al reves
            dispatch(getMarker([result.location.y, result.location.x]))
            // map.eachLayer(item => {
            //     if (item instanceof L.Marker) {
            //         // if(item._leaflet_id !== 36) map.removeControl(item)
            //       item.options.draggable = true;
            //       item.options.autoPan = true;
            //       console.log('ITEM', item)
            //     }
            // })
            // setPrueba(0)
      }

      function clickHandler(resul) {
          console.log(resul.latlng)
      }

          map.on('geosearch/showlocation', searchEventHandler);
          map.on('click', clickHandler)

    return null
}
export default function RegisterSucursal () {
    const [ position, setPosition ] = useState([ -34.6075682, -58.4370894])
    const markerPosition = useSelector(state => state.marker)
    const markerIcon = new window.L.Icon({
        iconUrl: map,
        iconSize: [35, 45],
        iconAnchor: [17, 46], //[left/right, top/bottom]
        popupAnchor: [0, -46]
    });
    

    return (
        <div>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={style.leaflet_container}>
                    <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        
                            <Marker position={markerPosition} icon={markerIcon}>
                                <Popup>
                                    A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker>: <></>
                    
                    <Buscador/>
                </MapContainer>
        </div>
    )
}