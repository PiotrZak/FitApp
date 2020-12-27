import React, { useState } from 'react';
import Button from "components/atoms/Button"
import { ReactMultiEmail, isEmail } from "react-multi-email";
import "react-multi-email/style.css";
import { accountService } from '../../services/accountServices';
import { StyledModal } from 'components/molecules/Modal'
import { ModalHeading } from 'components/atoms/Heading';
import { translate } from 'utils/Translation';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { useUserContext } from "../../support/context/UserContext"

const InviteUserModal = ({ openModal, onClose }) => {

    const { user } = useUserContext();
    const { notificationDispatch } = useNotificationContext();
    const [emails, setEmails] = useState([])

    const submitForm = () => {
        const inviteModel = {
            organizationId: user.organizationId,
            emails: emails
        }

        accountService
            .sendInvitation(inviteModel)
            .then((data) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('EmailSent') },
                        type: 'positive',
                    },
                });
            })
            .catch((error) => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: error, message: translate('EmailNotSent') },
                        type: 'error',
                    },
                });
            });
    }

    return (
        <StyledModal
            isOpen={openModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}>
            <ModalHeading>{translate('InviteUsers')}</ModalHeading>
            <MultiInviteForm emails={emails} setEmails={setEmails} />
            <Button onClick={submitForm} type="submit" buttonType="primary" size="lg">{translate('InviteUsersButton')}</Button>
        </StyledModal>
    );
}

const MultiInviteForm = ({ emails, setEmails }) => {
    return (
        <ReactMultiEmail
            placeholder={translate('SeparateMails')}
            emails={emails}
            onChange={(_emails) => {
                setEmails([..._emails])
            }}
            validateEmail={email => {
                return isEmail(email); // return boolean
            }}
            getLabel={(
                email,
                index,
                removeEmail,
            ) => {
                return (
                    <div data-tag key={index}>
                        {email}
                        <span data-tag-handle onClick={() => removeEmail(index)}>
                            ×
                </span>
                    </div>
                );
            }}
        />
    )
}


export default InviteUserModal;