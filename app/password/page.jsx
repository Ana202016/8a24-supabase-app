//formulario para cambiar contraseña
// solo tiene acceso si se está autenticado

// componente cliente
/// -- estado para: contraseña, comfirmar contraseña
/// * validar que la contraseña tenga longitud minima: 6 caracteres
/// * que la contraseña y comfirmar contraseña sean iguales
/// -- mandar actualizar la contraseña desde una funcion por el lado del servidor

"use client"

import { createClient } from '@/utils/supabase/client'
import { useEffect, useState } from "react";
import {changePassword} from "./acctions"
import { useRouter } from 'next/navigation'


export default function AddProduct(){

    //formulario para agregar producto
    //nombre, description, precio, marca
    //todos son obligatorios
    const router =useRouter();
    const supabase = createClient()

    const [password, setPass] = useState('');
    const [conPassword, setConPas] = useState('');

    //estado donde conservar los mensajes de error
    const [errors, setErros]= useState({});

    /*
     cuando haya errores;
     errors={
        name:"Nombre es obligatorio.",
        description:"Descripcion es obligatorio.",
     }
     */

     useEffect(() => {
      const getData = async () => {
  
        const {data : {session}}= await supabase.auth.getSession();
        if(!session){
          router.push("/login");
        }
  
      /*  const prodResult= await getProducts();
        setProd(prodResult.products);
        if(prodResult.error){
          alert(prodResult.error.massage);
        }*/
      }
      getData()
    }, [])

  
    function onSave(form){
      
        //evitar el submit
        form.preventDefault();

//validacion de datos
        let errorList={};

        if(!password){
            errorList.password="La contraseña es obligaroria.";
        }else if(password.length < 6 ){
            errorList.password = "La contraseña debe tener al menos 6 carácteres."
        }
    
        if(!conPassword){
            errorList.conPassword= "Confirmar contraseña es obligatoria.";
        } else if (password && password != conPassword){
            errorList.conPassword = "La contraseña y confirmar contraseña no coinciden."
        }
    
        setErros({...errorList});
        if(Object.keys(errorList).length > 0 ){
          return;
      }
            changePassword(
                password, conPassword
              
            )
            .then((result)=>{
                console.log(result);

                //hacer algo con el resultado
                if(!result.success){
                    //hay errores
                    alert(result.message);
                    // mostrar los mensajes de error
                    setErros({...result.errors });
                } else {
                    //Si se guardó
                    // ????
                    alert(result.message);
                    //limpiar el form
                    setPass('');
                    setConPas('');

                    //limpiar errores
                    //setErrores({})
                }
            })
            .catch((error)=> {
                alert(error.message);
            })

        
    }

    return(

        <div className="mt-8 bg-amber-600 rounded px-6 py-6 grid justify-items-center font-serif" onSubmit={onSave}>
            <p className="text-black font-bold text-3xl italic font-serif ">Cambiar contraseña</p>
            <form method="POST">

                <div className="mb-3 flex flex-col">
                    <label htmlFor="password" className="text-black py-1"> Contraseña nueva</label>
                    
                    <input type="password" name="password"
                    className="border rounded p-2 text-black"
                    value={password}
                    onChange={(e) => {
                        setPass(e.target.value);
                        setErros({
                            ...errors,
                            name: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.password || ""}</p>
                </div>

                <div className="mb-2 flex flex-col">
                    <label htmlFor="conPassword" className="text-black py-1"> Comfirmar Contraseña</label>
                
                    <input type="password" name="conPassword"
                    className="border rounded p-2 text-black" 
                    value={conPassword}
                    onChange={(e) => {
                        setConPas(e.target.value);
                        setErros({
                            ...errors,
                            marca: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.conPassword || ""}</p>
                </div>

                <div className="my-6 flex justify-center">
                    <button type="submit"
                    className="bg-amber-900 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center">
                        Cambiar contraseña
                    </button>
                    <button 
                    className="bg-amber-900 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center" onClick={() => window.location.href = "./"}>
                        Cancelar
                    </button>
                </div>
            
            </form>
        </div>

    )



}