//FRO ASSET
import React, { Fragment, useState, useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import inventoryApi from '../../utils/inventoryApi'

//FROM MUI
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit'
import DoneIcon from '@mui/icons-material/Done'

const EditInfos = (props) => {
  //FOR HANDLING FORM
  const { register, handleSubmit, control, formState } = useForm()
  const [info, setInfo] = useState(true)

  const onSubmit = async (data) => {
    //FOR EDIT SEGMENT
    console.log('success')
    if (info == true) {
      setInfo(false)
    } else {
      console.log(data)

      const info = {
        productId: props.id,
        code: data.code,
        name: {
          en: data.nameEn,
          ms: data.nameBm,
        },
        description: {
          en: data.descEn,
          ms: data.descBm,
        },
        category: data.category,
        tags: ['tag1', 'tag2'],
        brand: data.brand,
        extraDetails: {
          en: [{ label: 'Weight', info: data.weight }],
          ms: [{ label: 'Berat', info: data.weight }],
        },
      }

      var session_url = `/product/details`

      try {
        const res = await inventoryApi.post(session_url, info)
        console.log('success edit details')
      } catch (err) {
        console.log(err)
      }

      setInfo(true)
    }
  }

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
  return (
    <Box
      component="form"
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
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
                General Information
              </Typography>

              <IconButton type="submit" aria-label="edit">
                {info === true ? <EditIcon /> : <DoneIcon />}
              </IconButton>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Controller
                name="brand"
                control={control}
                defaultValue={props.currentProduct.brand}
                rules={{ required: 'Brand required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('brand', { required: true })}
                    id="brand"
                    label="Brand"
                    variant="outlined"
                    fullWidth
                    value={value}
                    disabled={info}
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Controller
                name="code"
                control={control}
                defaultValue={props.currentProduct.code}
                rules={{ required: 'Code required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('code', { required: true })}
                    id="code"
                    label="Product Code"
                    variant="outlined"
                    fullWidth
                    value={value}
                    disabled={info}
                    size="small"
                  />
                )}
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
              <Controller
                name="nameEn"
                control={control}
                defaultValue={props.currentProduct.name.en}
                rules={{ required: 'Code required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('nameEn', { required: true })}
                    id="nameEn"
                    label="Display Name"
                    fullWidth
                    value={value}
                    disabled={info}
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descEn"
                control={control}
                defaultValue={props.currentProduct.description.en}
                rules={{ required: 'Description required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    fullWidth
                    id="descEn"
                    label="Description"
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    value={value}
                    disabled={info}
                    size="small"
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
              <Controller
                name="nameBm"
                control={control}
                defaultValue={props.currentProduct.name.ms}
                rules={{ required: 'nameBm required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('nameBm', { required: true })}
                    id="nameBm"
                    label="Display Name"
                    fullWidth
                    value={value}
                    disabled={info}
                    size="small"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12}>
              <Controller
                name="descBm"
                control={control}
                defaultValue={props.currentProduct.description.ms}
                rules={{ required: 'Description required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    fullWidth
                    id="descBm"
                    label="Description"
                    multiline
                    maxRows={4}
                    value={value}
                    onChange={onChange}
                    value={value}
                    disabled={info}
                    size="small"
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
                    size="small"
                    variant="outlined"
                    disabled={info}
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
                error={formState.errors?.tag ? true : false}
                defaultValue={() => {
                  for (var i = 0, len = tags.length; i < len; i++) {
                    if (props.currentProduct.category == tags[i]) {
                      return tags[i]
                    }
                  }
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6}>
              <Controller
                name="weight"
                control={control}
                defaultValue={props.currentProduct.extraDetails.en[0].info}
                rules={{ required: 'weight required' }}
                render={({ field: { onChange, value } }) => (
                  <TextField
                    style={{ width: '100%' }}
                    {...register('weight', { required: true })}
                    id="weight"
                    label="Weight"
                    variant="outlined"
                    fullWidth
                    value={value}
                    disabled={info}
                    size="small"
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

export default EditInfos
