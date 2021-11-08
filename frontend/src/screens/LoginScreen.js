import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { login } from '../actions/userActions'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { Form, Button, Row, Col } from 'react-bootstrap'

function LoginScreen(props) {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const redirect = props.location.search 
      ? props.location.search.split('=')[1]
      : '/' ;

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo, loading, error } = userLogin

  const dispatch = useDispatch()

  const submitHandler=(e)=> {
      e.preventDefault();
      // Signin action
      console.log('Sign In')
      dispatch(login(email, password))
  };

  useEffect(()=>{
    if(userInfo) {
      props.history.push(redirect)
    }
  },[props.history, userInfo, redirect]);

  return (
      <FormContainer>
        <h1>Sign In</h1>
        <Form onSubmit={submitHandler}>
          {loading && <Loader></Loader>}
          {error && <Message variant="danger">{error}</Message>}

          <Form.Group controlID='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" value={email} placeholder="Enter email" required 
            onChange={ (e) => setEmail(e.target.value)} />
          </Form.Group>

          <Form.Group controlID='pasword'>
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" value={password} placeholder="Enter password" required 
            onChange={ (e) => setPassword(e.target.value)} />
          </Form.Group>

          <Button variant="primary" type="submit">Sign In</Button>

          <Row className="py-3">
            <Col>
              New customer? <Link 
                to={redirect ? `/register?redirect=${redirect}` : '/register' }>
                Register
                </Link>
            </Col>
          </Row>
        </Form>
      </FormContainer>
  )
}

export default LoginScreen
