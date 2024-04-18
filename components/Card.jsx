export const Card = ({ product }) => {
    return (
      <div>
        <div className='bg-pink-100 text-black text-bold px-3 py-3 m-3'>
          <li key={product.id}>
            <strong>{product.name}</strong>
            <p>Price: ${product.price}</p>
            <p>Description: {product.description}</p>
          </li>
        </div>
      </div>
    );
  }