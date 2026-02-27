import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

import {getRequestList} from '../../api'
import type {RequestListItem} from '../../types/api'

export type RequestWithId = RequestListItem & {_id: string}

function withIds(list: RequestListItem[]): RequestWithId[] {
  return list.map((item, i) => ({
    ...item,
    _id: typeof item.reference_no === 'string' ? item.reference_no : `item-${i}`,
  }))
}

type RequestsState = {
  items: RequestWithId[]
  selectedId: string | null
  loading: boolean
  error: string | null
}

export const fetchRequestList = createAsyncThunk('requests/fetchList', async (_, {rejectWithValue}) => {
  try {
    const list = await getRequestList()
    return list
  } catch (err) {
    return rejectWithValue(err instanceof Error ? err.message : String(err))
  }
})

const initialState: RequestsState = {
  items: [],
  selectedId: null,
  loading: false,
  error: null,
}

export const requestsSlice = createSlice({
  name: 'requests',
  initialState,
  reducers: {
    setRequests(state, action: {payload: RequestListItem[]}) {
      state.items = withIds(action.payload)
      state.error = null
    },
    setSelectedId(state, action: {payload: string | null}) {
      state.selectedId = action.payload
    },
    setLoading(state, action: {payload: boolean}) {
      state.loading = action.payload
    },
    setError(state, action: {payload: string | null}) {
      state.error = action.payload
    },
    updateRequestPurpose(state, action: {payload: {id: string; purpose: string}}) {
      const item = state.items.find(it => it._id === action.payload.id)
      if (item) item.purpose = action.payload.purpose
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchRequestList.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRequestList.fulfilled, (state, action) => {
        state.loading = false
        state.items = withIds(action.payload)
        state.error = null
      })
      .addCase(fetchRequestList.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const {setRequests, setSelectedId, setLoading, setError, updateRequestPurpose} = requestsSlice.actions
