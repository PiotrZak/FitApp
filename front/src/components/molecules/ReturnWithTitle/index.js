import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Paragraph from 'components/atoms/Paragraph';
import Return from 'components/molecules/Return';
import { useThemeContext } from 'support/context/ThemeContext';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledParagraph = styled(Paragraph)`
  margin-left: .4rem;
  line-height: 0;
`;

const ReturnWithTitle = ({ text }) => {
  const { theme } = useThemeContext();

  return (
    <Container>
      <Return color={theme.colorPrimary} />
      <StyledParagraph type="Label-Button">{text}</StyledParagraph>
    </Container>
  );
};

ReturnWithTitle.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ReturnWithTitle;
