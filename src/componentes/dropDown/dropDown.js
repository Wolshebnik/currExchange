import React from 'react';
import { useSelector } from 'react-redux';


import './dropDown.scss';
import DropDownTable from './dropDownTable';

const DropDown = ( { funcSearch, funcRow, funcStar } ) => {
	const { table, favoriteCurrency, inputSearch, foundCurrency } = useSelector( state => state.reducer );

	const show = !!foundCurrency.length;

	return (
		<div className={ 'dropDown' }>
			<div>
				<input type="text" placeholder={ 'Начните поиск' } onChange={ funcSearch } name='inputSearch' value={ inputSearch }/>
			</div>
			<div className={ 'dropTable' }>
				{ show && (<DropDownTable
					table={ foundCurrency }
					funcRow={ funcRow }
					funcStar={ funcStar }
					text={ 'Результаты поиска' }
				/>)
				}
				{ !!favoriteCurrency.length && (
					<DropDownTable
						table={ favoriteCurrency }
						funcRow={ funcRow }
						funcStar={ funcStar }
						text={ 'Избранные' }
					/>)
				}
				<DropDownTable
					table={ table }
					funcRow={ funcRow }
					funcStar={ funcStar }
					text={ 'Национальные валюты' }
				/>
			</div>
		</div>
	);
};

export default DropDown;
