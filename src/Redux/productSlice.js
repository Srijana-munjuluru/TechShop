import { createSlice } from "@reduxjs/toolkit";
import productsData from "../data/productsData";

const productSlice = createSlice({
    name: "products",
    initialState:{
        products: productsData
    },
    reducers:{}
})

export default productSlice.reducer