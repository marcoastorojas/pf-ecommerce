import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, putUserImage, upgradeToSeller } from '../../redux/actions';
import { BUYER_ROLE, SELLER_ROLE } from '../../validations/usersTypes';
import style from './BeASeller.module.css';





export default function () {
    const actualDate = new Date().toLocaleDateString('en-ca')
    const actualYear = +actualDate.split('-')[0]
    const actualMonth = +actualDate.split('-')[1]
    const actualDay = +actualDate.split('-')[2]
    
    const [ info, setInfo ] = useState({
        lastname: '',
        dni: '',
        // dateB:'',
        gender: '',
        street: '',
        // number: '',
        zipcode: '',
        country: '',
        // state: '',
        city: ''
    })
    const [ date, setDate ] = useState([99, 99, 2099])
    const [ datePass, setDatePass ] = useState(false)
    const [ genderPass, setGenderPass ] = useState(false)
    const [ streetPass, setStreetPass ] = useState(false)
    const [ numberPass, setNumberPass ] = useState(false)
    const [ postalPass, setPostalPass ] = useState(false)
    const [ countryPass, setCountryPass ] = useState(false)
    const [ statePass, setStatePass ] = useState(false)
    const [ cityPass, setCityPass ] = useState(false)
    const [ lastnamePass, setLastnamePass ] = useState(false)
    const [ dniPass, setDNIPass ] = useState(false)
    const [ phonePass, setPhonePass ] = useState(false)

    //SET INFO IF THE USER IS A SELLER            START
    const user = useSelector(state => state.user)
    const userInfoExtra = useSelector(state => state.userInfo)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getUserInfo(user.uid))
    }, [dispatch])




    //SET INFO IF THE USER IS A SELLER              END
    //CHANGE THE FUNCTION OF THE BUTTON 
    // useEffect(() => {
    //     document.querySelector('#buttonBeASeller').value = user.roleId === SELLER_ROLE? 'Save' : 'Send'
    // }, [Object.keys(user).length])
    const handleYear = (e) => {
        const days = ['01', '03', '05' , '07', '08', '10', '12']
        const maxDay = days.includes(date[1])?31:30
        if(e.target.name === 'day') {
            if(e.target.value > maxDay) e.target.value = maxDay
            if(e.target.value < 1) e.target.value = 1
            setDate([e.target.value, date[1], date[2]])
        }
        if(e.target.name === 'month') {
            if(e.target.value > 12) e.target.value = 12
            if(e.target.value < 1) e.target.value = 1
            setDate([date[0], e.target.value, date[2]])
        }
        if(e.target.name === 'year') {
            setDate([date[0], date[1], e.target.value])
            // if(e.target.value < 1800) e.target.value = 1800
        }
        // setInfo({
        //     ...info,
        //     dateB: date.join('-')
        // })
    }
    useEffect(() => {
        if((+actualYear - +date[2]) > 18 && +date[0] !== 99 && +date[1] !== 99) setDatePass(true)
        else {
            if((+actualYear - +date[2]) === 18) {
                if(+actualMonth > +date[1] && +date[0] !== 99) setDatePass(true)
                else {
                    if(+actualMonth === +date[1]) {
                        if(+actualDay > +date[0]) setDatePass(true)
                        else setDatePass(false)
                    }
                    else setDatePass(false)
                }
            }
            else setDatePass(false)
        }
    }, [date[0], date[1], date[2]])
    
    useEffect(() => {
        if(date[0] !== 99 && date[1] !== 99 && date[2] !== 99) erorrDate()
    }, [datePass, date[0], date[1], date[2]])

    function erorrDate ()  {
        if (datePass) {
            document.querySelector('#dateYear').className = style.inputFecha
            document.querySelector('#dateMonth').className = style.inputFecha
            document.querySelector('#dateDay').className = style.inputFecha
            document.querySelector('#labelErrores').innerText = ''
        }
        else {
            document.querySelector('#dateYear').className = style.inputFechaInc
            document.querySelector('#dateMonth').className = style.inputFechaInc
            document.querySelector('#dateDay').className = style.inputFechaInc
            document.querySelector('#labelErrores').innerText = 'You must be +18 years old'
        }
    }


    const handleGender = (e) => {
        setInfo({
            ...info,
            gender: e.target.value
        })
        setGenderPass(true)
    }
    // const handleStreet = (e) => {
    //     setInfo({
    //         ...info,
    //         street: e.target.value
    //     })
    // }
    const handleNumber = (e) => {
        if(e.target.value > 99999) e.target.value = 99999
        if(e.target.value < 1) e.target.value = 1
        // setInfo({
        //     ...info,
        //     number: e.target.value
        // })
        setNumberPass(e.target.value!==''?true:false)
    }
    //LALALALAALALLALAAA
    const handlePostal = (e) => {
        if(e.target.value > 99999) e.target.value = 99999
        if(e.target.value < 1) e.target.value = 1
        setInfo({
            ...info,
            zipcode: e.target.value
        })
        setPostalPass(e.target.value!==''?true:false)
    }
    const handleCountry = (e) => {
        const regNoNumbers = /^([^0-9]*)$/
        if(regNoNumbers.test(e.target.value) && e.target.value !== '') {
            if(e.target.name !== 'state') {
                setInfo({
                    ...info,
                    [e.target.name]: e.target.value
                })
            }
            e.target.className = style.inputDatos
            setStreetPass(e.target.name==='street'?true:streetPass)
            setCountryPass(e.target.name==='country'?true:countryPass)
            setStatePass(e.target.name==='state'?true:statePass)
            setCityPass(e.target.name==='city'?true:cityPass)
            setLastnamePass(e.target.name==='lastname'?true:cityPass)
            document.querySelector('#labelErrores').innerText = ''
        }
        else {
            // console.log('pepe')
            setStreetPass(e.target.name==='street'?false:streetPass)
            setCountryPass(e.target.name==='country'?false:countryPass)
            setStatePass(e.target.name==='state'?false:statePass)
            setCityPass(e.target.name==='city'?false:cityPass)
            setLastnamePass(e.target.name==='lastname'?false:cityPass)
            e.target.className = style.inputDatosFail
            document.querySelector('#labelErrores').innerText = 'Please enter a valid name'
        } 
        // console.log(regNoNumbers.test(e.target.value)?'verdadero':'falso')
    }
    const handleDNI = (e) => {
        if(e.target.value > 99999999 || e.target.value < 11111111) {
            e.target.className = style.inputDatosFail
            document.querySelector('#labelErrores').innerText = 'Please enter a valid DNI'
            setDNIPass(false)
        }
        else {
            e.target.className = style.inputDatos
            document.querySelector('#labelErrores').innerText = ''
            setDNIPass(true)
            setInfo({
                ...info,
                dni: e.target.value
            })
        } 
    }
    const handlePhone = (e) => {
        if(e.target.value > 9999999999 || e.target.value < 1111111111) {
            e.target.className = style.inputDatosFail
            document.querySelector('#labelErrores').innerText = 'Please enter a valid phone'
            setPhonePass(false)
        }
        else {
            e.target.className = style.inputDatosFail
            e.target.className = style.inputDatos
            document.querySelector('#labelErrores').innerText = ''
            setPhonePass(true)
            setInfo({
                ...info,
                phone: e.target.value
            })    
        }
    }
    // useEffect(() => {
    //     // console.log(Object.values(info))
    //     Object.values(info).forEach(e => {
    //         if (e=== '') document.querySelector('#buttonBeASeller').disabled = true
    //         else document.querySelector('#buttonBeASeller').disabled = false
    //     })
    // }, [Object.values(info).join])


    useEffect(() => {
        if (datePass && genderPass && streetPass && numberPass && postalPass && countryPass && statePass && cityPass) {
            document.querySelector('#buttonBeASeller').className = style.buttonBeASeller
            document.querySelector('#buttonBeASeller').disabled = false
        }
        else {
            document.querySelector('#buttonBeASeller').className = style.buttonBeASellerFail
            document.querySelector('#buttonBeASeller').disabled = false
        }

    }, [datePass, genderPass, streetPass, numberPass, postalPass, countryPass, statePass, cityPass, lastnamePass, dniPass, phonePass])



    const PRUEBA = () => {
        console.log(info)
        console.log(datePass, genderPass, streetPass, numberPass, postalPass, countryPass, statePass, cityPass)
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        if (datePass && genderPass && streetPass && numberPass && postalPass && countryPass && statePass && cityPass && lastnamePass && dniPass, phonePass) {
            //dispatch
            if(user.roleId === BUYER_ROLE) {
                dispatch(upgradeToSeller(user.uid, 'SELLER_ROLE'))
            }
            dispatch(putUserImage(user.uid, info))
        }
        else {
            console.log('pepe')
        }
    }
    const PRUEBAUPROl = () => {
        dispatch(upgradeToSeller(user.uid, 'SELLER_ROLE'))
    }

    return (
        <div className={style.contBeASeller}>
            {/* <button onClick={PRUEBAUPROl} >PRUEBACHANGEROL</button> */}
            {/* <button onClick={PRUEBA}>PRUEBA</button> */}
            {/* <button onClick={() => console.log(userInfoExtra)}>PRUEBADATOS</button> */}
            {/* <h1>Soy el form de alta de vendedor</h1> */}
            <form onSubmit={handleSubmit} className={style.sellerForm}>
                <div>
                    <label htmlFor="street">Lastname: </label>
                    <input className={style.inputDatos} type="text" id="lastname" name='lastname' onChange={handleCountry} />
                    <br />
                </div>
                <div>
                    <label htmlFor="street">DNI: </label>
                    <input className={style.inputDatos} type="number" id="dni" name='dni' onChange={handleDNI} />
                    <br />
                </div>
                <div>
                    <label htmlFor="phone">Phone: </label>
                    <input className={style.inputDatos} type="number" id="phone" name='phone' onChange={handlePhone} />
                    <br />
                </div>
                <div>
                    <label htmlFor='date'>Date of Birth: </label>
                    <div className={style.date}>
                        <input className={style.inputFecha} type="number" id='dateDay' name='day' onChange={handleYear} placeholder='Day' />
                        <span> /    </span>
                        <input className={style.inputFecha} type="number" id='dateMonth' name='month' onChange={handleYear} placeholder='Month' />
                        <span> / </span>
                        <input className={style.inputFecha} type="number" id='dateYear' name='year' onChange={handleYear} placeholder='Year' />
                        {/* <input value={'OLA'}></input> */}
                    </div>
                    {/* <input id='date' type="date" name='date' onChange={handleDate}/> */}
                    <br></br>
                </div>
                <div>
                    <label htmlFor='gender'>Gender: </label>
                    <select name="gender" id="gender"  onChange={handleGender} >
                        <option hidden>Select an option</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                    <br></br>
                </div>
                <div>
                    <label htmlFor="street">Street Address: </label>
                    <input className={style.inputDatos} type="text" id="street" name='street' onChange={handleCountry} />
                    <br />
                </div>
                <div>
                    <label htmlFor="streetNumber">Block/Number: </label>
                    <input className={style.inputDatos} type="number" id="streetNumber"  name='streetNumber' onChange={handleNumber} />
                    <br />
                </div>
                <div>
                    <label htmlFor="zipcode">Zip Code:</label>
                    <input className={style.inputDatos} type="number" id='zipcode' name='zipcode' onChange={handlePostal} />
                    <br />
                </div>
                <div>
                    <label htmlFor="country">Country: </label>              
                    <input className={style.inputDatos} type="text" id='country' name='country' onChange={handleCountry} />
                    <br />
                </div>
                <div>
                    <label htmlFor="state">State/Province: </label>
                    <input className={style.inputDatos} type="text" id='state' name='state' onChange={handleCountry} />  
                    <br />
                </div>
                <div>
                    <label htmlFor="city">City: </label>
                    <input className={style.inputDatos} type="text" id='city' name='city' onChange={handleCountry} />  
                    <br />
                </div>
                <label id='labelErrores' style={{color: 'rgb(255, 0, 0)'}}></label>
                <input id='buttonBeASeller' className={style.buttonBeASellerFail} type='submit' value={user.roleId===BUYER_ROLE?'Send':'Save'} disabled/>
            </form>
        </div>
    )
}