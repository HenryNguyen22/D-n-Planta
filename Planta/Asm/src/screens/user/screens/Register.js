import React, { useState, useContext } from 'react'
import {
    StyleSheet, Text, View, Image,
    TextInput, Pressable, KeyboardAvoidingView, ScrollView, ToastAndroid
} from 'react-native'
import { UserContext } from '../UserContext';
export const Register = (props) => {
    const { navigation } = props;

    const { onRegister } = useContext(UserContext);

    const [email, setEmail] = useState('hoangbay.it@gmail.com');
    const [password, setPassword] = useState('123456');
    const [confirmPassword, setConfirmPassword] = useState('123456');
    const register = async () => {
        if (confirmPassword.trim() == password.trim()) {
            const res = await onRegister(email, password);
            if (res == false){
                ToastAndroid.show('Đăng ký không thành công', ToastAndroid.BOTTOM);
            }else{
                ToastAndroid.show('Đăng ký thành công', ToastAndroid.BOTTOM);
                navigation.goBack();
            }
        } else {
            ToastAndroid.show('Mật khẩu không trùng khớp', ToastAndroid.BOTTOM)
        }
    }
    return (
        // <KeyboardAvoidingView>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <View style={styles.container}>

                <View style={styles.clothingContainer}>
                    <Text style={styles.clothingText}>Seedling</Text>
                </View>

                <View style={styles.textSlogin}>
                    <Text style={styles.Text}>Chào mừng bạn đến với Bảy Blue</Text>
                    <Text style={styles.Text}>chuyên cung cấp cây giống sỉ lẻ tại Việt Nam</Text>
                </View>

                <View style={styles.textInputContainer}>
                    <TextInput
                        value={email} onChangeText={setEmail}
                        placeholder='Email'
                        style={styles.TextInput} />

                    <TextInput
                        value={password} onChangeText={setPassword}
                        placeholder='Password'
                        style={styles.TextInput} secureTextEntry />
                    <TextInput
                        value={confirmPassword} onChangeText={setConfirmPassword}
                        placeholder='Confirm Password'
                        style={styles.TextInput} secureTextEntry />

                    <Pressable onPress={register} style={styles.button}>
                        <Text style={styles.login}>Đăng ký</Text>
                    </Pressable>

                    <View style={styles.registerContainer}>
                        <Text onPress={() => navigation.goBack()}
                            style={styles.register}>Đăng nhập</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
        // </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        width: '100%',
        height: '100%',
    },
    imagaContainer: {
        width: 360,
        height: 370,
    },
    image: {
        width: '100%',
        height: '100%',

    },
    clothingContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 28,
        marginTop: 55,
    },
    clothingText: {
        color: 'darkblue',
        fontWeight: '700',
        fontSize: 40,
    },
    textSlogin: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    Text: {
        fontSize: 11,
        marginVertical: 6,
    },
    textInputContainer: {
        paddingHorizontal: 32,
        marginVertical: 16,
    },
    TextInput: {
        height: 33,
        borderBottomColor: '#ABABAB',
        borderBottomWidth: 1.5,
        marginVertical: 4,
    },
    button: {
        height: 50,
        backgroundColor: '#221F1F',
        borderRadius: 8,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    login: {
        color: 'white',
    },
    register: {
        borderBottomColor: 'black',
        borderBottomWidth: 1.5,
    },
    registerContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingVertical: 4,
    }

})
