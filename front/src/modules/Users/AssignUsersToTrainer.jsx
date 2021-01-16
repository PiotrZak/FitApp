import React from 'react';
import { userService } from 'services/userServices';
import styled from 'styled-components';
import { isMobile } from "react-device-detect";
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import StyledReactBottomSheet, { PanelContainer, PanelItem, } from 'components/organisms/BottomSheet'


export const BottomNavTitle = styled.div`
    display:flex;
    align-items:center;
    margin:0.2rem 0 0 1.6rem;
`

export const AssignUsersToTrainer = ({
  userId,
  theme,
  assignTrainer,
  setAssignTrainer,
  activeUsers,
  setBottomSheet,
}) => {

  const { notificationDispatch } = useNotificationContext();

  const assignUserToTrainer = () => {
    const data = { userIds: activeUsers, trainerIds: [userId] };
    userService
      .assignUsersToTrainer(data)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
              content: { success: 'OK', message: translate('TrainersAssignedToUser') },
              type: 'positive'
          }
      })
        setAssignTrainer('none')
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
              content: { success: 'OK', message: translate('ErrorAlert') },
              type: 'error'
          }
      })
      });
  };

  return (
    <StyledReactBottomSheet
      showBlockLayer={false}
      visible={assignTrainer}
      className={""}
      onClose={() => setBottomSheet('none')}
      appendCancelBtn={false}
    >
            {isMobile ?
                <>
                    <PanelItem onClick={() => assignUserToTrainer()}>
                        {translate('DeleteUserText')}
                    </PanelItem>
                </>
                :
                <>
                    <PanelContainer>
                      <PanelItem onClick={() => assignUserToTrainer()}>
                            {translate('AssignToMe')}
                        </PanelItem>
                    </PanelContainer>
                </>
            }
    </StyledReactBottomSheet>
  );
};
