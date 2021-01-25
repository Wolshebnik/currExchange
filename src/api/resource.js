import axios from 'axios';
import { getFiveDay } from '../redux/utils';

export const getData = async () => {
	try{
		const { data } = await axios.get( 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json' );
		return data;
	}catch (error){
		console.log(error);
	}
};

export const getDataWithDate = async ( date ) => {
	try{
		const { data } = await axios.get( `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&date=${ date }` );
		return data;
	}catch (error){
		console.log(error);
	}
};

export const getFiveLast = async () => {
	try{
		return await Promise.all( getFiveDay() )
	}catch (error){
		console.log(error);
	}
};
