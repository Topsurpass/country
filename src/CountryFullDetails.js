import React from 'react'
import './App.scss';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

export const CountryFullDetails = (props) => {
    const [newData, setNewData] = useState({
        name:{'common':''},
            population:'',
            region:'',
            capital:'',
            flags:{png:''},
            subregion:'',
        //     timezones:[],
            continents:[],
            currencies:{obj:{name:''}},
            languages:{obj:{eng:''}},
    });
    const [storage, setStorage] = useState([]);

    useEffect(()=>{
        let isCleaning = false; 
        const save =  JSON.parse(localStorage.getItem('dataIndex'));                
            if(!isCleaning){
                setNewData(()=>save[0]);
                setStorage(()=>save[0])
            } 
            return ()=>{
            isCleaning = true; 
            }
      },[storage]);

  return (
    <div className='moreInfo'>
        <Link to='/'>
            <div>
                <input type='button' value='Back'/>
            </div>
        </Link>

        <div>
            <div>
                <img src={newData.flags.png} width={'100%'} height={'100%'} alt={props.flag}/>
            </div>
            <div className='info'>
                <div><h3>Country: {newData.name.common}</h3></div>
                <div><p>Population: {newData.population}</p></div>
                <div><p>Region: {newData.region}</p></div>
                <div><p>Capital: {newData.capital}</p></div>
                <div><p>Sub Region: {newData.subregion}</p></div>
            </div>

            <div>
                <div><p>continent: {newData.continents[0]}</p></div>
                <div><p>Currencies:{` ${Object.keys(newData.currencies)}`}</p></div>
                <div><p>languages: {` ${Object.values(newData.languages)}`}</p></div>
            </div>
            
        </div>
    </div>
  )
}
