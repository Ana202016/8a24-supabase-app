"use server"

import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'

/**
 * Funcion para registrar un nuevo producto.
 * @param {*} product datos del producto
 */
export async function addProduct(product){
    //validar los datos
     //objeto temporal para almacenar los errores
     let errorList={};
     //validar name
     //si name no tiene valor if(!name){}
     if(!product.name){
         errorList.name = "El nombre es obligatorio";
        
     }
     if(!product.price){
         errorList.price= "El precio es obligatorio";
     } else {
        // const validPrice = product. price.match("^[0-9]+$");
         //console.log(validPrice);
         if(!product.price.match("^[0-9]+$")){
             errorList.price ="el precio debe de ser un numero"
         } 
     }
     if(!product.description){
         errorList.description= "La descripcion es obligatoria";
       
     }
     if(!product.marca){
         errorList.marca= "La marca es obligatoria";
       
     }

     if(Object.keys(errorList).length > 0){
        return{
            success: false,
            message:'Ingresar los datos correctamente.',
            errors: errorList,
        };
     }

     /**
      * sino hay errores en los datos
      * mandar a insertar
      * manejar error al insertar
      */

     const cookieStore = cookies()
  const supabase = createClient(cookieStore)

const { data, error } = await supabase
.from('products')
.insert([
  product,
])
.select();

//si hay un error al insertaral insertar , retornar aviso al cliente
if(error){
    return{
        success: false,
        message:`Ocurrio un error al guardar el producto. Error; ${message}`,
        errors: errorList,
    };
}
        

     return{
        success: true,
        message:'El producto se ha registrado correctamente.',
        errors: null,
    };

}
