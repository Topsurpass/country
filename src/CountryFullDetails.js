import React from 'react'
import './App.scss';
import { Link } from 'react-router-dom';
export const CountryFullDetails = (props) => {
  return (
    <div className='moreInfo'>
        
        <div>
            <Link to='/'>
            <input type='button' value='Back'/>
            </Link>
        </div>
        <br/>

        <div>
            <div>
                <img src={props.img} width={'100%'} height={'100%'} alt={props.flag}/>
            </div>
            <div className='info'>
                <div><h3>{props.country}</h3></div>
                <div><p>Population: {props.population}</p></div>
                <div><p>Region: {props.region}</p></div>
                <div><p>Capital: {props.capital}</p></div>
                <div><p>Sub Region: {props.subregion}</p></div>
            </div>

            <div>
                <div><p>Continent: {props.continent}</p></div>
                <div><p>Time zone: {props.timezone}</p></div>
                {/* <div><p>Languages: {props.language}</p></div> */}
            </div>
            
        </div>
    </div>
  )
}
