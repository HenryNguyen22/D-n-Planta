import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';

const CartHistory = (props) => {

  const displayDay = (day) => {
    switch (day) {
      case 0: return 'Chủ nhật';
      case 1: return 'Thứ hai';
      case 2: return 'Thứ ba';
      case 3: return 'Thứ tư';
      case 4: return 'Thứ năm';
      case 5: return 'Thứ sáu';
      case 6: return 'Thứ bảy';
      default: break;
    }
  }
  const displayTime = (time) => {
    time = new Date(time);
    const day = displayDay(time.getDay());
    const date = time.getDate() < 10 ? '0' + time.getDate() : time.getDate();
    const month = (time.getMonth() + 1) < 10 ? '0' + (time.getMonth() + 1) : (time.getMonth() + 1);
    const year = time.getFullYear();
    return `${day}, ${date}/${month}/${year}`;
  }

  const renderItem = ({ item }) => {
    const { createdAt, total, products, status } = item;
    return (
      <View style={styles.cartItemContainer}>
        <Text style={styles.date}>{displayTime(createdAt)}</Text>
        <Text style={styles.status}>Trạng thái: {status}</Text>
        <Text style={styles.products}>Tổng sản phẩm: {products.length}</Text>
        <Text style={styles.total}>Tổng tiền: {total}</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Lịch sử giao dịch</Text>
      <FlatList
        data={data}
        keyExtractor={item => Math.random()}
        renderItem={renderItem}
      />
    </View>
  );
};

export default CartHistory;

const styles = StyleSheet.create({
  total: {
    color: '#000',
    fontSize: 14,
  },
  products: {
    color: '#000',
    fontSize: 14,
  },
  status: {
    color: '#007537',
    fontSize: 16,
  },
  date: {
    color: '#221F1F',
    fontSize: 16,
    borderBottomColor: '#7D7B7B',
    borderBottomWidth: 0.5,
  },
  cartItemContainer: {
    marginTop: 16,
  },
  title: {
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 16,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingTop: 32,
    paddingHorizontal: 32,
    position: 'relative',
    alignItems: 'center'
  },
});

var data = [
  {
    "_id": "61fe19a5ba43860016d3c281",
    "user": "61eae55ada32720016356d66",
    "status": "Đã giao hàng",
    "total": 13,
    "products": [
      {
        "_id": "61fe19a5ba43860016d3c282",
        "product": "61d12f0c555401c8610fb8d1",
        "quantity": 2,
        "price": 1
      },
      {
        "_id": "61fe19a5ba43860016d3c283",
        "product": "61d12f0c555401c8610fb8d2",
        "quantity": 2,
        "price": 1
      },
      {
        "_id": "61fe19a5ba43860016d3c284",
        "product": "61d12f0c555401c8610fb8d3",
        "quantity": 3,
        "price": 3
      }
    ],
    "createdAt": "2022-12-08T06:31:01.277Z",
    "updatedAt": "2022-02-05T06:41:01.302Z"
  },
  {
    "_id": "61fe26acba43860016d3c2da",
    "user": "61eae55ada32720016356d66",
    "status": "Đang xử lý",
    "total": 13,
    "products": [
      {
        "_id": "61fe26acba43860016d3c2db",
        "product": "61d12f0c555401c8610fb8d1",
        "quantity": 2,
        "price": 1
      },
      {
        "_id": "61fe26acba43860016d3c2dc",
        "product": "61d12f0c555401c8610fb8d2",
        "quantity": 2,
        "price": 1
      },
      {
        "_id": "61fe26acba43860016d3c2dd",
        "product": "61d12f0c555401c8610fb8d3",
        "quantity": 3,
        "price": 3
      }
    ],
    "createdAt": "2022-02-05T07:26:36.441Z",
    "updatedAt": "2022-02-05T07:26:36.441Z"
  }
]
