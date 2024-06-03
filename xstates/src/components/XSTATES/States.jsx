import React, { useEffect,useState} from 'react'
import axios from 'axios'

function States() {

  const [countries,setCountries ] = useState ([])
  const [selectedcountry,setChosenCountry] = useState('')

console.log("selected country",selectedcountry)


  useEffect(()=>{
  let fetchCountries = async()=>{
 
    let url = 'https://crio-location-selector.onrender.com/countries';
    let response =await axios.get(url);
    let data = await response; 

    setCountries(data.data)
  }

  fetchCountries()

  },[])


  useEffect(()=>{

    if(selectedcountry){
    let fetchCities = async()=>{
      let urlcity = `https://crio-location-selector.onrender.com/country=${selectedcountry}/states`;
      let response =await axios.get(urlcity);
      let data = await response; 
     console.log("cities fetched",data.data)
    }
    fetchCities()
  }
  

  
    },[selectedcountry])





    const handleCountrySelection = (e)=>{
     
      setChosenCountry(e.target.value)
    }


  return (
    <div>
  <h1> Select Location </h1>
  <select name="countries" id="countries" onChange={handleCountrySelection}>
  <option value="Select country" defaultValue>Select country</option>
      {countries.length>0? (
        countries.map((country)=>(
          <option key={country} value={country} >
            {country}
            </option>
          ))
  )
:

      (
 <>
 </>

      )
    }
  </select>


    </div>
  )
}

export default States