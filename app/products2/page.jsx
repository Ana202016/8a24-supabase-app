'use client'

import { useEffect} from 'react'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { buscarNotes, getProducts, searchProducts} from './actions';

export default function Notes() {
  const [prod, setProd] = useState(null)
   /* const supabase = createClient()*/
  
   const [search, setSearch] = useState('');

    useEffect(() => {
        const getData = async () => {
          const notesResult= await getProducts();
          setProd(notesResult.products);
          //falta mostrar la info del error en caso de que se tenga
          // notesResult.error
          if(notesResult.error){
            alert(notesResult.error.massage);
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
            console.log(prodResult)
            if (prodResult.error) {
                alert(prodResult.error.message);
            }
        }
    
        getData();
        
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
        <button className='bg-gray-300 rounded px-2 text-black m-2' onClick={() => window.location.href = "./products2/add"}>
          Agregar 
        </button>
      </div>

        <button 
        type='submit'
        className='bg-gray-300 rounded px-2 text-black m-2' >Buscar</button>
</div>
         <p>Puedes realizar tu busqueda por el nombre....</p>
      </form>
      <div className='col-md-2'>
        <label htmlFor="" className='control-label'>
          Marca
        </label>
        <select name="" id="mar" className='border rounded px-2 text-black m-2'/*onChange={handleFilt}*/>
          <option value="BISSÚ" >BISSÚ</option>
          <option value="SANIYE" >SANIYE</option>
          <option value="SA" >SA</option>
        </select>
      </div>

      {!prod || prod?.length === 0 ? <p>Ningún producto para mostrar</p> : null}

      <ul className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4 font-serif mt-6 text-inherit '>
        {prod?.map((product) => 
        <div className='bg-pink-100 text-black text-bold px-3 py-3 m-3 rounded px-4'>
          <li key={product.id}></li>
          <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
            <p>Marca: {product.marca}</p>
            {product?.gallery?.map((item) => <p>{item.original}</p>)}

            <button 
            className="bg-gray-300 rounded px-2"
            onClick={() => window.location.href = `./products/edit/${product.id}`}
            >
              Editar
            </button>
          </div>
        )}

      </ul>
    </div>
  );
}
