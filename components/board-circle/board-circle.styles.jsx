import styled from 'styled-components/native';

const circleWidthNum = 20;
const circleWidth = `${circleWidthNum}px`;

const Circle = styled.View`
	width: ${circleWidth};
	height: ${circleWidth};
	border-radius: ${circleWidthNum / 2}px;
	margin: 3px;
`

export const InactiveCircle = styled(Circle)`
	background-color: #442445;
`

export const ActiveCircle = styled(Circle)`
	background-color: #BC59BD;
	box-shadow: 0 0 10px #BC59BD;
`