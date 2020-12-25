import React from 'react';
import styled from 'styled-components';
import ReturnWithTitle from 'components/molecules/ReturnWithTitle';
import { history as historyPropTypes } from 'history-prop-types';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 1rem 0;
  color: ${({ theme }) => theme.colorGray10};
  &:hover {
      cursor:pointer;
    }
`;

const BackTopNav = ({ text, history }) => (
  <Wrapper onClick={() => history.goBack()} >
    <ReturnWithTitle text={text} />
  </Wrapper>
);


BackTopNav.propTypes = {
  history: PropTypes.shape(historyPropTypes).isRequired,
  fill: PropTypes.string,
};

export default withRouter(BackTopNav);