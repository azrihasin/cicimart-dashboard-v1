//FRO MUI UI
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { submitProduct } from '../../actions/addItem'
import useStyles from '../../utils/useStyles'
import DrawerHeader from '../layout/DrawerHeader'
import Main from '../layout/Main'
import ProductForm from '../layout/ProductForm'
import Spinner from '../layout/Spinner'

const AddProduct = ({ open, auth: { loading, user }, submitProduct }) => {
  const classes = useStyles()
  const [descEn, setDescEn] = React.useState('')
  const [descBm, setDescBm] = React.useState('')

  return loading === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <DrawerHeader />
      <Main open={!open}>
        <Box className={classes.headerArea}>
          <Box className={classes.headerTitle}>
            <Typography variant="h4" style={{ fontWeight: 600 }} align="left">
              Add Product
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Box mr={2}>
                <Button
                  // type="submit"
                  // form="productForm"
                  onClick={() => {
                    // history.push('/addProduct')
                  }}
                  //   endIcon={<AddIcon />}
                  variant="contained"
                >
                  Open Guidlines
                </Button>
              </Box>
              <Box>
                <Button
                  onClick={() => {
                    // history.push('/addProduct')
                  }}
                  //   endIcon={<AddIcon />}
                  variant="outlined"
                >
                  Import Csv
                </Button>
              </Box>
            </Box>
          </Box>

          {/* <ProductTabs className={classes.headerTab} /> */}
        </Box>

        <Box style={{height:'100vh'}}>
        <ProductForm
          submitProduct={submitProduct}
          descEn={descEn}
          descBm={descBm}
          setDescEn={setDescEn}
          setDescBm={setDescBm}
        />
        </Box>

        
      </Main>
    </Fragment>
  )
}

AddProduct.propTypes = {
  open: PropTypes.bool,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  open: state.sidebar.open,
  auth: state.auth,
})

export default connect(mapStateToProps, { submitProduct })(AddProduct)
