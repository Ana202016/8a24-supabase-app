"use client"

import { useState } from "react";
import { StyleRegistry } from "styled-jsx";
import {addProduct } from './actions';


export default function AddProduct(){

    //formulario para agregar producto
    //nombre, description, precio, marca
    //todos son obligatorios

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [marca, setMarca] = useState('');

    //estado donde conservar los mensajes de error
    const [errors, setErros]= useState({});

    /*
     cuando haya errores;
     errors={
        name:"Nombre es obligatorio.",
        description:"Descripcion es obligatorio.",
     }
     */

    console.log(name,price, description, marca);

    function onSave(form){
        //evitar el submit
        form.preventDefault();

        //validar que se eeste ingresando 
        //-name
        //-descrption

        //objeto temporal para almacenar los errores
        let errorList={};
        //validar name
        //si name no tiene valor if(!name){}
       if(!name){
            errorList.name = "El nombre es obligatorio";
           
        }
        if(!price){
            errorList.price= "El precio es obligatorio";
        } else {
            const validPrice = price.match("^[0-9]+$");
            console.log(validPrice);
            if(!validPrice){
                errorList.price ="el precio debe de ser un numero"
            } 
        }
        if(!description){
            errorList.description= "La descripcion es obligatoria";
          
        }
        if(!marca){
            errorList.marca= "La marca es obligatoria";
          
        }

        //pasar la lista de errores al estado

        setErros({...errorList});
        //si hay mensajes de error, interrumpir el flujo
            if(Object.keys(errorList).length>0){
                return;
            }
       // alert("se guardan los datos");

            addProduct({
                name,
                price,
                description,
                marca,
            })
            .then((result)=>{
                //cuando la accion se ejecute correctamente
                // y retorne una respuesta
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
                    setName('');
                    setPrice('');
                    setDescription('');
                    setMarca('');

                    //limpiar errores
                    //setErrores({})
                }
            })
            .catch((error)=> {
                alert(error.message);
            })

        
    }

    return(

        <div className="mt-8 bg-pink-300 rounded px-6 py-6 grid justify-items-center font-serif" onSubmit={onSave}>
            <p className="text-black font-bold text-3xl italic font-serif ">Agregar Producto</p>
            <form method="POST">

                <div className="mb-3 flex flex-col">
                    <label htmlFor="name" className="text-black py-1"> Nombre del producto</label>
                    
                    <input type="text" name="name"
                    className="border rounded p-2 text-black"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setErros({
                            ...errors,
                            name: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.name || ""}</p>
                </div>

                <div className="mb-2 flex flex-col"> 
                    <label htmlFor="price" className="text-black py-1">Ingresa el precio</label>
                    
                    <input type="text" name="price"
                    className="border rounded p-2 text-black" 
                    value={price}
                    onChange={(e) => {
                        setPrice(e.target.value);
                        setErros({
                            ...errors,
                            price: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.price || ""}</p>
                </div>

                <div className="mb-2 flex flex-col">
                    <label htmlFor="description" className="text-black py-1">Descripcion del producto</label>
                    
                    <input type="text" name="description"
                    className="border rounded p-2 text-black" 
                    value={description}
                    onChange={(e) => {
                        setDescription(e.target.value);
                        setErros({
                            ...errors,
                            description: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.description || ""}</p>
                </div>

                <div className="mb-2 flex flex-col">
                    <label htmlFor="marca" className="text-black py-1"> Marca del producto</label>
                
                    <input type="text" name="marca"
                    className="border rounded p-2 text-black" 
                    value={marca}
                    onChange={(e) => {
                        setMarca(e.target.value);
                        setErros({
                            ...errors,
                            marca: undefined,
                        });
                    }} />
                    <p className="text-red-600">{errors.marca || ""}</p>
                </div>

                <div className="my-6 flex justify-center">
                    <button type="submit"
                    className="bg-pink-800 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center">
                        Registrar Producto
                    </button>
                    <button 
                    className="bg-pink-800 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center" onClick={() => window.location.href = "./"}>
                        Cancelar
                    </button>
                </div>
            
            </form>
        </div>

    )



}