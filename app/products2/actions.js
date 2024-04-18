"use server"

import { createClient } from '@/utils/supabase/server'
import { error } from 'console';
import { cookies } from 'next/headers'

function supabaseClient(){
        //crear cliente supabase
        const cookieStore = cookies();
        return createClient(cookieStore);
        
}

export async function getProducts(){

    //conservar instancia de supabase
    //asi podemos utilizar el cliente las veces que sea necesario
    const supabase = supabaseClient();
    
        const { data: products, error } = await supabase
        .from('products')
        .select();
    
        return {
            products,
            error,
        };
    }


//funcion para buscar / filtrar

export async function searchProducts(search){

    const supabase = supabaseClient();

    const { data, error } = await supabase
    .from('products')
    .select()
    .like('name', `%${search}%`)
   // .or('description', `%${search}%`);
    


  /*  if (error) {
        console.error('Error al buscar productos:', error.message);
        return { error: error.message };
    }*/

    return { data, error };
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

