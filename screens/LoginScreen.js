import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const LoginScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [hidePassword, setHidePassword] = useState(true);
    const togglePasswordVisibility = () => {
        setHidePassword(!hidePassword);
    };

    const navigation = useNavigation();
    const handleLogin = () => {
        navigation.navigate('HomeScreen');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login</Text>
            <View style={styles.inputContainer}>
                {/* <Icon name="user" size={20} color="rgba(0, 0, 0, 0.4)" style={styles.icon} /> */}
                <Image source={require('../assets/icons/user.png')}/>
                <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="Email"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />
            </View>
            <View style={styles.inputContainer}>
                {/* <Icon name="key" size={20} color="rgba(0, 0, 0, 0.4)" style={styles.icon} /> */}
                <Image source={require('../assets/icons/key.png')}/>
                <TextInput
                style={styles.input}
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                secureTextEntry={hidePassword}
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />
                <TouchableOpacity onPress={togglePasswordVisibility}>
                    <Icon name={hidePassword ? 'eye-slash' : 'eye'} size={20} color="rgba(0, 0, 0, 0.4)" />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={styles.loginBtn}
                onPress={handleLogin}
            >
                <Text style={styles.loginText}>Masuk ke Akun</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 60,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
      borderColor: 'gray',
      borderBottomWidth: 1,
    },
    icon: {
      marginRight: 10,
    },
    title: {
      textAlign: 'center',
      fontFamily: 'Poppins-Medium',
      fontSize: 20,
    },
    input: {
      height: 40,
      flex: 1,
      paddingHorizontal: 10,
    },
    loginBtn: {
        height: 35,
        width: 227,
        alignSelf: 'center',
        backgroundColor: '#A172FB',
        padding: 8,
        alignItems: 'center',
        borderRadius: 20,
        marginTop: 20
    },
    loginText: {
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontSize: 12

    }
});

export default LoginScreen;