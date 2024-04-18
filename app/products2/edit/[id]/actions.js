"use server"

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

function supabaseClient(){
        const cookieStore = cookies();
        return createClient(cookieStore)
        
}


export async function getProductById(id) {
    const supabase = supabaseClient();
    const { data: product, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();
    
    if (error) {
        throw new Error('Error fetching product by ID');
    }

    return product;
}

export async function updateProduct(updatedProduct) {
    const supabase = supabaseClient();
    const { data, error } = await supabase
    .from('products')
    .update(updatedProduct)
    .eq('id', updatedProduct.id);

    if (error) {
        throw new Error('Error updating product');
    }

    return data;
}



/*const { supabaseClient } = require('pg');
/*const pool = new Pool({
  user: 'tu_usuario',
  host: 'tu_host',
  database: 'tu_base_de_datos',
  password: 'tu_contraseña',
  port: 5432,
});

export async function getImagesFromDatabase() {
  try {
    const result = await pool.query('SELECT * FROM products WHERE gallery IS NOT NULL');
    const images = result.rows.map(row => {
      const jsonbData = JSON.parse(row.gallery);
      return jsonbData.map(image => ({
        original: image.original,
        thumbnail: image.thumbnail,

      }));
      
    });
    console.log(images);
    return images;
  } catch (error) {
    console.error('Error al obtener las imágenes de la base de datos:', error);
    return [];
  }
}*/


