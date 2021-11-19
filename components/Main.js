import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, StyleSheet, Text, Animated } from 'react-native';
import { Image } from 'react-native-animatable';
import { Appbar, List } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const ITEM_SIZE = 108;
const App = ({ navigation }) => {
  const [data, setdata] = useState([]);
  const url = 'https://api.coingecko.com/api/v3/exchange_rates';
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await Axios.get(url);

        const data = await res.data.rates;

        return setdata(data);
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  }, [data]);

  var array = [];
  for (let prop in data) {
    data[prop]['key'] = Math.random().toString();
    array.push(data[prop]);
  }
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <Appbar style={{ backgroundColor: '#521215' }}>
        <Appbar.Content title="Currency" titleStyle={{ fontSize: 25 }} />
      </Appbar>
      <View style={{ flex: 1 }}>
        <Image
          source={require('../assets/blue.jpg')}
          style={StyleSheet.absoluteFillObject}
          blurRadius={80}
        />
        <Animated.FlatList
          data={array}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          renderItem={({ item, index }) => {
            const inputRange = [
              -1,
              0,
              ITEM_SIZE * index,
              ITEM_SIZE * (index + 2),
            ];
            const scale = scrollY.interpolate({
              inputRange,
              outputRange: [1, 1, 1, 0],
            });
            return (
              <Animated.View style={{ transform: [{ scale }] }}>
                <List.Item
                  style={styles.item}
                  title={item.name}
                  keyExtractor={(item) => item.key.toString()}
                  description={() => (
                    <View style={{ flexDirection: 'row', margin: 5 }}>
                      <MaterialCommunityIcons
                        size={20}
                        name="circle-slice-8"
                        color="red"
                      />
                      <Text style={{ marginLeft: 5, marginRight: 5 }}>
                        {item.type}
                      </Text>

                      <MaterialCommunityIcons
                        size={20}
                        name="cash"
                        color="blue"
                      />
                      <Text style={{ marginLeft: 5, marginRight: 5 }}>
                        {item.value} {item.unit}
                      </Text>
                    </View>
                  )}
                  titleStyle={{ fontSize: 22, marginLeft: 10 }}
                />
              </Animated.View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    padding: 1,
    backgroundColor: 'white',
    margin: 13,
    marginBottom: 5,
    borderRadius: 7,
    elevation: 3,
    minHeight: 90,
  },
  title: {
    fontSize: 30,
  },
});

export default App;
