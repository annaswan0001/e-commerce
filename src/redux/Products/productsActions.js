import productsTypes from './productsTypes'


export const addProductsStart = (products)=>({
    type: productsTypes.ADD_NEW_PRODUCTS_START,
    payload:products
})


export const fetchProductsStart = ()=>({
    type: productsTypes.FETCH_PRODUCTS_START,
    
})


export const setProducts = (products)=>({
    type: productsTypes.SET_PRODUCTS,
    payload:products
})



export const deleteProductStart = (id)=>({
    type: productsTypes.DELETE_PRODUCT_START,
    payload:id
})


//1 product
export const fetchProductStart = (id)=>({
    type: productsTypes.FETCH_PRODUCT_START,
    payload:id
    
})

export const setProduct = (product)=>({
    type: productsTypes.SET_PRODUCT,
    payload:product
})