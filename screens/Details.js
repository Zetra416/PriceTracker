import React, {useEffect} from "react";
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Svg, { Line, Rect, G } from 'react-native-svg';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DetailScreen = ({ route, navigation }) => {
    const { data } = route.params;
    const timeIntervals = ['1m', '5m', '15m', '1H', '4H', '1D', '1W', '1M'];

    const generateRandomCandlestickData = (numberOfDataPoints) => {
        const candlestickData = [];
        let prevClose = Math.floor(Math.random() * 100 - 50);
        const priceFluctuation = 100; // Maximum fluctuation amount
      
        for (let i = 0; i < numberOfDataPoints; i++) {
          const open = prevClose; // Open price is the previous close
          const close = open + (Math.random() > 0.5 ? -1 : 1) * Math.floor(Math.random() * priceFluctuation); // Random close price with +/- fluctuation
          const high = Math.max(open, close) + Math.floor(Math.random() * priceFluctuation);
          const low = Math.min(open, close) - Math.floor(Math.random() * priceFluctuation);
          candlestickData.push({ open, high, low, close });
          prevClose = close; // Update the previous close for the next iteration
        }
        return candlestickData;
      };
      
    const randomCandlestickData = generateRandomCandlestickData(50)
    const candleWidth = 10;

    const chartHeight = 100;
    const chartWidth = randomCandlestickData.length * 20;
    

    const chartElements = randomCandlestickData.map((data, index) => {
        const candleHeight = Math.abs(data.close - data.open);
        const yPos = Math.min(data.open, data.close);
        const strokeColor = data.close > data.open ? 'green' : 'red';
    
        return (
          <G key={index}>
            <Line
              x1={index * 15 + candleWidth / 2}
              y1={chartHeight - data.high}
              x2={index * 15 + candleWidth / 2}
              y2={chartHeight - data.low}
              stroke={strokeColor}
              strokeWidth="1"
            />
            <Rect
              x={index * 15}
              y={chartHeight - yPos - candleHeight}
              width={candleWidth}
              height={candleHeight- 20}
              fill={strokeColor}
            />
          </G>
        );
      });

    useEffect(() => {
        console.log('data : ', data);
    })

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                    <Icon name="arrow-left" size={25} color="rgba(0, 0, 0, 0.4)" />
                </TouchableOpacity>
                <Image source={{ uri: data.icon }} style={{width:25, height:25, marginLeft:20}} />
                <Text style={{marginLeft:10}}>{data.symbol} / {data.pair}</Text>
                <View style={{borderRadius:5, width: 71, marginLeft: 20, alignItems:'center', padding:2, backgroundColor: data.change.includes('-') ? '#F35242' : '#24A959'}}>
                    <Text style={{fontSize:12, fontFamily:'Poppins-Regular', color:'white'}}>{data.change.includes('-') ? data.change : '+'+data.change }%</Text>
                </View>
            </View>

            <View style={{width:windowWidth - windowWidth/10, flexDirection: 'row', justifyContent: "space-between", borderRadius:10, backgroundColor: '#3e3b5c', padding:10, marginVertical:20}}>
                <View>
                    <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:700, color:'white'}}>Last Price</Text>
                    <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:600, color:'white'}}>{data.price}</Text>
                    <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:600, color:'white'}}><Text style={{fontWeight:700}}>Vol </Text> {data.vol}</Text>
                </View>

                <View>
                    <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:600, color:'white'}}><Text style={{fontWeight:700}}>High </Text>{data.high}</Text>
                    <Text style={{fontFamily:'Roboto', fontSize:12, fontWeight:600, color:'white'}}><Text style={{fontWeight:700}}>Low </Text>{data.low}</Text>
                </View>
            </View>

            <View style={styles.timeIntervalContainer}>
                {timeIntervals.map((interval, index) => (
                    <TouchableOpacity style={{marginHorizontal:4}}>
                        <Text key={index} style={styles.timeIntervalText}>
                            {interval}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.chartContainer}>
                <Svg height={windowHeight/2} width={chartWidth} style={{margin:10}}>
                    {chartElements}
                </Svg>
            </View>
           

            <View style={styles.transBtn}>
                <TouchableOpacity style={{backgroundColor: '#2abf63', padding:20, borderRadius:10, width:windowWidth/2.4 }}>
                    <Text style={{fontFamily: "Roboto", fontWeight:600, fontSize:24, textAlign: 'center', color: 'white', paddingVertical:10}}>BUY</Text>
                </TouchableOpacity>
                
                <TouchableOpacity style={{backgroundColor: '#e33446', padding:20, borderRadius:10, width:windowWidth/2.4 }}>
                    <Text style={{fontFamily: "Roboto", fontWeight:600, fontSize:24, textAlign: 'center', color:'white', paddingVertical:10}}>SELL</Text>
                </TouchableOpacity>
            </View>
           
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: windowHeight/8,
    },
    header: {
        flexDirection: 'row',
        position: 'absolute',
        top: 60, 
        left: 20, 
        alignItems:'center'

    },
    backButton: {
        position: 'absolute',
        top: 60, 
        left: 20, 
        zIndex: 1,
    },
    chartContainer: {
        height: windowHeight/2,
        borderWidth:4,
        borderColor: '#d1d1d1',
        margin:10,
        padding: 20,
        width: windowWidth/1.10,
        borderRadius:10,
        position: "center",
        justifyContent: "center",
        backgroundColor: "#1c1c1c",
        overflow: "hidden"
    },
    timeIntervalContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    timeIntervalText: {
        backgroundColor: '#565659',
        color: 'white',
        paddingHorizontal: 8,
        paddingVertical: 2,
        fontSize: 12,
        fontFamily: 'Roboto',
        fontWeight: '500',
        borderRadius: 5,
    },
    transBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around', 
        width: windowWidth - windowWidth / 10, 
        marginHorizontal: 10,
        marginTop: 20,
    },
});

export default DetailScreen;
