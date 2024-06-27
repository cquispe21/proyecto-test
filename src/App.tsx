import { useEffect, useState } from 'react';
import './App.css';
import Header from './pages/Header/Header';
import axios from 'axios';

import {useForm} from 'react-hook-form';



function App() {
  const [Api, setApi] = useState([]);
  const [id, setApiId] = useState('');

  const {register, handleSubmit, formState:{errors}} = useForm();

  const ApiGet = async () => {
    const url = await axios.get("https://rickandmortyapi.com/api/character");
    console.log('fetching data from', url.data);
    setApi(url.data.results);
    console.log('fetching data from', Api);
  };

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   if (id) { 
  //     ApiGetId(parseInt(id));
  //   } else {
  //     ApiGet(); 
  //   }
  // };

  const onSubmit = handleSubmit((data, e) =>{
    e.preventDefault();
    if (data.id) { 
      ApiGetId(parseInt(data.id));
    } else {
      ApiGet(); 
    }
  });

  const ApiGetId = async (id: number) => {
    const url = await axios.get(`https://rickandmortyapi.com/api/character/${id}`);
    console.log('fetching data from', url.data);
    
    setApi([url.data]); 
  };

  useEffect(() => {
    ApiGet();
  }, []);

  return (
    <>
      <Header />
      <div className="flex justify-center items-center py-8">
        <form autoComplete='false' onSubmit={onSubmit}>
          <input
            className="bg-gray-200 appearance-none border-2 border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500 mr-3"
            type="text"
            id='id_personaje'
            placeholder="Escribe un Id de personaje"
            {...register('id', {required: {
              value:true, 
              message:'Campo requerido'
            }, 
              pattern: {
                value: /^[0-9]*$/,
                message: 'Solo se permiten números'
            },
              maxLength:3
            })}
          />
          <div className='absolute'>
            {errors.id && <span className='absolute text-nowrap text-red-500 text-xs'>{errors.id.message}</span>}
          </div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Consultar</button>
        </form>
      </div>
      
      {Api.map((item: any) => (
        <div className="w-1/4 p-2" key={item.id}>
          <div className="bg-white rounded-lg shadow-lg">
            <img src={item.image} alt="" className="rounded-t-lg w-full" />
            <div className="p-4">
              <h1 className="text-xl font-bold">{item.name}</h1>
              <p className="text-sm text-gray-600">{item.species}</p>
              <p className="text-sm text-gray-600">{item.gender === "Female" ? "Mujer" : "Hombre"}</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
