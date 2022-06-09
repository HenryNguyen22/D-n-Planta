import React, {useState} from 'react'
import { StyleSheet, Text, View, TextInput,
    FlatList, Image, Pressable } from 'react-native'

const Search = (props) => {
  const {navigation} = props;

  const renderItem = ({ item }) => {
      const { images, name, price, quantity, _id } = item;
      return (
          <Pressable onPress={()=> navigation.navigate('Detail',{id:_id})}
            style={styles.product}>
              <View style={styles.productImageContainer}>
                  <Image style={styles.productImage} resizeMode='cover'
                          source={{ uri: images[0]}}/>
              </View>
              <View style={styles.productInfoContainer}>
                  <Text numberOfLines={1} style={styles.productName}>{name}</Text>
                  <Text style={styles.productPrice}>{price}đ</Text>
                  <Text style={styles.productQuantity}>Còn {quantity} sp</Text>
              </View>

          </Pressable>
      )
  }

  return (
      <View style={styles.container}>
          <View style={styles.textSearchContainer}>
              <Text style={styles.textSearch}>Tìm Kiếm</Text>
          </View>
          <View style={styles.textInputContainer}>
              <TextInput placeholder='Search' style={styles.textInput} />
              <View style={styles.searchIcon}>
                  <Image source={require('../../../assets/images/search.png')}/>
              </View>
          </View>
          <FlatList
          showsVerticalScrollIndicator={false}
              data={data}
              keyExtractor={item => item._id}
              renderItem={renderItem}
              />
      </View>
  )
}

export default Search

const styles = StyleSheet.create({
  productQuantity: {
      fontSize: 14
  },
  productPrice: {
      fontSize: 16,
      fontWeight: '500'
  },
  productName: {
      fontSize: 16,
      fontWeight: '500'
  },
  productInfoContainer: {
      marginLeft: 15
  },
  productImage :{
      width: '80%',
      height: '80%',

  },
  productImageContainer: {
      width: 77,
      height: 77,
      borderRadius: 8,
      backgroundColor: '#F6F6F6',
      alignItems: 'center',
      justifyContent: 'center'
  },
  product: {
      flexDirection: 'row',
      height: 107,
      marginTop: 20
  },
  searchIcon: {
      position: 'absolute',
      right: 0,
      top: 8
  },
  textInput: {
      width: '100%',
      height: '100%',
      borderBottomColor: '#221F1F',
      borderBottomWidth: 1.5,
      paddingRight: 25
  },
  textInputContainer: {
      //paddingHorizontal: 48,
      height: 40,
      marginTop: 4,
      position: 'relative',
      marginBottom: 20
  },
  textSearch: {
      fontSize: 16,
      fontWeight: '500',
      textTransform: 'uppercase' //chuyen thanh chu hoa
  },
  textSearchContainer: {
      justifyContent: 'center',
      alignItems: 'center'
  },
  container: {
      width: '100%',
      height: '100%',
      flexGrow: 1,
      backgroundColor: 'white',
      paddingTop: 32,
      paddingHorizontal: 48
  }
})


var data = [
  {
    "sold": 98,
    "images": [
      "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
      "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
    ],
    "_id": "61d12f0c555401c8610fb8d4",
    "name": "Cakile edentula (Bigelow) Hook. ssp. edentula var. lacustris Fernald",
    "price": 1,
    "madein": "Venezuela",
    "quantity": 3590677389,
    "category": "61d11c4b86511f0016f490ed",
    "size": "XL",
    "createdAt": "2020-12-04T13:31:47.000Z",
    "updatedAt": "2021-05-13T11:00:25.000Z"
  },
  {
    "sold": 98,
    "images": [
      "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
      "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
    ],
    "_id": "61d12f0c555401c8610fb7d4",
    "name": "Cakile edentula (Bigelow) Hook. ssp. edentula var. lacustris Fernald",
    "price": 1,
    "madein": "Venezuela",
    "quantity": 3590677389,
    "category": "61d11c4b86511f0016f490ed",
    "size": "XL",
    "createdAt": "2020-12-04T13:31:47.000Z",
    "updatedAt": "2021-05-13T11:00:25.000Z"
  },
  {
    "sold": 98,
    "images": [
      "https://2.pik.vn/20220d042675-dd62-42f8-8c56-e2e2fd51a531.jpg",
      "https://2.pik.vn/202223f29113-5f90-43a2-924f-7cdab16878e3.jpg"
    ],
    "_id": "61d12f0c555401c8610fb9d4",
    "name": "Cakile edentula (Bigelow) Hook. ssp. edentula var. lacustris Fernald",
    "price": 1,
    "madein": "Venezuela",
    "quantity": 3590677389,
    "category": "61d11c4b86511f0016f490ed",
    "size": "XL",
    "createdAt": "2020-12-04T13:31:47.000Z",
    "updatedAt": "2021-05-13T11:00:25.000Z"
  },
]
