import React from 'react';
import { View } from 'react-native';
import { InactiveCircle, ActiveCircle } from './board-circle.styles';

const BoardCircle = ({ circleState }) => {
	return (
		<View>
			{
				circleState.isActive ?
				<ActiveCircle />
				:
				<InactiveCircle />
			}
		</View>
	);
}

export default BoardCircle;