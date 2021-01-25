import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useRouteMatch } from 'react-router';
import { dropDownMenu, getFiveLastDate } from '../../redux/action';

import './currency.scss';

const Currency = () => {
	const dispatch = useDispatch();
	const history = useHistory();
	let param = useRouteMatch();
	const { table, tableToFive } = useSelector( state => state.reducer );

	React.useEffect( () => {
		if (param.params.id) {
			dispatch( getFiveLastDate( param.params.id ) );
		}
	}, [ param.params.id, dispatch ] );

	const showTable = param.params.id ? tableToFive : table;

	const goToId = ( id ) => {
		history.push( `/${ id }` );
		dispatch( dropDownMenu( { leftDrop: false, rightDrop: false } ) );
	};

	const back = () => {
		history.push( '/' );
	};

	return (
		<div className='all-currency'>
			<h3>Все валюты</h3>
			<table>
				<thead>
				<tr>
					<th>&nbsp;</th>
					<th>&nbsp;</th>
					<th>Дата</th>
					<th>Курс</th>

				</tr>

				</thead>
				<tbody>
				{ showTable.map( ( row, idx ) => (
					<tr key={ row.r030 + `${ idx }` } onClick={ () => goToId( row.r030 ) }>
						<td>{ row.txt }</td>
						<td>{ row.cc }</td>
						<td>{ row.exchangedate }</td>
						<td>{ row.rate }</td>
					</tr>
				) ) }
				</tbody>
			</table>
			{ param.params.id && (<button onClick={ back }>Назад</button>) }
		</div>
	);
};

export default Currency;
