import React, { useState, createContext } from 'react';

import { getProductForHomePage, getProductDetail, saveCart,search } from './ProductService';

export const ProductContext = createContext();
export const ProductContextProvider = (props) => {
    const { children } = props;
    const [cart, setCart] = useState([]);
    const onGetProductForHomePage = async () => {
        try {
            const res = await getProductForHomePage();
            if (res.error == false) {
                return res.data;
            }
        } catch (error) {
            console.log('onGetProductForHome error:', error);
        }
        return [];
    }
    const onGetProductDetail = async (id) => {
        try {
            const res = await getProductDetail(id);
            if (res.error == false) {
                return res.data;
            }
        } catch (error) {
            console.log('onGetProductDetail error:', error)
        }
        return null;
    }

    const updateCart = (product, quantity, price, checked) => {
        let _cart = cart;
        if (_cart.length == 0) {
            // ko có sp
            _cart.push({ product, quantity, price, checked });
        } else {
            //co sp
            let items = _cart.filter(item => item.product._id == product._id);
            if (items.length == 0) {
                //không có
                _cart.push({ product, quantity, price, checked });
            } else {
                //có sp
                if(quantity <= 0){
                    //xóa sản phẩm
                    _cart = _cart.filter(item => item.product._id != product._id);
                }else{
                    //cập nhật số lượng
                    _cart = _cart.map(item => {
                        if (item.product._id == product._id) {
                            item.quantity = quantity > 3 ? 3 : quantity;
                            item.checked = checked;
                        }
                        return item;
                    });
                }

            }
        }
        setCart([..._cart]);
    }
    // const getCart = () => cart;
    // const clearCart = () => setCart([]);
    // const setCart = () => setCart([]);
    const onSaveCart = async () => {
        try {
            let total = 0;
            let products = [];
            for (let index = 0; index < cart.length; index++) {
              const element = cart[index];
              total += element.quantity * element.price;
              products.push({
                  product: element.product._id,
                  price: element.price,
                  quantity: element.quantity
              })
            }
            await saveCart({total, products});
            setCart([...[]]);
        } catch (error) {
            console.log('onSaveCart error: ', error);
        }
    }
    const onSearch = async (keyword) => {
        try {
            const res = await search(keyword);
            if (res.error == false){
                return res.data;
            }
        } catch (error) {
            console.log('onSearch error:', error);
        }
        return [] ;
    }
    return (
        <ProductContext.Provider
            value={{
                cart, onSaveCart,onSearch,
                onGetProductForHomePage, onGetProductDetail, updateCart
            }}>
            {children}
        </ProductContext.Provider>
    );
};