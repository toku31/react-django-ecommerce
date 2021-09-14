import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getUserDetails, updateUserProfile } from '../actions/userActions'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { USER_LOGIN_FAIL, USER_UPDATE_PROFILE_RESET } from '../constants/userConstants'

function ProfileScreen({ history }) {

      const [name, setName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [confirmPassword, setConfirmPassword] = useState('');
      const [message, setMessage] = useState('');

      const dispatch = useDispatch();

      const userLogin = useSelector(state => state.userLogin);
      const { userInfo } = userLogin;

      const userDetails = useSelector(state => state.userDetails)
      const { loading, error, user } = userDetails;

      const userUpdateProfile = useSelector(state => state.userUpdateProfile)
      const { success } = userUpdateProfile;
            
      useEffect(()=>{
        if (!userInfo){
          history.push('/login')
        } else {
          if (!user || !user.name || success){
            dispatch({type:USER_UPDATE_PROFILE_RESET})
            dispatch(getUserDetails('profile'))
          } else {
            setName(user.name);
            setEmail(user.email);
          }
        }
      }, [dispatch, history, userInfo, user, success])
      
      const submitHandler = (e) => {
        e.preventDefault();
        // dipatch update profile
        if (password !== confirmPassword) {
          setMessage('Password and Confirm Password Are Not Matched');
        } else {
          dispatch(updateUserProfile({'id': user._id, 'name': name, 'email': email, 'password': password }))
          setMessage('')
        }
      };

      return (
        <Row>
          <Col md={3}>
              <h2>User Profile</h2>
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
                  <Form.Control type="password" value={password} 
                  placeholder="Enter password"
                  onChange={ (e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control type="password" value={confirmPassword} 
                  placeholder="Enter confirm password"
                  onChange={ (e) => setConfirmPassword(e.target.value)} />
                </Form.Group>

                <Button variant="primary" type="submit">Update</Button>
            </Form>
          </Col>

          <Col md={9}>
          <h2>My Orders</h2>
          </Col>
        </Row>
  )
}

export default ProfileScreen
