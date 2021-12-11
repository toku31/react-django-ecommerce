import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../components/Loader'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { Form, Button } from 'react-bootstrap'
import { listProductDetails, updateProduct } from '../actions/productActions'
import { PRODUCT_UPDATE_RESET } from '../constants/productConstants'
import axios from 'axios'

function ProductEditScreen({ match, history }) {

  const productId = match.params.id

  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [image, setImage] = useState('')
  const [brand, setBrand] = useState('')
  const [category, setCategory] = useState('')
  const [countInStock, setCountInStock] = useState(0)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)

  const dispatch = useDispatch()

  const productDetails = useSelector(state => state.productDetails)
  const { product, loading, error } = productDetails

  const productUpdate = useSelector(state => state.productUpdate)
  const { loading: loadingUpdate, error: errorUpdate, success: successUpdate } = productUpdate
 
  useEffect(() => {
    // 70
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/productlist')
    } else {
      // 69
      if (!product.name || product._id !== Number(productId)) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    }

  }, [dispatch, product, productId, history, successUpdate]);
  
  const submitHandler=(e)=> {
    e.preventDefault();
    // Update product
    dispatch(updateProduct({
      _id: productId,
      name,
      price,
      image,
      brand,
      category,
      countInStock,
      description
    }))
  };

  const uploadFileHandler = async (e) => {
    // console.log('File is uploading')
    const file = e.target.files[0]
    const formData = new FormData()

    formData.append('image', file)
    formData.append('product_id', productId)

    setUploading(true)

    try {
      const config = {
        header: {
          'Content-Type':'multipart/form-data'
        }
      }

      const { data } = await axios.post('/api/products/upload/', formData, config)
      setImage(data)
      setUploading(false)

    } catch (error) {
      setUploading(false)
    }

  }

  return (
    <div>
      <Link to='/admin/productlist'>
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}

        {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message>
          : (
              <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                  <Form.Label>Name</Form.Label>
                  <Form.Control type="name" value={name} placeholder="Enter name"
                  onChange={ (e) => setName(e.target.value)} />
                </Form.Group>
              
                <Form.Group controlId='price'>
                  <Form.Label>Price</Form.Label>
                  <Form.Control type="number" value={price} placeholder="Enter price"
                  onChange={ (e) => setPrice(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='image'>
                  <Form.Label>Image</Form.Label>
                  <Form.Control type="text" value={image} placeholder="Enter image"
                  onChange={(e) => setImage(e.target.value)} />
                  <Form.File id='image-file' label='Choose File' custom onChange={uploadFileHandler}
                  >
                  </Form.File>
                  {uploading && <Loader />}
                </Form.Group>
              
                <Form.Group controlId='brand'>
                  <Form.Label>Brand</Form.Label>
                  <Form.Control type="text" value={brand} placeholder="Enter brand"
                  onChange={ (e) => setBrand(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='countinstock'>
                  <Form.Label>Stock</Form.Label>
                  <Form.Control type="number" value={countInStock} placeholder="Enter stock"
                  onChange={ (e) => setCountInStock(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='category'>
                  <Form.Label>Category</Form.Label>
                  <Form.Control type="text" value={category} placeholder="Enter category"
                  onChange={ (e) => setCategory(e.target.value)} />
                </Form.Group>

                <Form.Group controlId='description'>
                  <Form.Label>Description</Form.Label>
                  <Form.Control type="text" value={description} placeholder="Enter description"
                  onChange={ (e) => setDescription(e.target.value)} />
                </Form.Group>
              
                <Button variant="primary" type="submit">Update</Button>
        </Form>
        )}
  
      </FormContainer>
    </div>
  )
}

export default ProductEditScreen 