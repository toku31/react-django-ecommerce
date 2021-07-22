import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { addToCart, removeFromCart } from '../actions/cartActions';
import Message from '../components/Message';
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap';

export default function CartScreen({ match, location, history }) {
  const productId = match.params.id;
  // qty: ?qty=3  => ["?qty", "3"] に分割(split)
  const qty = location.search 
    ? Number(location.search.split('=')[1])
    : 1;

  const cart = useSelector(state => state.cart);
  const { cartItems } = cart;
  console.log('cartItems', cartItems)
  const dispatch = useDispatch()
  useEffect(() => {
    if(productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    console.log('remove:', id)
    dispatch(removeFromCart(id))
  }

  const checkoutHandler = () => {
    history.push('/login?redirect=shipping');
  };

  return (
    // <div>
    //   <h1>Cart Screen</h1>
    //   <p>ADD TO CART : ProductID: {productId} Qty: {qty}</p>
    // </div>
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length===0
          ? ( <Message variant='info'>
            Cart is empty. <Link to="/" >Go Back</Link>
          </Message>
          ) : (
            <ListGroup variant='flush'>
              { cartItems.map((item) => (
                  <ListGroup.Item key={item.prodct}>
                    <Row>
                      <Col md={2}>
                        <Image src={item.image} alt={item.name} fluid rounded />
                      </Col>
                      <Col md={3}>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                      </Col>
                      <Col md={2}>${item.price}</Col>
                      <Col md={2}>
                        {/* select の代わりに　Form.Control as＝"select" */}
                        <select value={item.qty} onChange={e => dispatch(addToCart(item.product, Number(e.target.value)))
                        }>
                        {[...Array(item.countInStock).keys()].map( x=> (
                          <option key={x + 1} value={x + 1}>{x + 1}</option>
                        ))}
                        </select>
                      </Col>
                      <Col md={1}>
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item.product)}>
                          <i className='fas fa-trash'></i>
                      </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              }
            </ListGroup>
          )}
      </Col>
      <Col md={4}>
          <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>
                    Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0 )}) items 
                  </h2>
                    ${cartItems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)} 
                </ListGroup.Item>
                <ListGroup>
                  <Button type="button" onClick={checkoutHandler} className="btn-block" disabled ={cartItems.length === 0}>
                    Proceed to Checkout
                  </Button>
                </ListGroup>
              </ListGroup>
          </Card>
      </Col>
    </Row>
  )
}

