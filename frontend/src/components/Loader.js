import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function LoadingBox() {
  return (
    <>
      <div className="loading">
        <i className="fa fa-spinner fa-spine"></i> Loading...
      </div>
      <Spinner
            animation='border'
            role='status'
            style={{
                height: '100px',
                width: '100px',
                margin: 'auto',
                display: 'block'
            }}
        >
            <span className='sr-only'>Loading...</span>
        </Spinner>
    </>
  )
}