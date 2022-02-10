import {
  GET_COUNT,
  GET_ITEM,
  GET_COUNT_FAIL,
  GET_ITEM_FAIL,
  GET_DRAFT_COUNT,
  GET_DRAFT_COUNT_FAIL,
  GET_DRAFT,
  GET_DRAFT_FAIL,
} from '../actions/types'

const initialState = {
  count: 0,
  loading: true,
  products: [],
  draftCount:0,
  drafts: [],
}

function itemReducer(state = initialState, action) {
  const { type, payload } = action

  switch (type) {
    case GET_COUNT:
      return {
        ...state,
        loading: false,
        count: payload.count,
      }
    case GET_ITEM:
      // console.log(payload)
      return {
        ...state,
        loading: false,
        products: payload,
      }
      case GET_DRAFT_COUNT:
        return {
          ...state,
        loading: false,
        draftCount: payload.count,
        }
      case GET_DRAFT:
        return {
          ...state,
        loading: false,
        drafts: payload,
        draftCount: payload.length,
        }
    case GET_COUNT_FAIL:
    case GET_ITEM_FAIL:
    case GET_DRAFT_COUNT_FAIL:
    case GET_DRAFT_FAIL:

    default:
      return state
  }
}

export default itemReducer
