import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { add } from '../store/cartSlice';
import { fetchProducts, STATUSES } from '../store/productSlice';



const Products = () => {
    const { data: products, status } = useSelector((state) => state.product);
    // const [products, setProduct] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProducts());

        // const fetchProducts =  async () => {
        //     const res = await fetch('https://fakestoreapi.in/api/products');
        //     const data = await res.json();
        //     console.log(data);
        //     setProduct(data.products);
        // }
        // fetchProducts();
    }, []);

    const handleAdd = (product) => {
        dispatch(add(product));
    }

    if( status === STATUSES.LOADING){
        return <h2>Loading...</h2>
    }

    if(status === STATUSES.ERROR){
        return <h2>Somthing Went Error...</h2>
    }

  return (
    <div className='productsWrapper'>
        {
            products.map(product => (
                <div className="card" key={product.id}>
                    <img src={product.image} alt="" style={{height: '11rem'}} />
                    <p style={{color: '#5e6155'}}>{product.title}</p>
                    <h5>₹{product.price}</h5>
                    <button className="btn" onClick={() => handleAdd(product)}>Add to cart</button>
                </div>
            ))
        }
    </div>
  )
}

export default Products;
