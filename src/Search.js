import React from 'react'
import './App.scss';

export const Search = (props) => {

  return (
    <div className='searchDiv'>
        <input type='search' value={props.search} onChange={props.changeSearch} id={props.id} placeholder='Search by country'/>
        <select id="filter" onChange={props.select}>
            <option value="" name="Filter By Region">Filter By Region</option>
            <option value="Africa" name="Africa">Africa</option>
            <option value="America" name="America">America</option>
            <option value="Asia" name="Asia">Asia</option>
            <option value="Europe" name="Europe">Europe</option>
            <option value="Oceania" name="Oceania">Oceania</option>
        </select>
    </div>
  )
}
