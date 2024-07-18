import {configureStore} from "@reduxjs/toolkit"
import { userReducer } from "./reducer/userReducer"
import { userAPI } from "./api/userAPI"
import { productAPI } from "./api/productAPI"
import { cartReducer } from "./reducer/cartReducer"
import { orderAPI } from "./api/orderAPI"
import { dashboardAPI } from "./api/dashboardAPI"


  export const server = import.meta.env.VITE_SERVER

  export const store = configureStore({
    reducer: {
      [userAPI.reducerPath]:userAPI.reducer,
      [productAPI.reducerPath]: productAPI.reducer,
      [orderAPI.reducerPath]: orderAPI.reducer,
      [dashboardAPI.reducerPath]: dashboardAPI.reducer,
      [userReducer.name]: userReducer.reducer,
      [cartReducer.reducerPath]: cartReducer.reducer,
    },
    middleware: (mid):any => [
      ...mid(),
      userAPI.middleware,
      productAPI.middleware,
      orderAPI.middleware,
      dashboardAPI.middleware
    ]
  })

  export type RootState = ReturnType<typeof store.getState>