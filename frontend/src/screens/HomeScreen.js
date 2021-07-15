import React, { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';

// import products from '../products'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

// import axios from 'axios'

function HomeScreen() {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  // const [products, setProducts] = useState([])
  useEffect(() => {
    dispatch(listProducts())
  //  console.log('useEffec triggered')

  //  async function fetchProducts(){
  //    const {data}= await axios.get('/api/products/')
  //    setProducts(data)
  //  }

  //  fetchProducts()

  }, [dispatch])

  return (
    <div>
      <h1>Latest Products</h1>
      {loading ? <Loader />
          : error? <Message variant='danger'>{error}</Message>
          :
          <Row>
            {products.map(product => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                {/* <h3>{product.name}</h3> */}
                <Product product={product} />
              </Col>
            ))}
        </Row>
      }

    </div>
  )
}

export default HomeScreen

