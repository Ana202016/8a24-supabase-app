"use client"
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

export default async function Notes() {
  const cookieStore = cookies()
  const supabase = createClient(cookieStore)

  const [search, setSearch] = useState('');

  // query qu lee todos los registros de la tabla: notes
  const { data: notes, error } = await supabase.from('notes').select()
// const { data: notes, error }= Destructuracion

/**
 *  error: hay error: true
 * !error: No hay error: false
 * !!error: No No hay error: true
 */

console.log(error);

  return(
<div>
    <from
    className="mb-4"
    >
      <input 
      type='text'
      placeholder='Buscar...'
      className='border rounded px-2'
      
      />
      <button
      type='submint'
      >

      </button>
    </from>

    <ul className='bg-yellow-50 text-black text-bold px-3 py-3 m-3'>
      {notes.map((notes)=> <li key={notes.id}>{notes.title}</li>)}
    </ul>
    </div>
  );

 // return <pre>{JSON.stringify(notes, null, 2)}</pre>
}