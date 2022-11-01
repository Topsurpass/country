import './App.scss';
import { CountryData } from './CountryData';
import {CountryFullDetails} from './CountryFullDetails'
import axios from 'axios';
import PropagateLoader from "react-spinners/PropagateLoader";
import { useEffect, useState } from 'react';
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {Search} from './Search';

function App(props) {

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
            <div className='logo'><h3>Where in the world</h3></div>
            <div className='darkMode'><h5>Dark Mode</h5></div>
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
                 <PropagateLoader color={'#36d7b7'} size={10}/><br/>
              </div>
             :
              data.map((i,index)=>{
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

// import './App.scss';
// import { CountryData } from './CountryData';
// import axios from 'axios';
// import PropagateLoader from "react-spinners/PropagateLoader";
// import { useEffect, useState } from 'react';
// import { CountryFullDetails } from './CountryFullDetails';
// import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import {Search} from './Search';
// function App() {
//   const [data,setData]=useState([]);  
//   const [loading, setLoading]=useState(false);
//   const [country, setCountry] = useState('');
//   const [region, setRegion]=useState('');
//   const [track, setTrack]=useState({
//     name:{'common':''},
//     population:'',
//     region:'',
//     capital:'',
//     flags:{png:''},
//     subregion:'',
//     timezones:[],
//     continents:[],
//   })

//   //load all countries on first mount
//   useEffect(()=>{
//     setLoading(true);
//       const arr =[];   
//         axios.get('https://restcountries.com/v3.1/all')
//           .then(res=>{     
//             for(let i=0;i<res.data.length;i++){
//               arr.push(res.data[i]);
//             }
//             setData(()=>arr);
//             setLoading(false);
//           })
//           .catch(err=>{
//             setLoading(false);
//             // document.getElementsByClassName('error')[0].innerHTML = err.message;
//           })
//   },[region, country]);

//   //search by region
//   useEffect(()=>{
//     setLoading(true);
//     const arr =[];
//     axios.get(`https://restcountries.com/v3.1/region/${region}`)
//     .then(res=>{
//       for(let i=0;i<res.data.length;i++){
//         arr.push(res.data[i]);
//       }
//       setData(()=>arr);
//       setLoading(false);
//     })
//   },[region]);

//   //search all countries
//   useEffect(()=>{
//     setLoading(true);
//     const arr =[];
//     axios.get(`https://restcountries.com/v3.1/name/${country}`)
//     .then(res=>{
//       for(let i=0;i<res.data.length;i++){
//         arr.push(res.data[i]);
//       }
//       setData(()=>arr);    
//       setLoading(false);
//     })
//   },[country]);

//   // useEffect(()=>{
//   //   setLoading(true);
//   //   axios.get(`https://restcountries.com/v3.1/name/all`)
//   //   .then(res=>{
//   //     for(let i=0;i<res.data.length;i++){
//   //       // const a = document.getElementsByClassName('countryData')
//   //       console.log(res.data[i])
//   //     }
//   //   })
//   // },[])
//   //control the search input
//   const handleChange=(e)=>{
//     setCountry((data)=>{
//       return data=e.target.value;
//     })
//   }

//   //set the continent value on select
//   const handleSelect=()=>{
//     const continent = document.getElementById('filter').value;
//     setRegion(continent);
//   }

  
//  const nextPage=(e)=>{
//   setTrack((obj)=> obj=e)
//   console.log(e)
//  }
 
//   return (
//     <Router>
//       <div className="App">
//           <header>
//             <div className='logo'><h3>Where in the world</h3></div>
//             <div className='darkMode'><h5>Dark Mode</h5></div>
//           </header>
//           <br/>
//       </div>

//       <Routes>
        
//         <Route path='/' element={              
//           <>
//             <Search search={country} changeSearch={handleChange} select={handleSelect}/>  

//             {
//               loading?
        
//               <div className='loader'>
//                  <PropagateLoader color={'#36d7b7'} size={10}/><br/>
//               </div>
//              :
//               data.map(i=>{
//                 return(
//                   <CountryData key={i.name.common}
//                   divId={i.name.common} 
//                   img={i.flags.png}
//                   alt={i.name.common}
//                   country={i.name.common}
//                   population={i.population}
//                   region={i.region}
//                   capital={i.capital}
//                   handleClick={()=>nextPage(i)}/> 
//                 )
//               })
//             }

//           </>              
//         }/>
//         <Route path='/country_details' element={
//           <CountryFullDetails
//           img={track.flags.png}
//           country={track.name.common}
//           population={track.population}
//           region={track.region}
//           capital={track.capital}
//           subregion={track.subregion}
//           continent={track.continents[0]}
//           timezone={track.timezones[0]}
//           />
//         }/>       
//       </Routes>
//     </Router>
//   );
// }

// export default App;


 
 