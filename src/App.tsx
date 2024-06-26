import { useEffect, useState } from 'react'
import './App.css'
import Header from './pages/Header/Header'
import axios from 'axios'

function App() {

  const [Api,setApi] = useState([])

  const ApiGet = async () => {
    const url =  await axios.get("https://rickandmortyapi.com/api/character")
    console.log('fetching data from', url.data.results)
    setApi(url.data.results)
    console.log('fetching data from', Api)
  }

  useEffect(() => {
    ApiGet()
  }
  , [])
  
  return (
    <>
    <Header />
    
    {Api.map((item:any) => {
      return (
        <div className="w-1/4 p-2">
          <div className="bg-white rounded-lg shadow-lg">
            <img src={item.image} alt="" className="rounded-t-lg"/>
            <div className="p-4">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p className="text-sm text-gray-600">{item.species}</p>
              <p className="text-sm text-gray-600">{item.gender === "Female" ? "Mujer":"Hombre"}</p>
            </div>
          </div>
        </div>
      )

    })}
   
    </>
  )
}

export default App
