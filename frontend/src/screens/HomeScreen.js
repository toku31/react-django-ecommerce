import React, { useEffect } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../actions/productActions';
// import products from '../products'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'  // 77
import ProductCaroulsel from '../components/ProductCaroulsel';
// import axios from 'axios'

function HomeScreen({history}) {
  const dispatch = useDispatch()
  const productList = useSelector(state => state.productList);
  const { loading, error, products, pages, page } = productList;

  // const [products, setProducts] = useState([])
  let keyword = history.location.search   // 76
  console.log('history', history)
  console.log('keyword1', keyword)
  useEffect(() => {
    dispatch(listProducts(keyword))

  //  console.log('useEffec triggered')

  //  async function fetchProducts(){
  //    const {data}= await axios.get('/api/products/')
  //    setProducts(data)
  //  }
  //  fetchProducts()

  }, [dispatch, keyword])

  return (
    <div>
      {!keyword && <ProductCaroulsel />}
      <h1>Latest Products</h1>
      {loading ? <Loader />
          : error? <Message variant='danger'>{error}</Message>
          :
          <div>
            <Row>
              {products.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                  {/* <h3>{product.name}</h3> */}
                  <Product product={product} />
                </Col>
              ))}
            </Row>
            <Paginate pages={pages} page={page} keyword={keyword}/> {/* 77 */}
          </div>
      }

    </div>
  )
}

export default HomeScreen

