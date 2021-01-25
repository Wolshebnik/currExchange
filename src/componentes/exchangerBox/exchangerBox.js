import React from 'react';
import { useDispatch } from 'react-redux';

import DropDown from '../dropDown/dropDown';
import { dropDownMenu, inputSearch, recalculateCurrent, selectCurrent, selectedFavorite } from '../../redux/action';
import arrow from '../../assets/image/arrow.svg';

import './exchangerBox.scss';


const ExchangerBox = ( { text, funcInput, onFocus, value, name, dropFunc, dropDown, boxLeft, boxRight } ) => {

	const dispatch = useDispatch();

	const howDrop = () => {
		dropFunc( name );
	};

	const focus = () => {
		onFocus( name );
	};


	const selectRow = ( id ) => {
		if (id === '-1') {
			return;
		}

		if (name === 'left') {
			dispatch( selectCurrent( id, 'leftBox' ) );
			dispatch( dropDownMenu( { leftDrop: false } ) );
		} else {
			dispatch( selectCurrent( id, 'rightBox' ) );
			dispatch( dropDownMenu( { rightDrop: false } ) );
		}
		dispatch( recalculateCurrent( name ) );
	};

	const selectFavorite = ( id ) => {
		dispatch( selectedFavorite( id ) );
	};

	const searchCurrency = ( e ) => {
		dispatch( inputSearch( e.target.value ) );
	};

	return (
		<div className='box'>
			<label>
				<span>{ text }</span>
				<input type="number" onChange={ funcInput } value={ value } name={ name } onClick={ focus }/>
				<span>{ `${ name === 'left' ? boxLeft.cc : boxRight.cc } ${ name === 'left' ? boxLeft.txt : boxRight.txt }` }</span>
				{/*<span>{ `1 ${ name === 'left' ? boxLeft.cc : boxRight.cc } = ${ name === 'left' ? 1 / boxRight.rate : 1 * boxRight.rate } ${ name === 'left' ? boxRight.cc : boxLeft.cc }` }</span>*/ }
			</label>
			<div className={ 'button' }>
				<button onClick={ howDrop }><span>{ name === 'left' ? boxLeft.cc : boxRight.cc }</span> <img src={ arrow } alt="arrow"
					className={ `${ dropDown ? 'down' : '' }` }/></button>
				{ dropDown && <DropDown name={ name } funcSearch={ searchCurrency } funcRow={ selectRow } funcStar={ selectFavorite }/> }
			</div>
		</div>
	);
};

export default ExchangerBox;
