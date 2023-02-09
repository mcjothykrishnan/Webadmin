import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { downloadProductsAction } from '../../actions/products-actions'
import Product from '../Product'
import './index.css'

const Products = () => {
  useEffect(() => {
    (async () => await downloadProductsAction())()
  }, [])

  let products = useSelector(state => state.products.products)
  const error = useSelector(state => state.products.error)
  const loading = useSelector(state => state.products.loading)

  return (
    <div>
      <h2 className='table__title'>Users</h2>
      { error ? <p>An error ocurred</p> : null }
      { loading ? <p>Loading...</p> : null }
      <table className='table'>
        <thead>
          <tr>
            <th>Name</th>
            <th id='table__title-price'>Image</th>
            <th id='table__title-price'>Income</th>
            <th id='table__title-action'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {console.log(products,"products")}
          { products.length === 0 ? 'No products yet.' : (
            products.map(product =>
              <Product
                key={product.id}
                name={product.name}
                price={product.price}
                id={product.id}
                // pic={ typeof product.pic == "string"? product.pic:product.pic}
                preview={product.preview}

                
              />
            )
          )}
        </tbody>
      </table>
    </div>
  )
}

export default Products
