import { types } from './types';
import { getData, getDataWithDate, getFiveLast } from '../api/resource';


export const putCurrentData = ( data ) => ({
	type: types.PUT_CURRENT_DATA,
	payload: data
});

export const putFiveDate = ( date ) => ({
	type: types.PUT_FIVE_DATA,
	payload: date
});


export const dropDownMenu = ( data ) => ({
	type: types.DROP_DOWN,
	payload: data
});

export const inputHandlerAction = ( data, name ) => ({
	type: types.INPUT_HANDLER,
	payload: data,
	name
});

export const inputSearch = ( string ) => ({
	type: types.INPUT_SEARCH,
	payload: string
});

export const selectCurrent = ( id, name ) => ({
	type: types.SELECT_CURRENCY,
	payload: id,
	name: name
});

export const recalculateCurrent = ( name ) => ({
	type: types.RECALCULATE_WHEN_SELECTED,
	payload: name

});


export const changeBox = () => ({
	type: types.CHANGE_BOX
});

export const selectedFavorite = ( id ) => ({
	type: types.SELECT_FAVORITE,
	payload: id

});

export const deleteSelectedFavorite = ( id ) => ({
	type: types.REMOVE_SELECT_FAVORITE,
	payload: id
});

export const get = () => async ( dispatch ) => {
	const data = await getData();
	dispatch( putCurrentData( data ) );

};

export const getWithDate = ( date ) => async ( dispatch ) => {
	const data = await getDataWithDate( date );
	dispatch( putCurrentData( data ) );
};

export const getFiveLastDate = ( id ) => async ( dispatch ) => {
	const data = await getFiveLast();
	const arr = data.map( curr => {
		return curr.data.find( row => row.r030 === +id );
	} );
	dispatch( putFiveDate( arr ) );
};
