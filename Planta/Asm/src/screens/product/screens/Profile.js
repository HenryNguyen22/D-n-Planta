import React from 'react'
import { StyleSheet, Text, View, Pressable, Image } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';

const Profile = (props) => {
  const {navigation} = props;
  const {_id, name, address, phone, avatar, dob, email} = data;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.infoContainer}>
        <View style={styles.avatarContainer} >
          {
            avatar.trim().length == 0 ?
              <FontAwesome name="user-circle-o" size={24} color="black" />
              :
              <Image source={{uri: avatar}} resizeMode='cover' 
                style={styles.avatar}/>
          }
        </View>
        <View style={styles.nameContainer}>
          <Text numberOfLines={1} style={styles.name}>{name}</Text>
          <Text numberOfLines={1} style={styles.email}>{email}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>
        <Text style={styles.actionTitle}>Chung</Text>
        <Text onPress={() => navigation.navigate('EditProfile')} style={styles.action}>Chỉnh sửa thông tin</Text>
        <Text onPress={() => navigation.navigate('CartHistory')} style={styles.action}>Lịch sử giao dịch</Text>
        <Text style={styles.actionTitle}>Ứng dụng</Text>
        <Text style={[styles.action,styles.logout]}>Đăng xuất</Text>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  logout:{
    color: '#FF0000',
  },
  action:{
    marginTop:15,
  },
  actionTitle:{
    color: '#7F7F7F',
    fontSize:16,
    
    borderBottomColor:'#ABABAB',
    borderBottomWidth:1,
    marginTop:15,
  },
  actionContainer:{
    marginTop:32,
  },
  email:{
    fontSize:14,
    color:'#7F7F7F',
  },
  name:{
    fontSize: 16,
  },
  nameContainer:{
    marginLeft: 26,
  },
  avatar:{
    width: '80%',
    height: '80%',
    borderRadius:20,
  },
  avatarContainer:{
    justifyContent: 'center',
    alignItems:'center',
    width: 39,
    height:39,
    backgroundColor:'grey',
    borderRadius:20,
  },
  infoContainer:{
    flexDirection: 'row',
    // justifyContent:'space-between',
    marginTop: 15,
    alignItems:'center',
  },
  title:{
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  container:{
    flex: 1,
    backgroundColor:'white',
    paddingTop: 32,
    paddingHorizontal: 48,
  }
});

var data = {
  _id: "61f13df3ecaf5700164ee2f5",
  name: "Hoàng Văn Bảy",
  address:"Thôn 3, Phúc Khê",
  phone: "0866767929",
  avatar: "https://2.pik.vn/20222e338502-e5ca-4b7c-9fa8-78dcd9b1004d.jpg",
  dob: "2022-01-26T12:26:27.864Z",
  email: "hoangbay.it@gmail.com",
  createdAt: "2022-01-26T12:26:27.881Z",
  updatedAt: "2022-01-26T12:26:27.881Z",
}