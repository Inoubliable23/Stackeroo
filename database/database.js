import AsyncStorage from '@react-native-community/async-storage';

export const storeData = async (key, value) => {
	try {
		await AsyncStorage.setItem(key, value.toString());
	} catch (error) {
		console.log(error);	
	}
}

export const fetchData = async (key) => {
	let value = null;

	try {
		value = await AsyncStorage.getItem(key);
	} catch (error) {
		console.log(error);	
	}

	return value;
}