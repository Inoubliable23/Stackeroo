import styled from 'styled-components/native';

const circleWidth = '20px';

const Circle = styled.View`
	border-radius: 10px;
	width: ${circleWidth};
	height: ${circleWidth};
	margin: 3px;
`

export const InactiveCircle = styled(Circle)`
	background-color: #442445;
`

export const ActiveCircle = styled(Circle)`
	background-color: #BC59BD;
	box-shadow: 0 0 10px #BC59BD;
`