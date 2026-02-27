import {configureStore} from '@reduxjs/toolkit'

import {requestsSlice} from './slices/requestsSlice'

export const store = configureStore({
  reducer: {
    requests: requestsSlice.reducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
