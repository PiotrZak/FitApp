import React, { useState, useEffect } from 'react';
import { commonUtil } from 'utils/common.util';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import { useThemeContext } from 'support/context/ThemeContext';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import Loader from 'components/atoms/Loader';
import ScrollContainer from 'components/atoms/ScrollContainer';
import Nav from 'components/atoms/Nav';
import Search from 'components/molecules/Search';
import styled from 'styled-components';
import Heading from 'components/atoms/Heading';
import { organizationService } from 'services/organizationServices';
import SmallButton from 'components/atoms/SmallButton';
import InviteUserModal from './InviteUsersModal';
import { Role } from 'utils/role';

const Container = styled.div`
  margin-bottom: .8rem;
`;

const OrganizationTrainers = () => {
  const { theme } = useThemeContext();
  const { notificationDispatch } = useNotificationContext();
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeUsers, setActiveUsers] = useState([]);

  const [bottomSheet, setBottomSheet] = useState('none');
  const [assignPlan, setAssignPlan] = useState('none');
  const [assignTrainer, setAssignTrainer] = useState('none');

  const [isLoading, setIsLoading] = useState(false);

  const user = JSON.parse((localStorage.getItem('user')));

  const getAllUsers = () => {
    setIsLoading(true);
    organizationService
      .getOrganizationTrainers(user.organizationId)
      .then((data) => {
        setUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet('flex');
    } else {
      setBottomSheet('none');
      setAssignPlan('none');
    }
  };

  const filterUsers = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? users
    : users.filter((User) => {
      const userName = `${User.firstName} ${User.lastName}`;

      return userName.toLowerCase().includes(searchTerm.toLowerCase());
    });

  return (
      <GlobalTemplate>
        <Nav>
          <Heading>{translate('Trainers')}</Heading>
          <SmallButton iconName="plus" onClick={() => setOpenInviteUserModal(true)} />
        </Nav>
        <InviteUserModal role = {Role.Trainer}  openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
        <Container>
          <Search placeholder={translate('Find')} callBack={filterUsers} />
        </Container>
        <ScrollContainer mobileHeight="17rem" desktopHeight="14rem">
          <Loader isLoading={isLoading}>
            {users
              ? (
                <CheckboxGenericComponent
                  dataType="users"
                  displayedValue="firstName"
                  dataList={results}
                  onSelect={submissionHandleElement}
                />
              )
              : <h1>{translate('NoUsers')}</h1>}
          </Loader>
        </ScrollContainer>
      </GlobalTemplate>
  );
};

export default OrganizationTrainers;
