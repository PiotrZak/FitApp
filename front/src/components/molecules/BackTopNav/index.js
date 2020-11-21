import React from 'react';
import styled from 'styled-components';
import ReturnWithTitle from 'components/molecules/ReturnWithTitle';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  
  padding: 1rem 0;
  
  color: ${({ theme }) => theme.colorGray10};
`;

const BackTopNav = ({ text }) => (
  <Wrapper>
    <ReturnWithTitle text={text} />
  </Wrapper>
);

export default BackTopNav;
