import React, { useState, useEffect } from 'react';
import { routes } from 'utils/routes';
import { withRouter, NavLink } from 'react-router-dom';
import styled, { withTheme } from 'styled-components';
import Icon from 'components/atoms/Icon';
import { Role } from 'utils/role';
import breakPointSize from 'utils/rwd';

const currentUser = JSON.parse((localStorage.getItem('user')));

// eslint-disable-next-line no-shadow
const getUsersRoute = (currentUser) => {
  switch (currentUser.role) {
    case Role.Admin:
      return routes.users;
    case Role.Owner:
      return routes.organizationUsers;
    case Role.Trainer:
      return routes.organizationClients;
    case Role.User:
      return routes.organizationClients;
    default:
      return routes.organizationClients;
  }
};

const Wrapper = styled.div`
  position: fixed;
  height: 100vh;

  display: flex;
  flex-direction: column;

  justify-content: center;
  background: ${({ theme }) => theme.colorGray80};
  padding: .7rem 0;

  @media only screen and ${breakPointSize.xs} {
   width: 100%;
   flex-direction: row;
   align-items: center;
   left: 0;
   bottom: 0;
   height: 5.2rem;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;

  justify-content: center;
  background: ${({ theme }) => theme.colorGray80};
  padding: .7rem 0;

  @media only screen and ${breakPointSize.xs} {
   width: 100%;
   flex-direction: row;
   justify-content: space-around;
   left: 0;
   bottom: 0;
   border-top: 1px solid ${({ theme }) => theme.colorInputBorder};

`;

const Square = styled.div`
  height: 4.2rem;
  width: 4.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 .5rem;
`;

// style active NavLink
const activeClassName = 'active';
const StyledNavLink = styled(NavLink).attrs({
  activeClassName,
})`
  &.${activeClassName} > ${Square}{
    border-radius: .8rem;
    background: ${({ theme }) => theme.colorPrimaryDefault};
  }
`;

// eslint-disable-next-line react/prop-types
const Menu = ({ theme }) => {
  const [currentUrl, setCurrentUrl] = useState();

  useEffect(() => {
    const currentUrl = window.location.href.split('/');
    setCurrentUrl(currentUrl[3]);
  }, [window.location.href]);

  const changeIconColor = (currentUrl, route) => (currentUrl === route.substring(1) ? theme.colorPrimary : theme.colorDisabled);

  return (
    <Wrapper>
      <Container>
        <StyledNavLink exact to={routes.categories}>
          <Square>
            <Icon name="dumbbell" fill={changeIconColor(currentUrl, routes.categories)} width="2rem" height="2rem" />
          </Square>
        </StyledNavLink>

        <StyledNavLink to={getUsersRoute(currentUser)}>
          <Square>
            <Icon name="list-ul" fill={changeIconColor(currentUrl, routes.organizationUsers)} width="2rem" height="2rem" />
          </Square>
        </StyledNavLink>

        <StyledNavLink to={routes.plans}>
          <Square>
            <Icon name="clipboard-notes" fill={changeIconColor(currentUrl, routes.plans)} width="2rem" height="2rem" />
          </Square>
        </StyledNavLink>

        <StyledNavLink to={`${routes.myProfile}`}>
          <Square>
            <Icon name="user-circle" fill={changeIconColor(currentUrl, routes.myProfile)} width="2rem" height="2rem" />
          </Square>
        </StyledNavLink>
      </Container>
    </Wrapper>
  );
};

export default withTheme(withRouter(Menu));
