import React, { useState, useContext, useEffect } from 'react';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import "react-multi-carousel/lib/styles.css";
import { UserInfo } from "components/molecules/UserInfo"
import GlobalTemplate, { Nav as NavI } from "../../templates/GlobalTemplate"
import BackTopNav from 'components/molecules/BackTopNav';
import { translate } from 'utils/Translation';
import { useThemeContext } from 'support/context/ThemeContext';
import { useUserContext } from "../../support/context/UserContext"
import StyledReactBottomSheet, { PanelContainer, PanelItem, MobilePanelItem, StyledMobileReactBottomSheet, } from 'components/organisms/BottomSheet'

// import EditUserPasswordModal from "./Edit/old parts/EditUserPassword"
// import EditUserEmailModal from "./Edit/old parts/EditUserEmail";
// import EditUserDataModal from "./Edit/old parts/EditUserData";

import { TrainerClients } from "./UserProfile/TrainerClients"
import { TrainerPlans } from "./UserProfile/TrainerPlans"
import { UserPlans } from "./UserProfile/UserPlans"
import { ClientTrainers } from "./UserProfile/ClientTrainers"

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const myPlans = "Plans";
const UserEdit = "Edit Your Data";
const ChangeMail = "Change Email";
const ChangePassword = "Change Paassword";
const Logout = "Logout";

export const MyProfile = (props) => {

    const { user } = useUserContext();
    const { theme } = useThemeContext();

    let sections = [];

    const closeModal = () => {
        setOpenModal(false)
    }

    if (user.role === "Trainer") {
        sections = ['Trainer Clients', 'Trainer Plans']
    }
    else {
        sections = ['User Plans', 'Client Trainers']
    }

    const [activeItem, setActiveItem] = useState('TrainerClients');

    const [bottomSheet, setBottomSheet] = useState('none')
    const [isLoading, setIsLoading] = useState(true)
    const [openModal, setOpenModal] = useState(false);

    return (
        <>
            <GlobalTemplate>
                <NavI>
                    <BackTopNav />
                    <IconWrapper>
                        <Icon onClick={() => setBottomSheet('flex')} name="plus" fill={theme.colorInputActive} />
                    </IconWrapper>
                </NavI>
                {user && <UserInfo user={user} />}

                <TabsContainer>
                    {sections.map((title, i) => (
                        <Navs
                            title={title}
                            setActiveItem={setActiveItem}
                            activeItem={activeItem}
                        />
                    ))}
                </TabsContainer>
                {user.role === "Trainer"
                    ?
                    <>
                        {activeItem == 'Trainer Clients' && <TrainerClients id={user.userId} />}
                        {activeItem == 'Trainer Plans' && <TrainerPlans id={user.userId} />}
                    </>
                    :
                    <>
                        {activeItem == 'User Plans' && <UserPlans id={user.userId} />}
                        {activeItem == 'Client Trainers' && <ClientTrainers id={user.userId} />}
                    </>
                }
                {/* Modals */}
                {/* <EditUserDataModal id={user.id} openModal={openEditUserData} onClose={() => setOpenEditUserData(false)} />
                <EditUserEmailModal id={user.id} openModal={openEditMailModal} onClose={() => setOpenEditMailModal(false)} />
                <EditUserPasswordModal id={user.id} openModal={openEditUserPasswordModal} onClose={() => setOpenEditUserPasswordModal(false)} /> */}
            </GlobalTemplate>
            <MyProfilePanel 
                theme={theme}
                bottomSheet={bottomSheet}
                setBottomSheet={setBottomSheet} 
                />
        </>
    );
}

const TabsContainer = styled.div`
    display:flex;
    width:100%;
    margin:3.2rem 0 0 0;
    text-align:center;
`;

const Tab = styled.div`
    font-size:24px;
    display:flex;
    width:100%;
    text-align:center;
    justify-content: center;
    margin-bottom:0.2rem;
    border-bottom: .2rem solid ${({ theme }) => theme.colorGray70} !important;
    &:hover {
      color: ${({ theme }) => theme.colorInputActive} !important;
      cursor:pointer;
      transition:0.6s;
      border-bottom: .2rem solid ${({ theme }) => theme.colorInputActive} !important;
    }
`;

export const Navs = ({ setActiveItem, activeItem, title }) => {
    const changeTab = (title) => {
        setActiveItem(title);
    };
    console.log(activeItem)
    return (
        <Tab onClick={() => changeTab(title)}>{title}</Tab>
    );
};

export const MyProfilePanel = ({
    bottomSheet,
    setBottomSheet,
}) => {

    const { user } = useUserContext();

    const [isLoading, setIsLoading] = useState(true)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal, setOpenEditUserPasswordModal] = useState(false);

    const logout = () => {

    }
    return (
        <StyledReactBottomSheet
            showBlockLayer={false}
            visible={bottomSheet}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}>
            <PanelContainer>
                <PanelItem onClick={() => setOpenEditUserData(true)}>
                    {translate('UserEdit')}
                </PanelItem>
                <PanelItem onClick={() => setOpenEditMailModal(true)}>
                    {translate('ChangeMail')}
                </PanelItem>
                <PanelItem onClick={() => setOpenEditUserPasswordModal(true)}>
                    {translate('ChangePassword')}
                </PanelItem>
                <PanelItem onClick={() => logout()}>
                    {translate('Logout')}
                </PanelItem>
            </PanelContainer>
        </StyledReactBottomSheet>
    );
}


export default MyProfile;