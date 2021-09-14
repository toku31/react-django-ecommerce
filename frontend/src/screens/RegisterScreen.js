import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { register } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

function RegisterScreen(props) {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const redirect = props.location.search 
      ? props.location.search.split('=')[1]
      : '/' ;

  const userRegister = useSelector(state => state.userRegister)
  const { userInfo, loading, error } = userRegister


  const submitHandler=(e)=> {
      e.preventDefault();
      if(password !== confirmPassword){
        // alert('Password and confirm password are not match')
        setMessage('Passwords do not match')
      } else {
      // Register action
      dispatch(register(name, email, password))
      }
  };

  useEffect(()=>{
    if(userInfo) {
      props.history.push(redirect)
    }
  },[props.history, userInfo, redirect]);

  return (
    <FormContainer>
        <h1>Create Account</h1>
        {message && <Message variant='danger'>{message}</Message>}
        {loading && <Loader />}
        {error && <Message variant="danger">{error}</Message>}
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='name'>
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" value={name} placeholder="Enter name" required 
            onChange={ (e) => setName(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter email" required 
            onChange={ (e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='password'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} placeholder="Enter password" required 
            onChange={ (e) => setPassword(e.target.value)} />
          </Form.Group>

          <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control type="password" value={confirmPassword} placeholder="Enter confirm password" required 
            onChange={ (e) => setConfirmPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">Register</Button>
        </Form>

        <Row className='py-3'>
          <Col>
            Have an account? <Link to={redirect? `${redirect}` : '/login'}>Sign In</Link>
          </Col>
        </Row>
      
    </FormContainer>
  )
}

export default RegisterScreen 