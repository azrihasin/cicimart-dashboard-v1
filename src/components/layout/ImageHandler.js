import React, { useEffect, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import useStyles from '../../utils/useStyles'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid'

const thumbsContainer = {
  display: 'flex',
  //   flexDirection: 'row',
  //   flexWrap: 'wrap',
  //   marginTop: 16,
}

const thumb = {
  display: 'inline-flex',
  //   borderRadius: 2,
  //   border: '1px solid #eaeaea',
  //   marginBottom: 8,
  //   marginRight: 8,
  width: 198,
  height: 198,
  // padding: 4,
  //   boxSizing: 'border-box',
}

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden',
}

const img = {
  display: 'block',
  width: 'auto',
  //   height: '100%',
}

const ImageHandler = (props) => {
  const classes = useStyles()
  //   const [files, setFiles] = useState([])
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
      props.setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      )
    },
  })

  const thumbs = props.files.map((file) => (
    
    <div style={thumb} key={'image'}>
      <div style={thumbInner}>
        <img src={file.preview} style={img} />
      </div>
    </div>
  ))

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    // props.files.forEach((file) => URL.revokeObjectURL(file.preview))
  }, [props.files])

  return (
    <section className="container">
      <Box
        {...getRootProps({ className: 'dropzone' })}
        className={classes.imgBox}
      >
        <input {...getInputProps()} />
        <aside style={thumbsContainer}>{thumbs}</aside>
      </Box>

      {/* <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <aside style={thumbsContainer}>{thumbs}</aside>
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div> */}
    </section>
  )
}

export default ImageHandler
