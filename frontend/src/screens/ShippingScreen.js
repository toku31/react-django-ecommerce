import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import { Form, Button } from 'react-bootstrap'
import { saveShippingAddress } from '../actions/cartActions'

function ShippingScreen( { history }) {
  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const dispatch = useDispatch()

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const submitHandler = (e)=> {
    e.preventDefault();
    console.log('Submitted')
    dispatch(saveShippingAddress({ address, city, postalCode, country}))
    history.push('/payment')
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2/>
      <h1>Shipping</h1>
      <form onSubmit={submitHandler}>   

        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control type="text" value={address ? address : ''} placeholder="Enter address" required 
          onChange={ (e) => setAddress(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='city'>
          <Form.Label>City</Form.Label>
          <Form.Control type="text" value={city ? city : ''} placeholder="Enter city" required 
          onChange={ (e) => setCity(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='postalCode'>
          <Form.Label>PostalCode</Form.Label>
          <Form.Control type="text" value={postalCode ? postalCode : ''} placeholder="Enter postal code" required 
          onChange={ (e) => setPostalCode(e.target.value)} />
        </Form.Group>

        <Form.Group controlId='country'>
          <Form.Label>Country</Form.Label>
          <Form.Control type="text" value={country ? country : ''} placeholder="Enter country" required 
          onChange={ (e) => setCountry(e.target.value)} />
        </Form.Group>

        <Button type='submit' variant='primary'>
          Continue
        </Button>

      </form>
    </FormContainer>
  )
}

export default ShippingScreen
