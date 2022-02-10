import React, { Fragment, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useHistory } from 'react-router-dom'

//FRO MUI UI
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Grid from '@mui/material/Grid'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import OutlinedInput from '@mui/material/OutlinedInput'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'

//FROM ASSET
import useStyles from '../../utils/useStyles'
import ImageHandler from './ImageHandler'
import ImageUpload from './ImageUpload'

const EmployeeForm = (props) => {
  let history = useHistory()
  const classes = useStyles()

  const [job,setJob] = useState('packer')

  //FOR HANDLING FORM
  const { register, handleSubmit, control, formState } = useForm()



  const tags = ['male', 'female']

  const onSubmit = async (data) => {

    console.log('JOB:'+job)

      var jobData;

      if(job=='packer-courier'){
        jobData = [
          "packer",
          "courier"
        ]
      }else{
        jobData = [job]
      }
    props.submitEmployee(props.store,data,jobData)


    //put fetch here

    history.push('/employee')
  }

  return (
    <Fragment>
      <Box mt={2}>
        <FormControl component="fieldset">
          <FormLabel style={{ textAlign: 'left' }} component="legend">
            Responsibilities
          </FormLabel>
          <RadioGroup 
            value={job}
            onChange={(e)=>setJob(e.target.value)}
            row
            aria-label="responsibility"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="packer"
              control={<Radio />}
              label="Packer"
            />
            <FormControlLabel
              value="courier"
              control={<Radio />}
              label="Courier"
            />
            <FormControlLabel
              value="packer-courier"
              control={<Radio />}
              label="Packer-Courier"
            />
          </RadioGroup>
        </FormControl>
      </Box>

      <Box
        id="EmployeeForm"
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        <Grid container spacing={15} pl={8} pr={8} pt={4}>
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
              <Grid item xs={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('name', { required: true })}
                  id="name"
                  label="Employee Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('email', { required: true })}
                  id="email"
                  label="Employee Email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('password', { required: true })}
                  id="password"
                  label="Password"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('phoneNo', { required: true })}
                  id="phoneNo"
                  label="Phone Number"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={6}>
                <Controller
                  render={({ field }) => (
                    <Select
                      style={{ marginTop: 15, marginLeft: 15 }}
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
                  name="gender"
                  control={control}
                  defaultValue={tags[0]}
                />
              </Grid>

              <Grid item xs={12}></Grid>
            </Grid>
          </Grid>

          {/* second row */}
          <Grid item xs={12} sm={12} md={12} lg={6}>
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Typography
                  variant="h5"
                  sx={{ textAlign: 'left', fontWeight: 600 }}
                >
                  Address
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('street', { required: true })}
                  id="street"
                  label="Street"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('area', { required: true })}
                  id="area"
                  label="Area"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('postcode', { required: true })}
                  id="postcode"
                  label="Postcode"
                  variant="outlined"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={6}>
                <TextField
                  size="small"
                  style={{ width: '100%' }}
                  {...register('state', { required: true })}
                  id="state"
                  label="State"
                  variant="outlined"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid
                  mt={3}
                  mr={4}
                  container
                  justifyContent="flex-end"
                  spacing={2}
                >
                  <Grid item>
                    <Button type="submit" m={2} variant="contained">
                      Add Employee
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

export default EmployeeForm
