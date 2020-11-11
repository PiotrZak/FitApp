import styled from 'styled-components';
import Modal from 'styled-react-modal'

export const SpecialModalBackground = styled.div`
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  &:after{
    content:'';
    background-color: grey;
    width:100vw;
    height:100vh;
    position:absolute;
    opacity:0.7;
}
  }
`

export const StyledModal = Modal.styled`
position: fixed;
    top:0;
    padding: 3.6rem 3.6rem;
  margin: 10.2rem 0 0 0;
  position:relative;
  z-index:1;
  opacity:1.0;
  width: 42rem;
  height: 34rem;
  color:white;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colorGray90};
`