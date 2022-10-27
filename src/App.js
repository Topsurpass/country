import './App.scss';
// import { Search } from './Search';
import { CountryData } from './CountryData';

function App() {

  return (
    <div className="App">
      <header>
        <div className='logo'><h3>Where in the world</h3></div>
        <div className='darkMode'><h5>Dark Mode</h5></div>
      </header>
      <br/>
      <CountryData/>
    </div>
  );
}

export default App;

 