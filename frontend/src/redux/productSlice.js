import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
    products: [],
    loading: false,

}
export const getProducts = createAsyncThunk(
    'products',
    async () => {
        const response = await fetch(`http://localhost:4000/products`)
        return (await response.json());
    },
)

export const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getProducts.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload
        })
    }
})


export const { } = productSlice.actions

export default productSlice.reducer