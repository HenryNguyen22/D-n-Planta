import React, { useState, useContext, useEffect } from 'react'
import {
  StyleSheet, Text, View, Image, Pressable,
  FlatList, Dimensions, Modal, ToastAndroid
} from 'react-native'
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { ProductContext } from '../ProductContext';
const CartItems = (props) => {
  const { cart, updateCart } = props;
  const renderItem = ({ item }) => {
    const { product, quantity, price, checked } = item;
    return (
      <View style={styles.itemContainer}>
        {/* <View style={styles.checkedContainer}>
          {
            checked == true ?
              <FontAwesome name="check-square" size={24} colors='black' />
              :
              <FontAwesome name="square-o" size={24} colors='black' />
          }
        </View> */}
        <View style={styles.imageContainer}>
          <Image style={styles.image} resizeMode='cover'
            source={{ uri: product.images[0] }} />
        </View>
        <View style={styles.infoContainer}>
          <View>
            <Text>{product.name}</Text>
          </View>
          <View>
            <Text style={styles.price}>{product.price}đ</Text>
          </View>
          <View style={styles.quantityAction}>
            <Text 
              onPress={() => updateCart(product, quantity - 1 , price, true)}
              style={styles.removeAction}>-</Text>
            <Text style={styles.quantity}>{quantity}</Text>
            <Text 
              onPress={() => updateCart(product, quantity + 1, price, true)}
              style={styles.addAction}>+</Text>
            <Text style={styles.deleteAction}>Xóa</Text>
          </View>
        </View>
      </View>
    )
  }
  return (
    <FlatList
      data={cart}
      renderItem={renderItem}
      style={styles.flatListContainer}
      keyExtractor={item => Math.random()}
      showsVerticalScrollIndicator={false}
    />
  )
}

const CheckoutModal = (props) => {
  const { isShowModal, setIsShowModal } = props;
  const {onSaveCart} = useContext(ProductContext);
  
  const onCheckout = async () => {
    await onSaveCart();
    ToastAndroid.show('Thanh toán thành công', ToastAndroid.BOTTOM);
    setIsShowModal(false);
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.checkout}>Xác nhận thanh toán?</Text>
          <Pressable onPress={onCheckout} style={styles.checkoutButton}>
            <Text style={styles.checkoutText}>Đồng ý</Text>
          </Pressable>
          <Text onPress={() => setIsShowModal(false)} style={styles.cancel}>Hủy bỏ</Text>
        </View>
      </View>
    </Modal>
  )
}
const DeteleModal = (props) => {
  // const {clearCart} = useContext(ProductContext);
  const {clearCart} = useContext(ProductContext);
  const { isShowDeteleModal, setIsShowDeteleModal } = props;
  const onDeleteCart = () =>{
    setIsShowDeteleModal(false);
    // clearCart();
    // // setCart([...[]]);
    // setData([...[]]);
  }
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isShowDeteleModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <Text style={styles.checkout}>Xác nhận xóa tất cả đơn hàng?</Text>
          <Pressable style={styles.checkoutButton}>
            <Text onPress={onDeleteCart} style={styles.checkoutText}>Đồng ý</Text>
          </Pressable>
          <Text onPress={() => setIsShowDeteleModal(false)} style={styles.cancel}>Hủy bỏ</Text>
        </View>
      </View>
    </Modal>
  )
}

