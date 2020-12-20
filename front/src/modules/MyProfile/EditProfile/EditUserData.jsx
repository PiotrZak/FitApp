import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Label from 'components/atoms/Label';
import styled from 'styled-components';
import Input from 'components/molecules/Input';
import { validationUtil } from "utils/validation.util"
import InputContainer from 'components/atoms/InputContainerForm';
import { userService } from 'services/userServices'
import Button from "components/atoms/Button"
import * as Yup from 'yup';
import { StyledModal } from 'components/molecules/Modal';
import { ModalHeading } from 'components/atoms/Heading';
import { Formik, Field, Form } from 'formik';
import { translate } from 'utils/Translation';
import Icon from 'components/atoms/Icon';

const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
};

const validatePhone = (phone) => {
    let errorField = {};
    const phoneValidationMessage = "Telephone number should be correct";
    var RE = /^\d{9}$/;
    if (!RE.test(phone)) {
        errorField['phone'] = phoneValidationMessage;
        return errorField['phone']
    }
}

const validationSchema = Yup.object().shape({
    firstName: Yup.string().required(translate('EnterFirstNameAndLastName')),
    lastName: Yup.string().required(translate('lastName')),
    phone: Yup.string().required(translate('phone')),
});

const IconContainer = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
`;

const editUserDetails = "Edit Your data";
const saveChanges = "Save Changes";
const firstName = "First Name";
const lastName = "Last Name";


const firstNamePlaceholder = "What is your first name ?";
const lastNamePlaceholder = "What is your last name ?";
const phonePlaceholder = "What is your phone number ?"


const EditUserDataModal = ({ id, openModal, onClose }) => {


    console.log(id)
    const [userData] = useState({});
    const [errors, setErrors] = useState({})

    const requiredFields = ["firstName", "lastName", "phone"];


    const onSubmit = (values) => {
        console.log(values)
        const transformedUserData = { firstName: values.firstName, lastName: values.lastName, phoneNumber: values.phone }
        userService
            .editUser(id, transformedUserData)
            .then(() => {
                onClose()
            })
            .catch((error) => {
            });
    };

    return (
        <StyledModal
            isOpen={openModal}
            onBackgroundClick={onClose}
            onEscapeKeydown={onClose}
        >
            <IconContainer>
                <Icon name="Union" size="1.2" cursorType="pointer" onClick={onClose} />
            </IconContainer>
            <ModalHeading toggle={onClose}><h2>{editUserDetails}</h2></ModalHeading>
            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit} validateOnChange={false}>
                {({ errors, touched, values }) => (
                    <Form>
                        <InputContainer>
                            <Label type="top" text={translate('firstName')} required>
                                <Field placeholder={translate('firstNamePlaceholder')}
                                    type="text"
                                    name="firstName"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('lastName')} required>
                                <Field placeholder={translate('lastNamePlaceholder')}
                                    type="text" name="lastName"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <InputContainer>
                            <Label type="top" text={translate('phone')} required>
                                <Field placeholder={translate('phoneNamePlaceholder')}
                                    type="number"
                                    name="phone"
                                    as={Input}
                                    error={errors.name && touched.name} />
                            </Label>
                        </InputContainer>
                        <Button type="submit" buttonType="primary" size="lg">{translate('saveChanges')}</Button>
                    </Form>
                )}
            </Formik>
        </StyledModal>
    );
}

export default EditUserDataModal;