/*import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import { Card } from '@/components/Card'
export default async function Products() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  // query que lee todos los registros de la tabla: notes
  const { data: products } = await supabase.from('products').select()

  return (
    <ul className='bg-pink-200 grid grid-colum-2 shadow grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 '>
      {products.map((product) => <Card product={product} />)}
    </ul>
  );
}
*/
'use client'

import { createClient } from '@/utils/supabase/client'
import React, { useEffect, useState } from 'react'

export default function Products() {
  const [prod, setProd] = useState(null)
  const supabase = createClient()

  const [search, setSearch] = useState('');

 useEffect(() => {
    const getData = async () => {
      const { data } = await supabase.from('products').select()
      setProd(data)
    }
    getData()
  }, [])

 /* async function handleSearch(e) {
    e.preventDefault();

    const { data } = await supabase
  .from('products')
  .select()
  .like('name', `%${search}%`)
  .or('description', `%${search}%`);

setProd(data);

  }*/
  async function handleSearch(e) {
    e.preventDefault();
  
    const nameQuery = supabase
      .from('products')
      .select()
      .like('name', `%${search}%`);
  
    const descriptionQuery = supabase
      .from('products')
      .select()
      .like('description', `%${search}%`);
  
    const { data: nameData } = await nameQuery;
    const { data: descriptionData } = await descriptionQuery;
  
    const combinedData = [...nameData, ...descriptionData]; // Combina los resultados de ambas consultas
  
    setProd(combinedData);
  }

  async function handleFilt(e) {
    e.preventDefault();

    const brand = document.getElementById('mar').value;

    const { data } = await supabase
        .from('products')
        .select()
        .eq('marca', brand);

    setProd(data);
}

  
 
  

  return (
    <div className='my-6 flex min-h-screen flex-col items-center  p-3'>
      <h1 className='text-center text-4xl font-bold text-pink-600 mb-4 font-mono'>Mis productos</h1>
      <form className='mb-4' onSubmit={handleSearch}>
        <input
          type="text"
          placeholder='Buscar..'
          className='border rounded px-2 text-black'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<div className='flex justify-end w-full'>
        <div className='flex justify-end w-full'>
        <button className='bg-gray-300 rounded px-2 text-black m-2' onClick={() => window.location.href = "./products/add"}>
          Agregar 
        </button>
      </div>

        <button 
        type='submit'
        className='bg-gray-300 rounded px-2 text-black m-2' >Buscar</button>
</div>
         <p>Puedes realizar tu busqueda por el nombre o el tono de tu esmalte....</p>
      </form>
      <div className='col-md-2'>
        <label htmlFor="" className='control-label'>
          Marca
        </label>
        <select name="" id="mar" className='border rounded px-2 text-black m-2'onChange={handleFilt}>
          <option value="BISSÚ" >BISSÚ</option>
          <option value="SANIYE" >SANIYE</option>
          <option value="SA" >SA</option>
        </select>
      </div>

      {!prod || prod?.length === 0 ? <p>Ningún producto para mostrar</p> : null}

      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 font-serif mt-6 text-inherit '>
        {prod?.map((product) => 
        <div className='bg-pink-100 text-black text-bold px-3 py-3 m-3 rounded px-4'>
          <li key={product.id}></li>
          <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Marca: {product.marca}</p>

            <button 
            className="bg-gray-300 rounded px-2"
            >
              Editar
            </button>
          </div>
        )}

      </ul>
    </div>
  );
}
