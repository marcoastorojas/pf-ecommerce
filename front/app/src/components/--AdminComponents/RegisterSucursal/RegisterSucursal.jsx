import style from './RegisterSucursal.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import {postSucursal} from '../../../redux/actions.js'
import 'leaflet/dist/leaflet.css';
import "leaflet-geosearch/dist/geosearch.css";
import L, { marker } from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import markerIconPng from "leaflet/dist/images/marker-icon.png"
import {Icon} from 'leaflet'

import IconoMapita from '../../../media/svg/map.svg';
import { GeoSearchControl, OpenStreetMapProvider } from "leaflet-geosearch";
import { setSucursal } from '../../../redux/actions';

// let DefaultIcon = L.icon({
//     iconUrl: map,
//     shadowUrl: iconShadow
// });
// L.Marker.prototype.options.icon = DefaultIcon;
var sucursal = {
    name: '',
    // coord: [0,0],
    lat: '',
    lng: '',
}

function Buscador () {
    const dispatch = useDispatch();
    // const [sucursal, setSucursal] = useState({
    //     address: '',
    //     coord: [0,0],
    // })
    
    const map = useMap()
    
    useEffect(() => {
        const provider = new OpenStreetMapProvider()
        const searchControl = new GeoSearchControl({
            provider,
        })
        map.addControl(searchControl)
        const markerIcon = new window.L.Icon({
            iconUrl: IconoMapita,
            iconSize: [35, 45],
            iconAnchor: [17, 46], //[left/right, top/bottom]
            popupAnchor: [0, -46]
        });
        var markita = L.marker([0,0], {
            icon: markerIcon,
            customId: 77
        })
        markita.addTo(map)
        console.log('MARKER', markita)
        return () => map.removeControl(searchControl)
    }, [])
    
    function searchEventHandler(result) {
            console.log(result.location); //Coordenadas al reves
            // dispatch(getMarker([result.location.y, result.location.x]))
            let sucursal = {
                name: result.location.label
            }
            map.eachLayer(item => {
                if (item instanceof L.Marker) {
                    if(item.options.customId !== 77) map.removeControl(item)
                     item.options.draggable = true;
                    item.options.autoPan = true;
                    item.setLatLng([result.location.y, result.location.x])
                    sucursal = {
                        ...sucursal,
                        // coord: [result.location.y, result.location.x],
                        lat: result.location.y,
                        lng: result.location.x, 
                    }
                //   console.log('ITEM', item)
                }
            })
            dispatch(setSucursal(sucursal))
      }

    //   function clickHandler(result) {
        //   console.log(result.latlng)
        //   console.log(result)
        //   map.eachLayer(item => {
        //     if (item instanceof L.Marker) {
        //         if(item.options.customId !== 77) map.removeControl(item)
        //         item.options.draggable = true;
        //         item.options.autoPan = true;
        //         item.setLatLng([result.latlng.lat, result.latlng.lng])
        //         // console.log('ITEM', item)
        //     }
        // })
    //   }

          map.on('geosearch/showlocation', searchEventHandler);
        //   map.on('click', clickHandler)

    return null
}
export default function RegisterSucursal () {
    const [ position, setPosition ] = useState([ -34.6075682, -58.4370894])
    // const markerPosition = useSelector(state => state.marker)
    // const markerIcon = new window.L.Icon({
    //     iconUrl: IconoMapita,
    //     iconSize: [35, 45],
    //     iconAnchor: [17, 46], //[left/right, top/bottom]
    //     popupAnchor: [0, -46]
    // });
    const suc = useSelector(state => state.nuevaSucursal)
    const dispatch = useDispatch()
    
    const sendSucursal = () => {
        dispatch(postSucursal(suc))
    }
    return (
        <div className={style.contReg}>
            {/* <button onClick={() => console.log(suc)}>PRUIEBA</button> */}
            {/* <label>LAT: {suc.lat}</label> */}
            {/* <label>LNG: {suc.lng}</label> */}
            <div className={style.infoSuc}>
                {/* <div> */}
                    <h2>New Sucursal: {suc.name}</h2>
                    {/* <label>{suc.name}</label> */}
                {/* </div> */}
                {/* <div> */}
                    <button className={suc.name===''?style.buttonDisabled:style.button} onClick={sendSucursal}>Save</button>
                {/* </div> */}
            </div>
            <div className={style.mapDiv}>
                <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={style.leaflet_container}>
                    <TileLayer  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                        
                            {/* <Marker id='asd' position={markerPosition} icon={markerIcon}>
                                <Popup>
                                A pretty CSS3 popup. <br /> Easily customizable.
                                </Popup>
                            </Marker> */}
                    
                    <Buscador/>
                </MapContainer>
            </div>
        </div>
    )
}