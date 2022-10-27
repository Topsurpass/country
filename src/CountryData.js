import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Search } from './Search';

export const CountryData = () => {
  const [data,setData]=useState([]);  
  const [loading, setLoading]=useState(false);
  const [country, setCountry] = useState('');
  const [region, setRegion]=useState('');

  useEffect(()=>{
    setLoading(true);
      const arr =[];
        axios.get('https://restcountries.com/v3.1/all')
          .then(res=>{     
            for(let i=0;i<res.data.length;i++){
              arr.push(res.data[i]);
            }
            setData(()=>arr);
            setLoading(false);
          })
          .catch(err=>{
            setLoading(false);
            document.getElementsByClassName('error')[0].innerHTML = err.message;
          })
  },[region,country])

  useEffect(()=>{
    setLoading(true);
    const arr =[];
    axios.get(`https://restcountries.com/v3.1/region/${region}`)
    .then(res=>{
      for(let i=0;i<res.data.length;i++){
        arr.push(res.data[i]);
      }
      setData(()=>arr);
      setLoading(false);
    })
  },[region]);

  useEffect(()=>{
    setLoading(true);
    const arr =[];
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then(res=>{
      for(let i=0;i<res.data.length;i++){
        arr.push(res.data[i]);
      }
      setData(()=>arr);    
      setLoading(false);
    })
  },[country]);

  const handleChange=(e)=>{
    setCountry((data)=>{
      return data=e.target.value;
    })
  }

  const handleSelect=()=>{
    const continent = document.getElementById('filter').value
    setRegion(continent)
  }
  return (
    <div id='bodyDiv'>
          <Search search={country} changeHandler={handleChange} id='searchCountry' select={handleSelect}/>
      {
      loading?<div className='loader'>
        <PropagateLoader color={'#36d7b7'} size={10}/><br/>
      </div>:
       
        data.map(i=>{
          return <div  className='countryData' id={i.name.common} key={i.name.common}>
             <div>
              <img src={i.flags.png} width={'100%'} height={'100%'} alt={i.flags}/>
             </div>

            <div className='info'>
              <div><h3>{i.name.common}</h3></div>
              <div><p>Population: {i.population}</p></div>
              <div><p>Region: {i.region}</p></div>
              <div><p>Capital: {i.capital}</p></div>
            </div>
              
            </div>
          })
       }
      <p className='error'></p>
    </div>
    
  )
};