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

const EditStock = (props) => {
    //FOR HANDLING FORM
    const { register, handleSubmit, control, formState } = useForm()
    const [info, setInfo] = useState(true)
    const [stock, setStock] = useState(props.currentProduct.stock)
  
    const onHandle = async (data) => {
     
    //FOR EDIT SEGMENT
    console.log('success')
    if (info == true) {

      setInfo(false)

    } else {

      console.log(data)

      //edit stock route

      const price = {
        productId: props.id,
        quantity: data.stock
    }

      var session_url = `/product/stock/increment`

      try {
        const res = await inventoryApi.post(session_url, price)
        console.log('success increment stock')

        var newStock = parseInt(stock) + parseInt(data.stock)
        setStock(newStock)
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
                  Product Stock
                </Typography>
                
                <IconButton type="submit" aria-label="edit">
                  {info === true ? <EditIcon /> : <DoneIcon />}
                </IconButton>
              </Grid>
             
              <Grid item xs={12} sm={12} md={12} lg={6}>
              <Typography style={{textAlign:'left'}}>Your Stock Quantity</Typography>
              <Typography style={{textAlign:'left',fontWeight:600}}variant="h6">{stock}</Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                  <Typography style={{textAlign:'left',marginBottom:5}}>Insert quantity you want to add</Typography>
              <Controller
                  name="stock"
                  control={control}
                  defaultValue={0}
                  rules={{ required: 'stock required' }}
                  render={({ field: { onChange, value } }) => (                  
                    <TextField
                      style={{ width: '100%' }}
                      {...register('stock', { required: true })}
                      id="stock"
                      label="Stock"
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

export default EditStock