const Cart = (props) => {
  const { navigation } = props;
  
  const { updateCart, cart } = useContext(ProductContext);
  // const [data, setData] = useState([...cart]);
  // useEffect(() => {
  //   setData([]);
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     const res = getCart();
  //     setData([...res]);
  //   });
  //   return unsubscribe;
  // }, [navigation]);

  // console.log('>>>>>>>>', getCart().length);

  const [isShowModal, setIsShowModal] = useState(false);
  const [isShowDeteleModal, setIsShowDeteleModal] = useState(false);

  const isShowCheckout = () => {
    const items = cart.filter(item => item.checked == true) || [];
    let total = 0;
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      total += element.quantity * element.price;
    }
    return { isShown: items.length > 0, total: total };
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Giỏ hàng</Text>
        <FontAwesome onPress={() => setIsShowDeteleModal(true)}
          style={styles.trash} name="trash-o" size={24} color="black" />
      </View>
      <View>
        {
          cart.length == 0 ?
            <View style={styles.emptyContainer}>
              <Text style={styles.empty}>Giỏ hàng của bạn đang trống</Text>
            </View> :
            <CartItems updateCart={updateCart} cart={cart} />
        }
      </View>
      <View style={styles.checkoutContainer}>
        {
          isShowCheckout().isShown == true ?
            <>
              <View style={styles.totalContainer}>
                <Text style={styles.totalText}>Tạm tính</Text>
                <Text>{isShowCheckout().total}đ</Text>
              </View>
              <Pressable onPress={() => setIsShowModal(true)} style={styles.buttonContainer}>
                <Text style={styles.buttonText}>Tiến hành thanh toán</Text>
                <MaterialIcons name="keyboard-arrow-right" size={24} color="white" />
              </Pressable>
            </> : <></>
        }
      </View>
      <CheckoutModal isShowModal={isShowModal} setIsShowModal={setIsShowModal} />
      <DeteleModal isShowDeteleModal={isShowDeteleModal}
        setIsShowDeteleModal={setIsShowDeteleModal} />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  cancel: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    marginTop: 8,
  },
  checkoutText: {
    color: 'white',
  },
  checkoutButton: {
    backgroundColor: '#007537',
    height: 50,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  checkout: {
    color: '#252A31',
    fontSize: 13,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: 200,
  },
  flatListContainer: {
    maxHeight: Dimensions.get('window').height - 170,
  },
  buttonText: {
    color: 'white',
  },
  totalText: {
    opacity: 0.6,
  },
  buttonContainer: {
    height: 50,
    backgroundColor: '#007537',
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    marginTop: 16,
    width: '100%',
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  checkoutContainer: {
    paddingHorizontal: 28,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  trash: {
    position: 'absolute',
    right: 24,

  },
  deleteAction: {
    borderBottomColor: 'black',
    borderBottomWidth: 1,
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
  },
  price: {
    fontSize: 16,
    color: '#007537'
  },
  image: {
    width: '80%',
    height: '80%',
  },
  infoContainer: {
    marginLeft: 1,
  },
  imageContainer: {
    width: 77,
    height: 77,
    borderRadius: 8,
    marginLeft: 15,
  },
  checkedContainer: {
    width: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 24,
    paddingHorizontal: 24,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
  },
  title: {
    fontSize: 16,
    textTransform: 'uppercase',

  },
  titleContainer: {
    alignItems: 'center',
    alignContent: 'center',
    position: 'relative',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
    position: 'relative',
  }
});

// var data = [
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb8d2",
//       "name": "Geranium dissectum L.",
//       "price": 1,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 82,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 5,
//     price: 1,
//     checked: true,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb7d2",
//       "name": "Geranium dissectum L.",
//       "price": 2,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 81,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 6,
//     price: 2,
//     checked: true,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb6d2",
//       "name": "Geranium dissectum L.",
//       "price": 3,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 80,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 7,
//     price: 3,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb5d2",
//       "name": "Geranium dissectum L.",
//       "price": 4,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 79,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 8,
//     price: 4,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb4d2",
//       "name": "Geranium dissectum L.",
//       "price": 5,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 78,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 9,
//     price: 5,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb3d2",
//       "name": "Geranium dissectum L.",
//       "price": 6,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 77,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 10,
//     price: 6,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb2d2",
//       "name": "Geranium dissectum L.",
//       "price": 7,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 76,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 11,
//     price: 7,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb1d2",
//       "name": "Geranium dissectum L.",
//       "price": 8,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 75,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 12,
//     price: 8,
//     checked: false,
//   },
//   {
//     product: {
//       "_id": "61d12f0c555401c8610fb0d2",
//       "name": "Geranium dissectum L.",
//       "price": 9,
//       "madein": "Việt Nam",
//       "quantity": 2022,
//       "category": "61d11c4b86511f0016f490ed",
//       "images": [
//         "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
//         "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
//       ],
//       "sold": 74,
//       "size": "3XL",
//       "createdAt": "2021-07-25T08:56:22.000Z",
//       "updatedAt": "2021-08-21T13:12:26.000Z"
//     },
//     quantity: 13,
//     price: 9,
//     checked: false,
//   },
// ]
