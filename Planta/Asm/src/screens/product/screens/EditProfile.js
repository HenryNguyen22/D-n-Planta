import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditProfile = (props) => {
  const {navigation} = props;
  const {_id, name, address, phone, avatar, dob, email} = data;

  const [fullname,setFullname] = useState(name);
  const [location, setLocation] = useState(address);
  const [mobile, setMobile] =useState(phone);
  const [birthday, setBirthday] =useState(dob);

  const [showDatetimePicker, setshowDatetimPicker] = useState(false);
  const displayTime = (time) => {
    time = new Date(time);
    return time.getDate() + '/' + (time.getMonth() +  1) +'/' + time.getFullYear();
  }
  const onChangeDatetime = (event, selectedDate) =>{
    const currentDate = selectedDate || birthday;
    setshowDatetimPicker(false);
    setBirthday(currentDate);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Chỉnh sửa thông tin</Text>
      <Text style={styles.instruction}>Thông tin sẽ được lưu cho lần mua kế tiếp.</Text>
      <Text style={styles.instruction}>Bấm vào thông tin chi tiết để chỉnh sửa.</Text>
      <View style={styles.formContainer}>
        <TextInput value={fullname} onChangText={setFullname} style={styles.inputText} ></TextInput>
        <TextInput value={location} onChangText={setLocation} style={styles.inputText} ></TextInput>
        <TextInput value={mobile} onChangText={setMobile} style={styles.inputText} ></TextInput>
        <TextInput value={displayTime(birthday)} 
          onPressIn={() => setshowDatetimPicker(true)} style={styles.inputText} ></TextInput>
      </View>
      <Pressable style={styles.buttonContainer}>
        <Text style={styles.save}>Lưu thông tin</Text>
      </Pressable>
      {showDatetimePicker &&(
        <DateTimePicker
          testID="dateTimePicker"
          value={new Date(birthday)}
          mode={'date'}
          is24Hour={true}
          display="default"
          onChange={onChangeDatetime}
          />
      )}
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  save:{
    color:'white',
    textTransform:'uppercase'
  },
  buttonContainer:{
    position:'absolute',
    bottom: 0,
    height: 50,
    backgroundColor:'#007537',
    borderRadius:8,
    width:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  inputText:{
    height:40,
    borderBottomColor:'#ABABAB',
    borderBottomWidth:0.5,
    fontSize:14,
    color:'#7D7B7B'
  },
  formContainer:{
    marginTop: 60,
    width:'100%',
  },
  instruction:{
    color:'#221F1F',
    fontSize:10,
    alignSelf:'flex-start',

  },
  title:{
    fontSize: 16,
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom:16,
  },
  container:{
    flex: 1,
    backgroundColor:'white',
    paddingTop: 32,
    paddingHorizontal: 48,
    position:'relative',
    alignItems:'center'
  },
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
