"use client"

import { useEffect, useState } from "react"
import { getNote } from "../../actions";

export default function Page({ params}){

        const [note, setNote]=useState({});

    //leer la nota desde la bd
    //la vista
    //console.log(params)
    useEffect(() =>{
        const loadNote =async () =>{
            //cargar los datos de la nota
            const noteResult= await getNote(params.id);

            //pasar los datos de la nota al estado note
            setNote (noteResult.note);

            // notesResult.error
          if(noteResult.error){
            alert(noteResult.error.massage);
        }
    };

    loadNote();
 },[] );

 //funcion para guardar para mandar a guardar o actualizar la nota

    //formulario para editar la nota

    return (
        <form action="">
            <input type="text" className="text-black"  value={note?.title || ''}/>
        </form>
    )
}