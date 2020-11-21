import React, { useState, useEffect, useContext } from 'react';
import { organizationService } from 'services/organizationServices';
import Return from 'components/molecules/Return';
import { commonUtil } from 'utils/common.util';
import Loader from 'components/atoms/Loader';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import { useUserContext } from '../../support/context/UserContext';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import InviteUserModal from './InviteUsersModal';
// import messages from 'lang/eng'

// import { UsersPanel } from "../Common/UsersPanel"
// import { AssignUsersToPlans } from "../Common/AssignUsersToPlans"
// import { AssignUsersToTrainers } from "../Common/AssignUsersToTrainers"

const OrganizationUsers = () => {
  const { notificationDispatch } = useNotificationContext();
  const { user } = useUserContext();
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [activeUsers, setActiveUsers] = useState([]);
  const [assignPlan, setAssignPlan] = useState(false);
  const [assignTrainer, setAssignTrainer] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openInviteUserModal, setOpenInviteUserModal] = useState(false);
  const [bottomSheet, setBottomSheet] = useState(false);

  useEffect(() => {
    console.log(user);
    getAllUsers();
  }, []);

  const getAllUsers = () => {
    organizationService
      .getOrganizationUsers(user.organizationId)
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submissionHandleElement = (selectedData) => {
    const selectedUsers = commonUtil.getCheckedData(selectedData, 'userId');
    setActiveUsers(selectedUsers);
    if (selectedUsers.length > 0) {
      setBottomSheet(true);
    } else {
      setBottomSheet(false);
      setAssignPlan(false);
    }
  };

  const filterUsers = (role) => {
    if (role == 'All') {
      setFilteredUsers(users);
    } else {
      const filteredUsers = users.filter((x) => x.role == role);
      setFilteredUsers(filteredUsers);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="container__title">
          <Return />
          <h2>
            {/* {messages.users.usersText}  */}
            of -
            {' '}
            {user.organizationId}
          </h2>
          <div onClick={() => setOpenInviteUserModal(true)}><Icon name="plus" color="#5e4ae3" /></div>
        </div>
        <div className="users">
          <h3>
            {' '}
            You are
            {user.role}
          </h3>
          <div className="users__filters">
            <p onClick={() => filterUsers('User')}>Clients</p>
            <p onClick={() => filterUsers('Trainer')}>Trainers</p>
            <p onClick={() => filterUsers('All')}> All </p>
          </div>
          <InviteUserModal openModal={openInviteUserModal} onClose={() => setOpenInviteUserModal(false)} />
          {/* <Loader isLoading={isLoading}> */}
          {filteredUsers ? <CheckboxGenericComponent dataType="users" displayedValue="firstName" dataList={filteredUsers} onSelect={submissionHandleElement} />
            : (
              <h1>
                {/* {messages.users.noUsers} */}
              </h1>
            )}
          {/* </Loader> */}
        </div>
      </div>
      {/* <UsersPanel bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} setAssignPlan={setAssignPlan} setAssignTrainer={setAssignTrainer}/>
      <AssignUsersToPlans organizationId={user.organizationId} assignPlan={assignPlan} setAssignPlan={setAssignPlan} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} />
      <AssignUsersToTrainers organizationId={user.organizationId} assignTrainer={assignTrainer} setAssignTrainer={setAssignTrainer} bottomSheet={bottomSheet} setBottomSheet={setBottomSheet} activeUsers={activeUsers} /> */}
    </div>
  );
};

export default OrganizationUsers;
