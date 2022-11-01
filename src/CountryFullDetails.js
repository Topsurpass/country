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
        timezones:[],
        continents:[],
        currencies:{obj:{name:''}},
        languages:{obj:{eng:''}},
        borders:[]
    });

    useEffect(()=>{
        let isCleaning = false; 
        const save =  JSON.parse(localStorage.getItem('dataIndex'));                
            if(!isCleaning){
                setNewData(()=>save[0]);
            } 
            return ()=>{
            isCleaning = true; 
            }
    },[]);

  return (
    <div className='moreInfo'>
        <Link to='/'>
            <div>
                <input type='button' value='Back'/>
            </div>
        </Link>
        <br/>
        <br/>
        <div>
            <div>
                <img src={newData.flags.png} width={'100%'} height={'100%'} alt={props.flag}/>
            </div>
            <div className='infoBack'>
                <div><h2>{newData.name.common}</h2></div>
                <div><p>Capital: {newData.capital}</p></div>
                <div><p>Continent: {newData.continents[0]}</p></div>
                <div><p>Population: {newData.population}</p></div>
                <div><p>Region: {newData.region}</p></div>
                <div><p>Sub Region: {newData.subregion}</p></div>
            </div>
            <br/>

            <div className='infoBack'>
                <div><p>Time-zone: {newData.timezones[0]}</p></div>
                <div><p>Currencies:{` ${Object.keys(newData.currencies)}`}</p></div>
                <div><p>Languages: {` ${Object.values(newData.languages)}`}</p></div>
            </div>
            <br/>
            <div>Border countries:</div>
             <br/>
            <div className='border'>
                
                {
                    //if border is not present in the data 
                    newData.borders === undefined ?
                    <span></span>:
                    <>
                        <div className='first'>{newData.borders[0]}</div>
                        <div>{newData.borders[1]}</div>
                        <div>{newData.borders[2]}</div>
                    </>
                }
            </div>
            <br/>
        </div>
    </div>
  )
}
