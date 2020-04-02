import React, { PureComponent } from 'react';
import BoardCircle from '../board-circle/board-circle.component';
import { RowContainer } from './board-row.styles';

class BoardRow extends PureComponent {
	render() {
		return (
			<RowContainer>
				{
					this.props.rowData.map((circleState, index) => <BoardCircle key={index} circleState={circleState} />)
				}
			</RowContainer>
		);
	}
}

export default BoardRow;