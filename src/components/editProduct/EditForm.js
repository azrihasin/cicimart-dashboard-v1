//FRO ASSET
import React, { Fragment, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ImageUpload from '../layout/ImageUpload'
import ImageHandlerEdit from '../layout/ImageHandlerEdit'
import useStyles from '../../utils/useStyles'
import EditInfos from './EditInfos'
import EditDetails from './EditDetails'
import EditStock from './EditStock'

//FROM MUI
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'


const ProductForm = (props) => {
  let history = useHistory()
  const classes = useStyles()


  //FOR HANDLING FORM
  const { register, handleSubmit, control, formState } = useForm()
  const [stock, setStock] = useState(true)

  //FOR IMAGE UPLOAD DRAG AND DROP

  const [files, setFiles] = useState([])
  const [main, setMain] = useState([])
  const [extraOne, setExtraOne] = useState([])
  const [extraTwo, setExtraTwo] = useState([])
  const [extraThree, setExtraThree] = useState([])

  const tags = [
    'grocery',
    'household',
    'snacks',
    'beverages',
    'instant-food',
    'biscuits-and-bakery',
    'canned-food',
    'health-and-beauty',
    'chilled-and-frozen',
    '-',
  ]

  const onSubmit = async (data) => {
    props.submitProduct(data, files)

    console.log(data, files)

    //put fetch here

    // history.push('/inventory')
  }

  useEffect(() => {}, [])

  return (
    <Fragment>
      <Box      
      >
        <Grid container spacing={5} p={8}>
          {/* General Info */}
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={4}>
              <EditInfos id={props.id} currentProduct={props.currentProduct} />
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <EditDetails id={props.id} currentProduct={props.currentProduct}/>
            </Grid>
          </Grid>
          {/* second row */}
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={2}>
              {/* Product Photo */}
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  Product Photos
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ textAlign: 'left', fontSize: '15px', fontWeight: 100 }}
                >
                  Product Image Preview
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    width: 480,
                    height: 250,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box
                    className={classes.scroll}
                    component="div"
                    sx={{
                      overflow: 'auto',
                      my: 2,
                    }}
                  >
                    <Box style={{ display: 'inline-block' }}>
                      {props.currentProduct.mainImage != null ? (
                        <img
                          className={classes.imgBox}
                          src={props.currentProduct.mainImage}
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      {props.currentProduct.extraImages[0] != null ? (
                        <img
                          className={classes.imgBox}
                          src={props.currentProduct.extraImages[0]}
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      {props.currentProduct.extraImages[1] != null ? (
                        <img
                          className={classes.imgBox}
                          src={props.currentProduct.extraImages[1]}
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      {props.currentProduct.extraImages[2] != null ? (
                        <img
                          className={classes.imgBox}
                          src={props.currentProduct.extraImages[2]}
                        />
                      ) : (
                        <ImagePlaceholder />
                      )}
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Typography
                  sx={{ textAlign: 'left', fontSize: '15px', fontWeight: 100 }}
                >
                  New Uploaded Image Preview
                </Typography>
              </Grid>
              <Grid item xs={12}>
                {/* <ImageUpload image={image} setImage={setImage} /> */}
                <ImageUpload
                  files={files}
                  setFiles={setFiles}
                  main={main}
                  setMain={setMain}
                  extraOne={extraOne}
                  setExtraOne={setExtraOne}
                  extraTwo={extraTwo}
                  setExtraTwo={setExtraTwo}
                  extraThree={extraThree}
                  setExtraThree={setExtraThree}
                />
              </Grid>
              <Grid item xs={12}>
                <Box
                  style={{
                    width: 480,
                    maxHeight: 250,
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Box
                    className={classes.scroll}
                    component="div"
                    sx={{
                      overflow: 'auto',
                      my: 2,
                    }}
                  >
                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandlerEdit files={main} setFiles={setMain} />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandlerEdit
                        files={extraOne}
                        setFiles={setExtraOne}
                      />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandlerEdit
                        files={extraTwo}
                        setFiles={setExtraTwo}
                      />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandlerEdit
                        files={extraThree}
                        setFiles={setExtraThree}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider/>
              </Grid>
              <EditStock id={props.id} currentProduct={props.currentProduct}/>
              
             
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Fragment>
  )
}

const ImagePlaceholder = () => {
  const classes = useStyles()
  return (
    <img className={classes.imgBox} src={'https://via.placeholder.com/200'} />
  )
}


export default ProductForm
