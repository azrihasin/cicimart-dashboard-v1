import * as React from 'react'
import IconButton from '@mui/material/IconButton'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import FilterListIcon from '@mui/icons-material/FilterList'
import Checkbox from '@mui/material/Checkbox'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import FileUploadIcon from '@mui/icons-material/FileUpload'
import RefreshIcon from '@mui/icons-material/Refresh'

const ITEM_HEIGHT = 48

const FilterInventory = () => {
  //FOR FILTER BUTTON
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  //FOR CHECKBOX
  const [checked, setChecked] = React.useState(true)
  const [grocery, setGrocery] = React.useState(false)
  const [household, setHousehold] = React.useState(false)
  const [snacks, setSnacks] = React.useState(false)
  const [beverages, setBeverages] = React.useState(false)
  const [instantFood, setInstantFood] = React.useState(false)
  const [biscuit, setBiscuit] = React.useState(false)
  const [cannedFood, setCannedFood] = React.useState(false)
  const [health, setHealth] = React.useState(false)
  const [chilled, setChilled] = React.useState(false)

  const category = [
    { name: 'All', status: checked },
    { name: 'grocery', status: grocery },
    { name: 'household', status: household },
    { name: 'snacks', status: snacks },
    { name: 'beverages', status: beverages },
    { name: 'instantFood', status: instantFood },
    { name: 'biscuit', status: biscuit },
    { name: 'cannedFood', status: cannedFood },
    { name: 'health', status: health },
    { name: 'chilled', status: chilled },
  ]

  const handleChange = (event) => {
    setChecked(event.target.checked)
  }

  return (
    <div>
      <Box style={{ display: 'flex' }}>
        {/* <Box mr={2}>
          <Button
            style={{ textTransform: 'none', fontWeight: 'bold' }}
            aria-label="more"
            id="long-button"
            aria-controls="long-menu"
            aria-expanded={open ? 'true' : undefined}
            aria-haspopup="true"
            onClick={handleClick}
            variant="contained"
            disabled={true}
            startIcon={<FilterListIcon />}
          >
            Filter
          </Button>
        </Box>
        <Box>
          <Button
            style={{ textTransform: 'none', fontWeight: 'bold' }}
            variant="contained"
            startIcon={<FileUploadIcon />}
            disabled={true}
          >
            Export Csv
          </Button>
        </Box> */}
        <Box >
       
        </Box>
      </Box>

      <Menu
        id="long-menu"
        MenuListProps={{
          'aria-labelledby': 'long-button',
          dense: true,
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            width: '20ch',
          },
        }}
      >
        {category.map((category) => (
          <MenuItem>
            <Checkbox
              size="small"
              checked={category.status}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
            <Typography>{category.name}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  )
}

export default FilterInventory
