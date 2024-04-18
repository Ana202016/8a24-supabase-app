"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

function supabaseClient(){
        //crear cliente supabase
        const cookieStore = cookies();
        return createClient(cookieStore);
        
}

//archivo de accines para: notas

export async function getNotes(){

//conservar instancia de supabase
//asi podemos utilizar el cliente las veces que sea necesario
const supabase = supabaseClient();

    const { data: notes, error } = await supabase
    .from('notes')
    .select();

    return {
        notes,
        error,
    };
}

//funcion para buscar / filtrar

export async function buscarNotes(search){


    const { data: notes, error } = await supabaseClient()
      .from('notes')
      .select()
      .like('title', `%${search}%`);

      return {
        notes,
        error,
    };
}

export async function getNote(id) {
    const supabase = supabaseClient();

    const {data, error} =await supabase
    .from('notes')
    .select()
    .eq('id',id)
    .single();

    console.log(data);
    
    return({
        note:data,
        error,
    });
}




