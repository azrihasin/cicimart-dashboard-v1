//FRO MUI UI
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'
import ImageUpload from './ImageUpload'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import useStyles from '../../utils/useStyles'
import ImageHandler from './ImageHandler'
import OutlinedInput from '@mui/material/OutlinedInput'

const ProductForm = (props) => {
  let history = useHistory()
  const classes = useStyles()

  //FOR HANDLING FORM
  const { register, handleSubmit, control, formState } = useForm()

  //FOR IMAGE UPLOAD DRAG AND DROP
  const [files, setFiles] = useState([])
  const [main, setMain] = useState([])
  const [extraOne, setExtraOne] = useState([])
  const [extraTwo, setExtraTwo] = useState([])
  const [extraThree, setExtraThree] = useState([])

  //FOR IMAGE UPLOAD
  const [image, setImage] = useState({
    file: [],
    filepreview: null,
  })

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
    props.submitProduct(data, main, extraOne, extraTwo, extraThree)

    console.log(data, main, extraOne, extraTwo, extraThree)

    //put fetch here

    history.push('/inventory')
  }

  return (
    <Fragment>
      <Box
        id="productForm"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={15} p={8}>
          {/* general */}
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  General Information
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('brand', { required: true })}
                  id="brand"
                  label="Brand"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('code', { required: true })}
                  id="code"
                  label="Product Code"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'left', fontWeight: 100 }}
                >
                  English version
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('nameEn', { required: true })}
                  id="nameEn"
                  label="Display Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Controller
                  name="descEn"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description required' }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      style={{ width: '100%' }}
                      fullWidth
                      id="descEn"
                      label="Description"
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  sx={{ textAlign: 'left', fontWeight: 100 }}
                >
                  Bahasa Melayu version
                </Typography>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('nameBm', { required: true })}
                  id="nameBm"
                  label="Display Name"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12}>
                <Controller
                  name="descBm"
                  control={control}
                  defaultValue=""
                  rules={{ required: 'Description required' }}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      size="small"
                      style={{ width: '100%' }}
                      fullWidth
                      id="descBm"
                      label="Description"
                      multiline
                      maxRows={4}
                      value={value}
                      onChange={onChange}
                    />
                  )}
                />
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                
                  render={({ field }) => (
                    <Select
                      style={{marginTop:15,marginLeft:15}}
                      size="small"
                      variant="outlined"                     
                      {...field}
                      input={<OutlinedInput />}
                      fullWidth
                    >
                      {tags.map((tag, index) => (
                        <MenuItem {...field} key={index} value={tag}>
                          {tag}
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  name="category"
                  control={control}
                 
                  defaultValue={tags[0]}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('weight', { required: true })}
                  id="weight"
                  label="Weight"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>

          {/* second row */}
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box style={{display:'flex',justifyContent:'space-between'}}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  Product Photos
                </Typography>
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
                </Box>
                
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
                      <ImageHandler files={main} setFiles={setMain} />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandler files={extraOne} setFiles={setExtraOne} />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandler files={extraTwo} setFiles={setExtraTwo} />
                    </Box>

                    <Box style={{ display: 'inline-block' }}>
                      <ImageHandler
                        files={extraThree}
                        setFiles={setExtraThree}
                      />
                    </Box>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  Product Detail
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('price', { required: true })}
                  id="price"
                  label="Price"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('discount', { required: true })}
                  id="discount"
                  label="Discount"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('reward', { required: true })}
                  id="reward"
                  label="Reward"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  Stock
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('stock', { required: true })}
                  id="stock"
                  label="Stock"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid
                  mt={6}
                  mr={4}
                  container
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid item>
                    <Button type="submit" m={2} variant="contained">
                      Add Product
                    </Button>
                  </Grid>
                  <Grid item>
                    {' '}
                    <Button m={2} variant="outlined">
                      Save as Draft
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button m={2}>Cancel</Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {/* detail */}
        </Grid>
      </Box>
    </Fragment>
  )
}

export default ProductForm
