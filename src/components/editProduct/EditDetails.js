//FRO ASSET
import React, { Fragment, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import inventoryApi from '../../utils/inventoryApi'

//FROM MUI
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

const EditDetails = (props) => {
  //FOR HANDLING FORM
  const { register, handleSubmit, control, formState } = useForm()
  const [info, setInfo] = useState(true)

  const onHandle = async (data) => {
    //FOR EDIT SEGMENT
    console.log('success')
    if (info == true) {

      setInfo(false)

    } else {

      console.log(data)

      //edit price route

      const price = {
        productId: props.id,
        price: data.price
    }

      var session_url = `/product/price`

      try {
        const res = await inventoryApi.post(session_url, price)
        console.log('success edit price')
      } catch (err) {
        console.log(err)
      }

      //edit discount route

      const discount = {
        productId: props.id,
        discount: data.discount
    }

      var session_url = `/product/discount`

      try {
        const res = await inventoryApi.post(session_url, discount)
        console.log('success edit discount')
        console.log(res)
      } catch (err) {
        console.log(err)
      }

      setInfo(true)
    }
  }

  return (
    <Box
      mt={5}
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onHandle)}
    >
      <Grid container spacing={15}>
        {/* GENERAL INFORMATION */}
        <Grid item xs={12}>
          <Grid container spacing={4}>
            <Grid
              item
              xs={12}
              style={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <Typography
                variant="h5"
                sx={{ textAlign: 'left', fontWeight: 600 }}
              >
                Product Detail
              </Typography>

              <IconButton type="submit" aria-label="edit">
                {info === true ? <EditIcon /> : <DoneIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Controller
                name="price"
                control={control}
                defaultValue={props.currentProduct.price}
                rules={{ required: 'price required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('price', { required: true })}
                    id="price"
                    label="Price"
                    variant="outlined"
                    fullWidth
                    value={value}
                    size="small"
                    disabled={info}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Controller
                name="discount"
                control={control}
                defaultValue={props.currentProduct.discount}
                rules={{ required: 'discount required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('discount', { required: true })}
                    id="discount"
                    label="Discount"
                    variant="outlined"
                    fullWidth
                    value={value}
                    size="small"
                    disabled={info}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  )
}

export default EditDetails
