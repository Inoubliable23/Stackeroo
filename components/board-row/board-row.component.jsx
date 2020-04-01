import React from 'react';
import BoardCircle from '../board-circle/board-circle.component';
import { RowContainer } from './board-row.styles';

const BoardRow = ({ rowData }) => {
	return (
		<RowContainer>
			{
				rowData.map((circleState, index) => <BoardCircle key={index} circleState={circleState} />)
			}
		</RowContainer>
	);
}

export default BoardRow;