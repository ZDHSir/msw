import { combineReducers, configureStore } from '@reduxjs/toolkit'
import counterReducer from "./counter"
import userReducer from "./user"
import todolistReducer from "./todoList"
import { FLUSH, PAUSE, PERSIST, persistReducer, persistStore, PURGE, REGISTER, REHYDRATE } from 'redux-persist';
// import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
// 使用storage
import storage from 'redux-persist/lib/storage';
// 使用session
// const _sessionStorage = createWebStorage('session');

const persistConfig = {
    key: 'root',
    // storage:sessionStorage,
    storage
  };

const reducers = combineReducers({
    counter: counterReducer,
    user:    userReducer,
    todo: todolistReducer,
})

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck:{
        ignoredActions:[FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

export const persistore = persistStore(store)


// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch