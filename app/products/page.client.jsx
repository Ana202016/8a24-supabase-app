'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'
import {filtProducts, getProducts, searchProducts} from './actions';
import Slider from "../../components/slider";

import { useRouter } from 'next/navigation'

export default function Products() {

  const router =useRouter();
  const [prod, setProd] = useState([]);
  const supabase = createClient()

  const [search, setSearch] = useState('');

  const productCard =(product)=> (
    //calcular distancia con el lado izquierdo
//const left =index > 0 ? (index * 170) :0 ;

<div
    key = {product.id}
    className=" p-4 scroll-ml-6 snap-start bg-amber-200 text-black border border-4  text-sm leading-tight"
 
    >
        <p className="mb-2 text-lg font-semibold">
            {product.name}
        </p>
        <p className="mb-2 text-pretty overflow-hidden">
            {product.description}
        </p>
        <p className="text-xl font-bold">
            {product.price}
        </p>
  
    </div>
   
);

  useEffect(() => {
    const getData = async () => {

      const {data : {session}}= await supabase.auth.getSession();
      if(!session){
        router.push("/login");
      }

      const prodResult= await getProducts();
      setProd(prodResult.products);
      if(prodResult.error){
        alert(prodResult.error.massage);
      }
    }
    getData()
  }, [])

function handleSearch(e) {
  e.preventDefault(); // Impedir que se envíe el formulario y recargue la página

  console.log("Buscar:", search);

  const getData = async () => {
      const prodResult = await searchProducts(search);
      setProd(prodResult.data); // Actualizar el estado de los productos
      // Mostrar mensaje de error si lo hay
      
      if (prodResult.error) {
          alert(prodResult.error.message);
      }
  }

  getData();
}
  async function handleFilt(e) {
    e.preventDefault();

    const brand = document.getElementById('mar').value;

    const getData = async () => {
      const prodResult = await filtProducts(brand);
      setProd(prodResult.data); // Actualizar el estado de los productos
      // Mostrar mensaje de error si lo hay
      
      if (prodResult.error) {
          alert(prodResult.error.message);
      }
  }

  getData ();
}

  
 
  

  return (
    <div className='my-6 flex min-h-screen flex-col items-center  p-3'>
      
      <h1 className='text-center text-4xl font-bold text-amber-800 mb-4 font-mono'>Mis productos</h1>
      <form className='mb-4' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Buscar..'
          className=' rounded px-2 text-black bg-gray-200'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
{/**<div className='flex justify-end w-full'>*/}
        <div className='flex justify-end w-full'>
        <button className='bg-gray-300 rounded px-2 text-black m-2' onClick={() => window.location.href = "./products/add"}>
          Agregar 
        </button>
    {/** </div>*/}  

        <button 
        type='submit'
        className='bg-gray-300 rounded px-2 text-black m-2' >Buscar</button>
</div>
         <p>Puedes realizar tu busqueda por el nombre o el tono de tu esmalte....</p>
      </form>

      <div className='col-md-2'>
        <label htmlFor="mar" className='control-label'>
          Marca
        <select name="" id="mar" className='rounded-2 text-black m-2'onChange={handleFilt}>
          <option value="BISSÚ" >BISSÚ</option>
          <option value="SANIYE" >SANIYE</option>
          <option value="SA" >SA</option>
        </select>
        </label>
      </div>

      {/**Slider */}
      <div
      className='container'>
      <div className="py-14 px-4  w-full "
     
     //className="product-item w-full h-40 p-4 flex flex-col justify-center"
      >
        <h1>Este es un ejemplo de slider</h1>


    <Slider
        height={120}
        itemWidth={250}
        items={prod?.map((product) => productCard(product))}
        />
      </div>

      </div>
       {/**Slider end */}

      {!prod || prod?.length === 0 ? <p>Ningún producto para mostrar</p> : null}

    <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 font-serif mt-6 text-inherit '>  
        {prod?.map((product) => 
        <div className='bg-amber-300 text-black text-bold px-3 py-3 m-3 rounded px-4'>
          
          <div key={product.id}>
          <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Marca: {product.marca}</p>
          
            <button 
            className="bg-gray-300 rounded px-2 mr-2"
            onClick={() => window.location.href = `./products/edit/${product.id}`}
            >
              Editar
            </button>
            <button 
            className="bg-gray-300 rounded px-2 mr-2"
            onClick={() => window.location.href = `./products/gallery/${product.id}`}
            >
              Ver mas...
            </button>
          </div>
          </div>
        )}
        </div>

    </div>
    
  );
}
