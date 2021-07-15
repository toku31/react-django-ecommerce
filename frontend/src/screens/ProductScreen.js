import React, {useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Button, Card, ListGroupItem } from 'react-bootstrap';
import Rating from '../components/Rating'
// import products from '../products'
// import axios from 'axios'  // 24
import { useDispatch, useSelector } from 'react-redux'
import { listProductDetails } from '../actions/productActions'

import Loader from '../components/Loader';
import Message from '../components/Message';

function ProductScreen({ match }) {
  // const product = products.find((p) => p._id === match.params.id)
  // console.log(product)

  // const [product, setProduct] = useState([])  // 24 comment out

  const dispatch = useDispatch()
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {

    dispatch(listProductDetails(match.params.id))
    // 24
    // async function fetchProduct(){    
    //   const {data}= await axios.get(`/api/products/${match.params.id}`)
    //   setProduct(data)
    // }

    // fetchProduct()

  },[dispatch, match])

  // let product = {}

  return (
    <div>
      <Link to='/' className='btn btn-light my-3'>Go Back</Link>
      {/* {product.name} */}
      {loading ?
        <loader />
        :error
            ? <Message variant='danger'>{error}</Message>
            : (
                <Row>
                <Col md={6}>
                  <Image src={product.image} alt={product.name} fluid />
                </Col>
                <Col md={3}>
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h3>{product.name}</h3>
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`} color={'#f8e825'} /> 
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Price: ${product.price}
                    </ListGroup.Item>
        
                    <ListGroup.Item>
                      Description: {product.description}
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={3}>
                  <Card>
                    <ListGroup variant="flush">
                      <ListGroup.Item>
                        <Row>
                          <Col>Price:</Col>
                          <Col>
                            <strong>${product.price}</strong>
                          </Col>
                        </Row>
                      </ListGroup.Item>
        
                      <ListGroup.Item>
                        <Row>
                          <Col>Status:</Col>
                          <Col>
                              {product.countInStock > 0 ? 'In Stock' : 'Out of Stock' }
                          </Col>
                        </Row>
                      </ListGroup.Item>
        
                      <ListGroup.Item>
                        <Button className='btn-block' disabled={product.countInStock===0} type='button' >Add to cart</Button>
                      </ListGroup.Item>
        
                    </ListGroup>
                  </Card>
                </Col>
              </Row> 
            )
      }
     </div>
  )
}

export default ProductScreen
