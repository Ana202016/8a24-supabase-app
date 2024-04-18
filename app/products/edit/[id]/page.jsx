'use client'
import { useEffect, useState } from 'react';
import { getProductById, updateProduct } from './actions.js';
import Link from 'next/link.js';

const EditProductPage = ({ params }) => {
    const id = params.id
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);


    const [updatedProduct, setUpdatedProduct] = useState({
        id: '',
        name: '',
        description: '',
        price: 0,
        category: '',
    });

    const [errors, setErrors] = useState({});

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const product = await getProductById(id);
                setProduct(product);
                setUpdatedProduct(product);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        if (id) {
            fetchProduct();
        }
    }, [id]);


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const validateForm = () => {
        let valid = true;
        const errors = {};

        if (!updatedProduct.marca.trim()) {
            errors.marca = 'La marca es obligatoria';
            valid = false;
        }

        if (!updatedProduct.name.trim()) {
            errors.name = 'El nombre es obligatoria';
            valid = false;
        }

        if (updatedProduct.price <= 0) {
            errors.price = 'El precio debe ser mayor que cero';
            valid = false;
        } else {
            if(!updatedProduct.price.match("^[0-9]+$")){
                errors.price ="el precio debe de ser un numero"
            } 
        }


        if (!updatedProduct.description.trim()) {
            errors.description = 'La descripción es obligatoria';
            valid = false;
        }

        setErrors(errors);
        return valid;
    };

   /* const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProduct(updatedProduct);
            alert("Producto editado correctamente");
            window.location.href = "/products";
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };*/
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                await updateProduct(updatedProduct);
                alert("Producto editado correctamente");
                window.location.href = "/products";
                //Router.push('/products');
            } catch (error) {
                console.error('Error al actualizar el producto');
            }
        }
    };

    if (loading) {
        return <div>Cargando...</div>;
    }
    

    

    return (
        <div className="mt-8 bg-amber-600 rounded px-6 py-6 grid justify-items-center font-serif">
            <div className="">
                <div className='mt-5px'>
                    <h1
                        className="text-black font-bold text-3xl italic font-serif ">
                        Editar Producto {id}
                    </h1>
                </div>
               
                <form onSubmit={handleSubmit}>
                
                    <div
                        className='mb-2 flex flex-col'>
                            <label htmlFor="name" className="text-black py-1"> Nombre del producto</label>
                        <input
                            className="border rounded p-2 text-black"
                            type="text"
                            name="name"
                            value={updatedProduct.name}
                            onChange={handleInputChange} />
                              {errors.name && <span className="text-red-800">{errors.name}</span>}
                    </div>
                    
                    <div
                        className='mb-2 flex flex-col'>
                            <label htmlFor="description" className="text-black py-1">Descripcion del producto</label>
                        <input
                            className="border rounded p-2 text-black wh-auto"
                            type="text"
                            name="description"
                            value={updatedProduct.description}
                            onChange={handleInputChange} />
                            {errors.description && <span className="text-red-800">{errors.description}</span>}
                    </div>
                   
                    <div
                        className='mb-2 flex flex-col'>
                             <label htmlFor="price" className="text-black py-1">Ingresa el precio</label>
                        <input
                            className="border rounded p-2 text-black"
                            type="text"
                            name="price"
                            value={updatedProduct.price}
                            onChange={handleInputChange} />
                             {errors.price && <span className="text-red-800">{errors.price}</span>}
                    </div>
                    
                    <div
                        className='mb-2 flex flex-col'>
                            <label htmlFor="marca" className="text-black py-1"> Marca del producto</label>
                        <input
                            className="border rounded p-2 text-black"
                            type="text"
                            name="marca"
                            value={updatedProduct.marca}
                            onChange={handleInputChange} />
                             {errors.marca && <span className="text-red-800">{errors.marca}</span>}
                    </div>
                    
                
                
                <div className="flex mt-4 md:mt-6 posi">
                        <button
                            className="bg-amber-900 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center"
                        >
                            Guardar
                        </button>
                        <Link
                            href="/products"
                            className="bg-amber-900 rounded-md text-black font-bold font-serif px-2 py-2 mx-2 grid justify-items-center"
                        >
                            Cancelar
                        </Link>
                    </div>
                    </form>
            </div>
        </div>
    );
};



export default EditProductPage;
