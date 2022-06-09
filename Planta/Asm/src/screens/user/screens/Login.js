import React, {useState, useContext} from 'react'
import { StyleSheet, Text, View, Image, TextInput, Pressable,
KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native'
import { UserContext } from '../UserContext';

export const Login = (props) =>{
    const {navigation} = props;
    const { onLogin } = useContext(UserContext);

    const [email, setEmail] = useState('hoangbay.it@gmail.com');
    const [password, setPassword] = useState('123456');

    const onPressLogin = async () =>{
        const res = await onLogin(email, password);
        if (res == false){
            ToastAndroid.show('Đăng nhập không thành công',ToastAndroid.BOTTOM);
            // Alert.alert('Alert Title', 'My Alert Msg', [
            //     {
            //         text: 'Cancel',
            //         onPress: () => console.log('Cancel Pressed'),
            //         style: 'cancel',
            //     },
            //     {text: 'OK', onPress: () => console.log('OK Pressed')},
            // ]);
        }else{
            ToastAndroid.show('Đăng nhập thành công',ToastAndroid.BOTTOM);
        }
    }
    return (
        <KeyboardAvoidingView>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.container}>

                    <View style={styles.imagaContainer}>
                        <Image style={styles.image} resizeMode='cover' 
                            source={require('../../../assets/images/lua.png')}></Image>
                    </View>

                    <View style={styles.planetContainer}>
                        <Text style={styles.planText}>Seedling</Text>
                    </View>

                    <View style={styles.textSlogin}>
                        <Text style={styles.Text}>Chào mừng bạn đến với Bảy Blue</Text>
                        <Text style={styles.Text}>chuyên cung cấp cây giống sỉ lẻ tại Việt Nam</Text>
                    </View>

                    <View style={styles.textInputContainer}>
                        <TextInput 
                            value={email}
                            onChangeText={setEmail}
                            placeholder='Email'
                            style={styles.TextInput}/>
                            
                        <TextInput 
                            value={password}
                            onChangeText={setPassword}
                            placeholder='Password' 
                            style={styles.TextInput} secureTextEntry/>

                        <Pressable style={styles.button}onPress={onPressLogin}>

                            <Text
                                style={styles.login}>Đăng nhập</Text>
                        </Pressable>

                        <View style={styles.registerContainer}>
                            <Text onPress={() => navigation.navigate('Register')}
                            style={styles.register}>Đăng ký</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
        
        )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    imagaContainer:{
        width: 360,
        height: 370,
    },
    image:{
        width:'100%',
        height:'100%',
    
    },
    planetContainer:{
        justifyContent: 'center',
        alignItems:'center',
        paddingVertical: 28,
    },
    planText:{
        color: 'darkblue',
        fontWeight: '700',
        fontSize: 40,
    },
    textSlogin:{
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column',
    },
    Text:{
        fontSize: 11,
        marginVertical: 6,
    },
    textInputContainer:{
        paddingHorizontal: 32,
        marginVertical: 16, 
    },
    TextInput:{
        height: 33,
        borderBottomColor:'#ABABAB',
        borderBottomWidth:1.5,
        marginVertical: 4,
    },
    button:{
        height: 50,
        backgroundColor: '#7D7B7B',
        borderRadius: 8,
        marginTop: 16,
        justifyContent: 'center',
        alignItems:'center',
    },
    login:{
        color:'white',
    },
    register:{
        borderBottomColor: 'black',
        borderBottomWidth:1.5,
    },
    registerContainer:{
        flexDirection:'row',
        justifyContent:'center',
        paddingVertical: 4,
    }

})