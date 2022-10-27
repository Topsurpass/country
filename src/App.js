import './App.scss';
// import { Search } from './Search';
import { CountryData } from './CountryData';

function App() {

  return (
    <div className="App">
      <header>
        <div><h3>Where in the world</h3></div>
        <div><h5>Dark Mode</h5></div>
      </header>
      {/* <Search search={dataSearch} changeHandler={handleChange} id='searchCountry'/> */}
      <br/>
      <CountryData/>
    </div>
  );
}

export default App;

 