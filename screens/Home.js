import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Image, Dimensions } from 'react-native';
import CryptoData from '../CryptoData.json';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HomeScreen = () => {
    const [asset, setAsset] = useState('');
    const [assetDisplayed, setAssetDisplayed] = useState(CryptoData.data);

    const navigation = useNavigation();
    const handleDetail = (dataDetail) => {
        navigation.navigate('DetailScreen', {data: dataDetail});
    }


    // useEffect(() => {
    //     console.log(CryptoData.data);
    // })

    const formatNumber = (num) => {
        const str = Math.floor(num).toString();
        // console.log(str);
        let formattedString = '';

        for (let i = 0; i < str.length; i++) {
            formattedString += str[i];

            if ((str.length - i - 1) % 3 === 0 && i !== str.length - 1) {
                formattedString += '.';
            }
        }
        return formattedString;
    }

    const formatVolume = (vol) => {
        const str = vol.toString();
        let formattedString = '';

        for (let i = 0; i < str.length; i++) {
            formattedString += str[i];

            if(i == 0 || i == 3) {
                formattedString+='.'
            }
        }
        return formattedString;
    }

    const filterData = (text) => {
        const filteredData = CryptoData.data.filter(item => {
            return item.symbol.toLowerCase().includes(text.toLowerCase());
        });
        setAssetDisplayed(filteredData);
    }

    const handleSearch = (text) => {
        setAsset(text);
        filterData(text);
    }


    const renderCard = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => handleDetail(item)}>
                <View 
                    style={{
                        flexDirection:'row', 
                        alignItems:'center', 
                        justifyContent: 'space-between', 
                        padding:10, 
                        marginBottom:10, 
                        borderRadius: 12, 
                        backgroundColor: 'rgba(240, 240, 240, 0.8)',
                        }}
                    >

                    <View style={{flexDirection:'row'}}>
                        <View style={{marginTop:8}}>
                            <Image source={{ uri: item.icon }} style={styles.icon} />
                        </View>
                        
                        <View style={{flexDirection:'col', marginLeft: 10}}>
                            <Text style={{fontFamily:'Poppins-Medium', fontSize:14, color:'#6E7499'}}>{item.symbol} / {item.pair}</Text>
                            <Text style={{fontFamily:'Poppins-Medium', fontSize:16, color:'#605757'}}>{item.pair} {formatNumber(item.price)}</Text>
                            <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:500, color:'#24A959'}}>Vol {formatVolume(item.vol)}</Text>
                        </View>
                    </View>

                    <View style={{borderRadius:20, width: 71, alignItems:'center', padding:2, backgroundColor: item.change.includes('-') ? '#F35242' : '#24A959'}}>
                        <Text style={{fontSize:12, fontFamily:'Poppins-Regular', color:'white'}}>{item.change.includes('-') ? item.change : '+'+item.change }%</Text>
                    </View>
                    
                </View>
            </TouchableOpacity>
        );
      };

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                onChangeText={handleSearch}
                value={asset}
                placeholder="Cari Asset"
                placeholderTextColor="rgba(0, 0, 0, 0.4)"
                />
                <Image source={require('../assets/icons/search.png')} style={styles.image}/>
            </View>

            <Image source={require('../assets/left_acc.png')} style={styles.acc_left}/>

            <View style={styles.flatListContainer}>
                
                <FlatList
                    data={assetDisplayed}
                    renderItem={renderCard}
                    keyExtractor={(item) => item.symbol}
                    contentContainerStyle={styles.cardsContainer}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                />
            </View>

            <Image source={require('../assets/right_acc.png')} style={styles.acc_right}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'col',
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingTop: windowHeight/8,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: '#DFDFDF',
        paddingHorizontal: 10
    },
    input: {
        fontFamily: 'Poppins-SemiBold',
        height: 40,
        flex: 1,
        paddingHorizontal: 10,
    },
    flatListContainer: {
        marginTop: 20,
    },
    cardsContainer: {
        width: windowWidth - windowWidth/8,
    },
    card: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        alignItems: 'center',
    },
    icon: {
        width: 33,
        height: 33,
        resizeMode: 'contain',
    },
    image: {
        width: 12,
        height: 12,
        resizeMode: 'contain',
    },
    acc_left: {
        position: 'absolute',
        left: 0,
        top: 90,
        resizeMode: 'contain',
    },
    acc_right: {
        position: 'absolute',
        right: 0,
        bottom: 40,
        resizeMode: 'contain',
        zIndex:-1
    },
});

export default HomeScreen;