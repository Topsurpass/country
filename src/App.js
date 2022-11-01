import './App.scss';
import { CountryData } from './CountryData';
import {CountryFullDetails} from './CountryFullDetails'
import axios from 'axios';
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Search} from './Search';

function App() {

  const [data,setData]=useState([]);   
  const [loading, setLoading]=useState(false);
  const [country, setCountry] = useState('');
  const [region, setRegion]=useState('');
    
  //load all countries on first mount
  useEffect(()=>{
    let isCleaning = false;
    setLoading(true);
      const arr =[];   
        axios.get('https://restcountries.com/v3.1/all')
          .then(res=>{     
            if(!isCleaning){
              for(let i=0;i<res.data.length;i++){
                arr.push(res.data[i]);
                setData(()=>arr);
                setLoading(false);
              }
            }           
          })
          return ()=>{
            isCleaning = true; 
          }
  },[region,country]);

  //search by region
  useEffect(()=>{
    let isCleaning = false;
    setLoading(true);
    const arr =[];
    axios.get(`https://restcountries.com/v3.1/region/${region}`)
    .then(res=>{
      if(!isCleaning){
        for(let i=0;i<res.data.length;i++){
          arr.push(res.data[i]);
        }
        setData(()=>arr);
        setLoading(false);
      }
    })
    return()=>{
      isCleaning=true;
    }
  },[region]);

 // search all countries
  useEffect(()=>{
    let isCleaning=false;
    setLoading(true);
    const arr =[];
    axios.get(`https://restcountries.com/v3.1/name/${country}`)
    .then(res=>{
      if(!isCleaning){
        for(let i=0;i<res.data.length;i++){
          arr.push(res.data[i]);
        }
        setData(()=>arr);    
        setLoading(false);
      }  
    })
    return ()=>{
      isCleaning=true;
    }
  },[country]);


 //control the search input
 const handleChange=(e)=>{
  setCountry((data)=>{
    return data=e.target.value;
  })
}

  //set the continent value on select
  const handleSelect=()=>{
    const continent = document.getElementById('filter').value;
    setRegion(continent);
  }

  const handleClickPage=(e)=>{
    if(localStorage.getItem('dataIndex')===null){
      localStorage.setItem('dataIndex',`[]`);
    }
    const indexVal = JSON.parse(localStorage.getItem('dataIndex'));
    indexVal[0]=e
    localStorage.setItem('dataIndex',JSON.stringify(indexVal))
 }
  return (
    <Router>
      <div className="App">
          <header>
            <div className='logo'><h3>Where in the world ?</h3></div>
            {/* <div className='darkMode'><h5>Dark Mode</h5></div> */}
          </header>
          <br/>
      </div>

      <Routes>
        
        <Route path='/' element={              
          <>
            <Search search={country} changeSearch={handleChange} select={handleSelect}/>  

            {
              loading?
        
              <div className='loader'>
                 <ClipLoader color={'#36d7b7'} size={100}/><br/>
              </div>
             :
              data.map((i)=>{
                return(
                  <CountryData key={i.name.common}
                  divId={i.name.common} 
                  img={i.flags.png}
                  alt={i.name.common}
                  country={i.name.common}
                  population={i.population}
                  region={i.region}
                  capital={i.capital}
                  handleClick={()=>handleClickPage(i)}
                  /> 
                )
              })
            }

          </>              
        }/>
          <Route path='/country_details' element={
            <CountryFullDetails/>
          }/>
             
      </Routes>
    </Router>
  );
}

export default App;



 
 