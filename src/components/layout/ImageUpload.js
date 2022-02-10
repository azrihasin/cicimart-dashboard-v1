import * as React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Typography from '@mui/material/Typography';
import useStyles from '../../utils/useStyles'
import Grid from '@material-ui/core/Grid'
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImageHandler from './ImageHandler'

//FROM MUI DOCUMENTATION

const ImageUpload = (props) => {
  const classes = useStyles()

  const [open, setOpen] = React.useState(false)
  const [fullWidth, setFullWidth] = React.useState(true)
  const [maxWidth, setMaxWidth] = React.useState('md')

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleMaxWidthChange = (event) => {
    setMaxWidth(
      // @ts-expect-error autofill of arbitrary value is not handled.
      event.target.value,
    )
  }

  const handleFullWidthChange = (event) => {
    setFullWidth(event.target.checked)
  }

  return (
    <React.Fragment>
      <Button startIcon={<UploadFileIcon/>}style={{fontSize: '12px',textTransform: "none"}}  size='small' variant="contained" onClick={handleClickOpen}>
        Upload Image
      </Button>
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle>Upload Photos</DialogTitle>
        <DialogContent dividers>
          <DialogContentText>
            Drag and Drop or Upload Your Photos here.
          </DialogContentText>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
            }}
          >
            <Grid container>
              
              <Grid xs={12} md={12} lg={3} container>
              
                <Grid item xs={12}>
                  <Typography>Main Image</Typography>
                </Grid>
                <Grid item xs={12}>
                  <ImageHandler
                  files={props.main}
                  setFiles={props.setMain}
                  />
                </Grid>
              </Grid>

              <Grid xs={9} md={12} lg={9}container>
                <Grid item xs={12}>
                <Typography>Extra Image</Typography>
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                  <ImageHandler
                  files={props.extraOne}
                  setFiles={props.setExtraOne}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                  <ImageHandler
                  files={props.extraTwo}
                  setFiles={props.setExtraTwo}
                  />
                </Grid>
                <Grid item xs={12} md={12} lg={4}>
                  <ImageHandler
                  files={props.extraThree}
                  setFiles={props.setExtraThree}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  )
}

export default ImageUpload
