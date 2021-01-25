import axios from 'axios';

let day = new Date();

export const getDateForCalendar = () => {
	return day.toISOString().substr( 0, 10 );
};

export const getLocalData = () => {
	return day.toLocaleDateString();
};


export const handleSelectedRow = ( state, id ) => {
	let selectedRow = [];
	const tableWithSelect = state.table.map( row => row.r030 === id ? { ...row, select: !row.select } : row );

	const selectedFavoriteCurrency = state.favoriteCurrency.findIndex( row => row.r030 === id );

	if (selectedFavoriteCurrency === -1) {
		selectedRow = [ ...state.favoriteCurrency, tableWithSelect.find( row => row.r030 === id ) ];
	} else {
		selectedRow = state.favoriteCurrency.filter( row => row.r030 !== id );
	}

	return { table: tableWithSelect, favoriteCurrency: selectedRow };
};


export const currencyAccount = ( state, action ) => {
	if (action.payload === '') {
		return { leftInput: '', rightInput: '' };
	}
	const data = Math.floor( action.payload.replace( ',', '.' ) );

	const account1 = state.leftBox.rate;
	const account2 = state.rightBox.rate;


	if (action.name === 'left') {
		return { leftInput: data, rightInput: (data * account1 / account2).toFixed( 2 ) };
	} else {
		return { rightInput: data, leftInput: (data * account2 / account1).toFixed( 2 ) };
	}
};

export const currencySearch = ( state, input ) => {
	const inputLow = input.toLowerCase();
	let arraySort = state.table.filter( row => row.txt.toLowerCase().includes( inputLow ) || row.cc.includes( inputLow.toUpperCase() ) );
	arraySort = arraySort.length ? arraySort : [ { r030: '-1', cc: 'Данных', txt: 'нет' } ];
	return [ ...arraySort ];
};

export const getFiveDay = () => {
	let milliseconds = Date.parse( day );
	let arrayMilliseconds = [];
	arrayMilliseconds.push( milliseconds );

	for (let i = 0; i < 4; i++) {
		milliseconds -= 24 * 60 * 60 * 1000;
		arrayMilliseconds.push( milliseconds );
	}
	arrayMilliseconds = arrayMilliseconds.reverse();

	return arrayMilliseconds.map( oneDay => {
		const date = new Date( oneDay ).toISOString().substr( 0, 10 ).split( '-' ).join( '' );
		return axios.get( `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json&date=${ date }` );
	} );
};
