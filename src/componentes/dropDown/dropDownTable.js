import React from 'react';

const DropDownTable = ( { table, funcRow, funcStar, text } ) => {


	return (
		<React.Fragment>
			<div className="dropTable_header">{ text }</div>
			{ table.map( row => (
				<div className="dropTable_data" key={ row.r030 }>
					<div onClick={ () => funcRow( row.r030 ) } className={ 'dropTable_data-row' }>
						<span>{ row.cc }</span>
						<span>{ row.txt }</span>
					</div>
					<div className={ 'star' } onClick={ () => funcStar( row.r030 ) }>
						<svg role="img" xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24"
							aria-labelledby="starIconTitle starIconDesc" stroke="#FDE910" strokeWidth="1" strokeLinecap="square"
							strokeLinejoin="miter" fill={ `${ row.select ? '#FDE910' : 'none' }` } color="#EDFF21">
							<title id="starIconTitle">Star</title>
							<desc id="starIconDesc">Icon of
								a five-pointed star
							</desc>
							<polygon
								points="12 17.844 6.183 20.902 7.294 14.425 2.588 9.838 9.092 8.893 12 3 14.908 8.893 21.412 9.838 16.706 14.425 17.817 20.902"/>
						</svg>
					</div>
				</div>
			) ) }
		</React.Fragment>
	);
};

export default DropDownTable;
