import { StyleSheet, View, Text, Image, Pressable, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import PagerView from 'react-native-pager-view';
import { ProductContext } from '../ProductContext';

const PartialView = (props) => {
  const { product } = props;
  const { price, size, madein, quantity, _id } = product;


  const { updateCart, cart } = useContext(ProductContext);
  const getQuantity = () => {
    if (cart.length == 0) {
      return 0;
    }
    let item = cart.filter(i => i.product._id == _id);
    if (item.length > 0) {
      return item[0].quantity;
    }
    return 0;
  }

  const [number, setNumber] = useState(getQuantity());

  const onNumberChange = (isAdd) => {
    if (isAdd == true) {
      setNumber(number + 1);
    } else if (isAdd == false && number >= 1) {
      setNumber(number - 1);
    }
  }

  console.log('>>>>>>>>>>', cart);

  const onUpdateCart = () => {
    updateCart(product, number, price, true);
    ToastAndroid.show('Cập nhật giỏ hàng thành công', ToastAndroid.BOTTOM);
  }
  return (
    <>
      <View style={styles.productInfoContainer}>
        <Text style={styles.productPrice}>{price}đ</Text>
        <Text style={styles.productTitle}>Chi tiết sản phẩm</Text>
        <View style={styles.productDetail}>
          <Text style={styles.productDetailText}>Kích cỡ: {size}</Text>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productDetailText}>Xuất xứ: {madein}</Text>
        </View>
        <View style={styles.productDetail}>
          <Text style={styles.productDetailText}>Tình trạng:</Text>
          <Text style={styles.productDetailText}>còn {quantity} sp</Text>
        </View>
      </View>
      <View style={styles.cartProcessContainer}>
        <View style={styles.processQuantity}>
          <Text style={styles.quantityText}>Đã chọn {number} sản phẩm</Text>
          <View style={styles.quantityAction}>
            <Text onPress={() => onNumberChange(false)} style={styles.removeAction}>-</Text>
            <Text style={styles.quantity}>{number}</Text>
            <Text onPress={() => onNumberChange(true)} style={styles.addAction}>+</Text>
          </View>
        </View>
        <View style={styles.processTotal}>
          <Text style={styles.totalText}>Tạm tính</Text>
          <Text style={styles.total}>{number * price}đ</Text>
        </View>
      </View>
      <View style={styles.buttonContainer} >
        <Pressable onPress={onUpdateCart} style={[styles.button,
        number > 0 ? styles.changeBackgroundColor : null]}>
          <Text style={styles.buttonText}>Chọn mua</Text>
        </Pressable>
      </View>
    </>
  )
}

const Detail = (props) => {
  const { navigation, route: { params: { id } } } = props;
  const { onGetProductDetail, updateCart, cart } = useContext(ProductContext);
  const [product, setProduct] = useState(null)

  useEffect(async () => {
    const res = await onGetProductDetail(id);
    setProduct(res);
    return () => {
      res;
    };
  }, []);
  if (!product) {
    return (<></>)
  }
  const { name, images, price, size, madein, quantity, _id } = product;


  return (
    <View style={styles.container}>
      <View style={styles.productNameContainer}>
        <Text style={styles.productName}>{name}</Text>
      </View>
      <View style={styles.productImagesContainer}>
        <PagerView style={styles.productImagesPager}
          initialPage={0} orientation='horizontal' >
          {
            images.map(img =>
              <Image key={Math.random()}
                source={{ uri: img }}
                style={styles.productImage}
                resizeMode='cover' />
            )
          }
        </PagerView>
      </View>
      <PartialView product={product} />
    </View>
  );
};

export default Detail

const styles = StyleSheet.create({
  changeBackgroundColor: {
    backgroundColor: '#007537',

  },
  buttonText: {
    fontSize: 16,
    color: 'white',
    textTransform: 'uppercase'
  },
  button: {
    backgroundColor: '#ABABAB',
    borderRadius: 8,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    paddingHorizontal: 24,
    height: 45,
    marginTop: 8,
  },
  total: {
    marginTop: 5,
    textAlign: 'right',
    fontSize: 20,
  },
  processTotal: {

  },
  totalText: {
    color: 'black',
    opacity: 0.6,
  },
  addAction: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 27.5,
    height: 27.5,
    lineHeight: 20.5,
    textAlign: 'center',
    color: 'black',
  },
  removeAction: {
    borderRadius: 5,
    borderWidth: 0.5,
    width: 27.5,
    height: 27.5,
    lineHeight: 20.5,
    textAlign: 'center',
    color: 'black',
  },
  quantityAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  quantityText: {
    fontSize: 14,
    opacity: 0.6,
  },
  processQuantity: {

  },
  cartProcessContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  productDetailText: {
    color: '#3A3A3A',
    fontSize: 14,
    fontWeight: '500',
  },
  productInfoContainer: {
    paddingHorizontal: 48,
    paddingVertical: 32,
  },
  productPrice: {
    color: '#007537',
    fontSize: 24,
    fontWeight: '500',
  },
  productTitle: {
    color: '#3A3A3A',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 15,
    borderBottomColor: '#221F1F',
    borderBottomWidth: 0.5,
  },
  productDetail: {
    borderBottomColor: '#221F1F',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    marginTop: 15,
  },
  container: {
    paddingTop: 15,
    flexGrow: 1,
    backgroundColor: 'white'
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
  },
  productNameContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 55,
  },
  productImagesContainer: {
    width: '100%',
    height: 270,
  },
  productImagesPager: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
});



