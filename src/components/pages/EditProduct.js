//FRO MUI UI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React, { Fragment, useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { submitProduct } from '../../actions/addItem'
import useStyles from '../../utils/useStyles'
import DrawerHeader from '../layout/DrawerHeader'
import Main from '../layout/Main'
import EditForm from '../editProduct/EditForm'
import Spinner from '../layout/Spinner'

import inventoryApi from '../../utils/inventoryApi'

const AddProduct = ({ open, products, auth: { loading }, submitProduct }) => {
  const classes = useStyles()
  const params = useParams()

  const [currentProduct, setCurrentProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [enable, setEnable] = useState(false);
  const [title, setTitle] = useState('Edit Product');

  const findProduct = async (id) => {
    setIsLoading(true)

    var session_url = `/query/details-for-manager/${id}`

    try {
      const res = await inventoryApi.get(session_url)

      // console.log(res.data.name.ms)
      setCurrentProduct(res.data)
      setTitle(res.data.name.en)
      setEnable(res.data.enabled)
      setIsLoading(false)
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }

  }

  const handleStatus = async(id) =>{
    if(enable === true){
      var session_url =`/product/disable`

      const product = {
        productId: id
      }

      try {
        const res = await inventoryApi.post(session_url, product)
        console.log('success disable product')
      } catch (err) {
        console.log(err)
      }

      setEnable(false)
    }else if(enable === false){
      var session_url =`/product/enable`

      const product = {
        productId: id
      }

      try {
        const res = await inventoryApi.post(session_url, product)
        console.log('success enable product')
      } catch (err) {
        console.log(err)
      }

      setEnable(true)
    }
  }

  useEffect(() => {
    findProduct(params.product)
  },[])

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Box className={classes.headerArea}>
          <Box className={classes.headerTitle}>
            <Typography variant="h4" style={{ fontWeight: 600 }} align="left">
              {title}
            </Typography>
            <Button onClick={()=>{handleStatus(params.product)}} variant="contained">{enable ? 'Disable Product': 'Enable Product' }</Button>
          </Box>
        </Box>
        {currentProduct== null ? (
          <Spinner />
        ) : (
          <EditForm
            id={params.product}
            submitProduct={submitProduct}
            currentProduct={currentProduct}
          />
        )}
      </Main>
    </Fragment>
  )
}

AddProduct.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
  products: PropTypes.object,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
  products: state.item.products,
})

export default connect(mapStateToProps, { submitProduct })(AddProduct)
