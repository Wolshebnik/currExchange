import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Switch,
	Route,
} from "react-router-dom";

import ExchangerBox from './componentes/exchangerBox/exchangerBox';
import Currency from './componentes/currency/currency';

import { changeBox, dropDownMenu, get, getWithDate, inputHandlerAction } from './redux/action';
import { getDateForCalendar } from './redux/utils';
import './App.scss';



function App() {
	const dispatch = useDispatch();

	const { leftDrop, leftBox, leftInput, rightDrop, rightBox, rightInput } = useSelector( state => state.reducer );

	const [ currentDate, setCurrentDate ] = React.useState( getDateForCalendar() );

	React.useEffect( () => {
		dispatch( get() );
	}, [ dispatch ] );


	React.useEffect( () => {
		const date = currentDate.split( '-' ).join( '' );
		dispatch( getWithDate( date ) );
	}, [ dispatch, currentDate ] );

	const getDate = ( e ) => {
		setCurrentDate( e.target.value );
	};

	const inputHandler = ( e ) => {
		const { name, value } = e.target;
		dispatch( inputHandlerAction( value, name ) );
	};

	const onFocus = () => {
		dispatch( dropDownMenu( { leftDrop: false, rightDrop: false } ) );
	};

	const dropHandle = ( name ) => {
		if (name === 'left') {
			dispatch( dropDownMenu( { leftDrop: !leftDrop, rightDrop: false } ) );

		} else {
			dispatch( dropDownMenu( { rightDrop: !rightDrop, leftDrop: false } ) );
		}
	};

	const changePlace = () => {
		dispatch( changeBox() );
		dispatch( dropDownMenu( { leftDrop: false, rightDrop: false } ) );
	};

	return (
		<div className="App">
			<div className="exchanger">
				<div className='exchanger_header'>
					<h1>Конвертер валют</h1>
					<h3>Дата обновления
						<span>
						<input type={ 'date' }
							name={ 'date' }
							value={ currentDate }
							max={ getDateForCalendar() }
							onChange={ getDate }/>
							</span>
					</h3>
				</div>

				<div className='exchanger_container'>
					<ExchangerBox
						boxLeft={ leftBox }
						boxRight={ rightBox }
						text={ 'У меня есть' }
						onFocus={ onFocus }
						funcInput={ inputHandler }
						value={ leftInput }
						name={ 'left' }
						dropFunc={ dropHandle }
						dropDown={ leftDrop }
					/>
					<div className="replacement" onClick={ changePlace }>
						<div className='arrow-right'/>
						<div className='arrow-left'/>
					</div>
					<ExchangerBox
						boxLeft={ leftBox }
						boxRight={ rightBox }
						text={ 'Я получу' }
						onFocus={ onFocus }
						funcInput={ inputHandler }
						value={ rightInput }
						name={ 'right' }
						dropFunc={ dropHandle }
						dropDown={ rightDrop }
					/>
				</div>
			</div>
			<Router>
				<Switch>
					<Route exact path="/">
						<Currency/>
					</Route>
					<Route path="/:id">
						<Currency/>
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
