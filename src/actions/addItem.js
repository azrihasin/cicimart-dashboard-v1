import inventoryApi from '../utils/inventoryApi'
import {
  ADD_PRODUCTDESC,
  ADD_PRODUCTDETAIL,
  ADD_PRODUCTFAIL,
  ADD_PRODUCTINFO,
  ADD_PRODUCTSUCCESS,
  ADD_PROD_IMG_FAIL,
  ADD_PROD_IMG_SUCCESS,
  ADD_PROD_EXTRA_IMG_FAIL,
  ADD_PROD_EXTRA_IMG_SUCCESS,
} from './types'

//AddProductInfo
export const addProductInfo = (data) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCTINFO,
    payload: data,
  })

  // alert(JSON.stringify(data))
}

export const addProductDesc = (data) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCTDESC,
    payload: data,
  })

  // alert(JSON.stringify(data))
}

export const addProductDetail = (data) => async (dispatch) => {
  dispatch({
    type: ADD_PRODUCTDETAIL,
    payload: data,
  })

  // alert(JSON.stringify(data))
}

//Submit Product
export const submitProduct = (
  data,
  image,
  imageOne,
  imageTwo,
  imageThree,
) => async (dispatch) => {
  alert('SUCCESS ADD')

  console.log('data' + data)
  console.log('image' + image)

  const product = {
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
    price: parseFloat(data.price),
    discount: parseInt(data.discount),
    // rewardPoints: parseInt(data.reward),
    stock: parseInt(data.stock),
  }

  console.log(product)

  var session_url = '/product/create'

  try {
    const res = await inventoryApi.post(session_url, product)

    //SEND MAIN IMAGE

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }
      const formdata = new FormData()

      if (image[0] != null) {
        formdata.append('image', image[0])
      }

      formdata.append('productId', res.data.productId)

      console.log(image[0])

      var image_url = '/product/main-image'

      const res2 = await inventoryApi.post(image_url, formdata, config)

      console.log(res2)

      dispatch({
        type: ADD_PROD_IMG_SUCCESS,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: ADD_PROD_IMG_FAIL,
      })
    }

    //SEND EXTRA IMAGE

    try {
      const config = { headers: { 'Content-Type': 'multipart/form-data' } }

      const one = new FormData()

      var image_url = 'product/extra-image/add'

      if (imageOne[0] != null) {
        one.append('image', imageOne[0])
        one.append('productId', res.data.productId)
        const resOne = await inventoryApi.post(image_url, one, config)
        console.log(resOne)
      }

      const two = new FormData()

      if (imageTwo[0] != null) {
        two.append('image', imageTwo[0])
        two.append('productId', res.data.productId)
        const resTwo = await inventoryApi.post(image_url, two, config)
        console.log(resTwo)
      }

      const three = new FormData()

      if (imageThree[0] != null) {
        three.append('image', imageThree[0])
        three.append('productId', res.data.productId)
        const resThree = await inventoryApi.post(image_url, three, config)
        console.log(resThree)
      }

      console.log(imageOne[0])
      console.log(imageTwo[0])
      console.log(imageThree[0])

      dispatch({
        type: ADD_PROD_EXTRA_IMG_SUCCESS,
      })
    } catch (err) {
      console.log(err)
      dispatch({
        type: ADD_PROD_EXTRA_IMG_FAIL,
      })
    }

    dispatch({
      type: ADD_PRODUCTSUCCESS,
    })

    console.log(res)
  } catch (err) {
    console.log(err)
    dispatch({
      type: ADD_PRODUCTFAIL,
    })
  }
}
