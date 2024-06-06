import { configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

import authSlice from './features/authSlice'
import userSlice from './features/userSlice'

const persistConfig = {
  key: 'ananas',
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authSlice)
const persistedUserReducer = persistReducer(persistConfig, userSlice)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    user: persistedUserReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    })
})

export const persistor = persistStore(store)