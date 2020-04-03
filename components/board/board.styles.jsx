import styled from 'styled-components/native';

export const BoardOuterContainer = styled.View`
	flex: 1;
	align-items: center;
	position: relative;
	overflow: hidden;
	max-height: ${props => props.height}px;
	margin-top: 40px;
`

export const BoardContainer = styled.View`
	position: absolute;
	bottom: -${props => props.bottomDistance}px;
`