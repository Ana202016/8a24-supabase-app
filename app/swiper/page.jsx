"use client"

export default function SwiperPage(){

        //funcion que retorna una tarjeta para el producto
        //para cada caja,
    const content =(product, index)=> (
        //calcular distancia con el lado izquierdo
//const left =index > 0 ? (index * 170) :0 ;

        <div
        id="tar"
        key = {product.id}
        className="p-4 h-[120px] w-[150px] bg-sky-200 text-black border border-1 absolute"
        style={{left:`${index*170}px`}}
        >
            <p>
                {product.name}
            </p>
        </div>
);

    const products =[
        {id:'1', name:'Producto 1'},
        {id:'2', name:'Producto 2'},
        {id:'3', name:'Product 3'},
        {id:'4', name:'Product 4'},
        {id:'5', name:'Product 5'},
        {id:'6', name:'Product 6'},
        {id:'7', name:'Product 6'},
        {id:'8', name:'Product 6'},
        {id:'9', name:'Product 6'}

    ]


return(
    <div className="py-14 px-4  w-full">
        <h1>Este es un ejemplo de slider</h1>

       <div
       
       className="overflow-x-auto w-full relative h-[120px] "
       >
        {products.map ((product, index)=> {
            return content (product, index);
        })}
        </div> 
    </div>
);

}
