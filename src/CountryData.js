import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import PropagateLoader from "react-spinners/PropagateLoader";
import { Search } from './Search';

export const CountryData = () => {
  const [data,setData]=useState([]);  
  const [loading, setLoading]=useState(false);
  const [dataSearch, setDataSearch] = useState('');

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
  },[])
  // [dataSearch==='']
  // useEffect(()=>{
  //   setLoading(true);
  //   const arr1 =[];
  //   const typing = document.getElementById('searchCountry').value;
  //   axios.get(`https://restcountries.com/v3.1/region/${typing}`)
  //   .then(res=>{
  //     for(let i=0;i<res.data.length;i++){
  //       arr1.push(res.data[i]);
  //     }
  //     setData(()=>arr1);
  //     setLoading(false);
  //   })
  // },[dataSearch !==''])

  const handleChange=(e)=>{
    setDataSearch((data)=>{
      return data=e.target.value;
    })
  }
  console.log(data)
  return (
    <div id='bodyDiv'>
          <Search search={dataSearch} changeHandler={handleChange} id='searchCountry'/>
      {
      loading?<div className='loader'>
        <PropagateLoader color={'#36d7b7'} size={10}/><br/>
      </div>:
       
        data.map(i=>{
          return <div  className='countryData' id={i.name.common} key={i.name.common}>
              {/* <div className='infoDiv'> */}
                <img src={i.flags.png} width={'100%'} height={'50%'} alt={i.flags}/>
                <div><h3>{i.name.common}</h3></div>
                <div><p>Population: {i.population}</p></div>
                <div><p>Region: {i.region}</p></div>
                <div><p>Capital: {i.capital}</p></div>
              </div>
          // </div>
        })
       }
      <p className='error'></p>
    </div>
    
  )
};