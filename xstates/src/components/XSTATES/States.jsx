import React, { useEffect,useState} from 'react'
import axios from 'axios'
import styles from './States.module.css'

function States() {

  const [countries,setCountries ] = useState ([])
  const [selectedcountry,setChosenCountry] = useState('')
 const [enabledropdown,setEnableDropdown] = useState(true)
 const [cities,setCities ] = useState ([])
 const [selectedCity,setChosenCity] = useState('')
const [citiesData,setCitiesData]= useState([])
const [enabledropdownCity,setEnableDropdownCity] = useState(true)
const [enableDropdownData,setEnableDropdownData] = useState(true)

const [ChosenCityData,setChosenCityData] = useState('')


console.log("selected country",selectedcountry)
console.log("selected city",selectedCity)


  useEffect(()=>{
  let fetchCountries = async()=>{
 try{
    let url = 'https://crio-location-selector.onrender.com/countries';
    let response =await axios.get(url);
    let data = await response; 

    setCountries(data.data)
    setEnableDropdown(false)
 }
    catch(e){
      console.log("Error occured while fetching countries",e)
    }
  }

  fetchCountries()

  },[])


  useEffect(()=>{

    if(selectedcountry){
  
    let fetchCities = async()=>{
      try{
      let urlcity = `https://crio-location-selector.onrender.com/country=${selectedcountry}/states`;
      let response =await axios.get(urlcity);
      let data = await response; 
      setCities(data.data)
      setEnableDropdownCity(false)
     console.log("cities fetched",data.data)
    }
    catch(e){
      console.log("Error occured while fetching cities",e)
    }
  }

    fetchCities()
  }
  

  
    },[selectedcountry])



    useEffect(()=>{

      if(selectedCity){
    
      let fetchDataCity = async()=>{
        try{
        let urlcity2 = `https://crio-location-selector.onrender.com/country=${selectedcountry}/state=${selectedCity}/cities`;
        let response =await axios.get(urlcity2);
        let data = await response; 
        setCitiesData(data.data)
        setEnableDropdownData(false)
       console.log("cities fetched",data.data)
      }
      catch(e){
        console.log("Error occured while fetching cities",e)
      }
    }
  
      fetchDataCity()
    }
    
  
    
      },[selectedCity])






    const handleCountrySelection = (e)=>{
     
      setChosenCountry(e.target.value)
    }


    const handleCitySelection =(e) =>{
      setChosenCity(e.target.value)

    }

    const handleCitySelectionData = (e)=>{
      setChosenCityData(e.target.value)

    }

  return (
    <div>
  <h1> Select Location </h1>
  <select name="countries" id="countries" onChange={handleCountrySelection} disabled={enabledropdown}>
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
 <p>Loading data..... </p>
 </>

      )
    }
  </select>


    <select name="cities" id="cities" onChange={handleCitySelection} disabled={enabledropdownCity}>
  <option value="Select city" defaultValue>Select city</option>
      {cities.length>0? (
        cities.map((city)=>(
          <option key={city} value={city} >
            {city}
            </option>
          ))
  ):
  (
<>
<p>Loading data...</p>
</>
  )


  }
</select>

<select name="citiesdata" id="citiesdata" onChange={handleCitySelectionData} disabled={enableDropdownData}>
  <option value="Select city" defaultValue>Select city</option>
      {citiesData.length>0? (
        citiesData.map((city1)=>(
          <option key={city1} value={city1} >
            {city1}
            </option>
          ))
  ):
  (
<>
<p>Loading data...</p>
</>
  )


  }
</select>
{
selectedCity && selectedcountry && ChosenCityData && (

  <p><span>You selected {ChosenCityData}</span>,{selectedCity},{selectedcountry}</p>
)

}
    </div>
  )
}

export default States