import React, { useState, useEffect } from 'react'
import TextField from '@mui/material/TextField'
import inventoryApi from '../../utils/inventoryApi'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import { useHistory } from 'react-router-dom'
import { getByNameCount, getByName } from '../../actions/item'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


const filter = createFilterOptions()

const SearchInventory = ({load, item, count, store,getByNameCount,getByName,...otherProps}) => {
  const [value, setValue] = React.useState(null)
  const [open, toggleOpen] = React.useState(false)

  const [products, setProducts] = useState([''])
  const [text, setText] = useState('')
  const [suggestion, setSuggestion] = useState([''])

  let history = useHistory()

  useEffect(() => {
    const createSuggest = async () => {
      const response = await inventoryApi.get(`/query/autocomplete/${text}`)
      // console.log(response)
      setProducts(response.data)
    }
    if (text!='') {
      createSuggest()
    }
  }, [text])

  const onChange = (event, value) => {
    setText(value)
  }

  const handleChange = async(store,keyword,getByNameCount,getByName) => {

    var getId
    var session_url = `/query/find/${store}/${keyword}/all/false/none/0/1/en`;

    try {

      const res = await inventoryApi.get(session_url)

      getByNameCount(store,keyword)

      getByName(store, 0, 5,keyword)

      //get id for specific item
      // getId = res.data.products[0]._id;
      // console.log(res.data)
      // history.push(`/editProduct/${getId}`)

    } catch (err) {
      console.log(err)
    }

    
    console.log(keyword)
  }

  return (
    <React.Fragment>
      <Autocomplete
        onChange={(event, selectedValue) => handleChange(store,selectedValue,getByNameCount,getByName)} 
        style={{ width: '90%' }}
        size="small"
        freeSolo
        id="free-solo-2-demo"
        disableClearable
        onInputChange={onChange}
        options={products.map((option) => option)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search Product"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
           
          />

        )}
      />
    </React.Fragment>
  )
}


SearchInventory.propTypes = {
  getByNameCount: PropTypes.func.isRequired,
  getByName: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  item: PropTypes.object.isRequired,
  load: PropTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  load: state.item.loading,
  count: state.item.count,
  item: state.item,
  store: state.auth.user.currentStore,
})

export default connect(mapStateToProps, { getByNameCount, getByName })(SearchInventory)
