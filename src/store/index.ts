/* eslint-disable import/no-cycle */
import thunk from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './Auth';
import mediaReducer from './Media';
import uploadReducer from './Upload';
import noteReducer from './Notes';
import snippetReducer from './Snippets';
import appReducer from './App';
import tempReducer from './Temp';

const middlewares = [thunk];
const rootReducer = combineReducers({
  auth: authReducer,
  media: mediaReducer,
  upload: uploadReducer,
  notes: noteReducer,
  snippets: snippetReducer,
  app: appReducer,
  temp: tempReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['temp'],
  stateReconciler: autoMergeLevel2,
};

const persistedReducer = persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).prepend(...middlewares),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
