import styled from 'styled-components/native';

const colors = [
	'#00fcff',
	'#F59F3D',
	'#BC59BD'
];
const circleColor = colors[2];

const circleWidthNum = 20;
const circleWidth = `${circleWidthNum}px`;

const Circle = styled.View`
	width: ${circleWidth};
	height: ${circleWidth};
	border-radius: ${circleWidthNum / 2}px;
	margin: 3px;
`

export const InactiveCircle = styled(Circle)`
	background-color: ${circleColor};
	opacity: 0.2;
`

export const ActiveCircle = styled(Circle)`
	background-color: ${circleColor};
`