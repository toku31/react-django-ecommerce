import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

function SearchBox() {

  const [keyword, setKeyword] = useState('')

  let history = useHistory()

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      // history.push(`/?keyword=${keyword}`)
      history.push(`/?keyword=${keyword}&page=1`)  // 77
    } else {
      // location.pathname: 現在ページURLのパス名を参照
      history.push(history.push(history.location.pathname))
    }
  }

  return (
    <Form onSubmit={submitHandler} inline>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setKeyword(e.target.value)}
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>

      <Button
        type='submit'
        variant='outline-success'
        className='p-2'
      >
        Submit
      </Button>
    </Form>
  )
}

export default SearchBox
