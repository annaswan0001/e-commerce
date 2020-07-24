import productsTypes from './productsTypes'


export const addProductsStart = (products)=>({
    type: productsTypes.ADD_NEW_PRODUCTS_START,
    payload:products
})


export const fetchProductsStart = (products)=>({
    type: productsTypes.FETCH_PRODUCTS_START,
    payload:products
})


export const setProducts = (products)=>({
    type: productsTypes.SET_PRODUCTS,
    payload:products
})



export const deleteProductStart = (id)=>({
    type: productsTypes.DELETE_PRODUCT_START,
    payload:id
})