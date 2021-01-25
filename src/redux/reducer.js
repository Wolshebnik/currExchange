import { types } from './types';
import { currencyAccount, currencySearch, getLocalData, handleSelectedRow } from './utils';

const uanCurrency = { r030: 100000, txt: 'Гривна', rate: 1, cc: 'UAN', exchangedate: getLocalData(), select: false };

const initialState = {
	leftDrop: false,
	rightDrop: false,
	leftBox: uanCurrency,
	leftInput: '',
	rightBox: {},
	rightInput: '',
	table: [],
	tableToFive: [],
	favoriteCurrency: [],
	inputSearch: '',
	foundCurrency: []
};


export const reducer = ( state = initialState, action ) => {

	switch (action.type) {
		case types.PUT_CURRENT_DATA:
			const tableAddSelect = action.payload.map( row => ({ ...row, select: false }) );
			const rightBox = tableAddSelect.find( data => data.cc === 'USD' );
			return { ...state, table: [ ...tableAddSelect, uanCurrency ], rightBox };

		case types.DROP_DOWN:
			return { ...state, ...action.payload, foundCurrency: [], inputSearch: '' };

		case types.SELECT_CURRENCY:
			const selectedCurrency = state.table.find( row => row.r030 === action.payload );
			return { ...state, [action.name]: selectedCurrency, foundCurrency: [], inputSearch: '' };

		case types.SELECT_FAVORITE:
			return { ...state, ...handleSelectedRow( state, action.payload ) };

		case types.INPUT_HANDLER:
			return { ...state, ...currencyAccount( state, action ) };

		case types.RECALCULATE_WHEN_SELECTED:
			const input = action.payload === 'left' ? state.leftInput.toString() : state.rightInput.toString();
			return { ...state, ...currencyAccount( state, { payload: input, name: action.payload } ), foundCurrency: [], inputSearch: '' };

		case types.CHANGE_BOX:
			return {
				...state,
				leftBox: state.rightBox,
				rightBox: state.leftBox,
				leftInput: state.rightInput,
				rightInput: state.leftInput,
				foundCurrency: [],
				inputSearch: ''
			};

		case types.INPUT_SEARCH:
			const foundCurrency = currencySearch( state, action.payload );
			return { ...state, inputSearch: action.payload, foundCurrency };

		case types.PUT_FIVE_DATA:
			return { ...state, tableToFive: action.payload };

		default:
			return state;
	}
};
