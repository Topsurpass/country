import React from 'react'
import { Link } from 'react-router-dom';
export const CountryData = (props) => {
  
  return (
    
      <div  className='countryData' id={props.divId} onClick={props.handleClick}>
        <Link to='/country_details' className='links'>
        <div className='flagPic'>
          <img src={props.img} width={'100%'} height={'100%'} alt={props.alt} />
        </div>
        
        <div className='info'>
          <div><h3>{props.country}</h3></div>
          <div><p>Population: {props.population}</p></div>
          <div><p>Region: {props.region}</p></div>
          <div><p>Capital: {props.capital}</p></div>
        </div>  
        </Link>             
      </div>

  )
};
