import React, { useState, useEffect } from 'react';
import { userService } from "../../services/userServices";
import { Link, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Icon from "./../../common/Icon"
import Return from "./../../common/Return"
import { TabContent, TabPane, Nav, NavItem, NavLink, } from 'reactstrap';
import classnames from 'classnames';
import "react-multi-carousel/lib/styles.css";
import { alertActions } from './../../redux/actions/alert.actions'

import EditUserPasswordModal from "./Edit/EditUserPassword"
import EditUserEmailModal from "./Edit/EditUserEmail"
import EditUserDataModal from "./Edit/EditUserData"

var ReactBottomsheet = require('react-bottomsheet');

export const User = (props) => {

    const [user, setUser] = useState();
    const [exercises, setExercises] = useState()
    const [bottomSheet, setBottomSheet] = useState(false)

    const [openEditUserData, setOpenEditUserData] = useState(false)
    const [openEditMailModal, setOpenEditMailModal] = useState(false);
    const [openEditUserPasswordModal , setOpenEditUserPasswordModal] = useState(false);

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getUserData(id.id)
    }, [id.id]);


    const getUserData = (id) => {
        userService
            .getUserById(id)
            .then((data) => {
                setUser(data);
                console.log(data)
            })
            .catch((error) => {
            });
    }

    const userEdit = "Edit Your Data";
    const changeMail = "Change Email";
    const changePassword = "Change Paassword";
    const logout = "Logout";

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
            </div>
            <div className="user-container">
                {user && <UserInfo user={user} />}
            </div>

            <Navs />

             <EditUserDataModal id = {id.id} openModal={openEditUserData} onClose={() => setOpenEditUserData(false)} />
             <EditUserEmailModal id = {id.id} openModal={openEditMailModal} onClose={() => setOpenEditMailModal(false)} />
             {/* todo - verify password + security issues */}
             <EditUserPasswordModal id = {id.id} openModal={openEditUserPasswordModal} onClose={() => setOpenEditUserPasswordModal(false)} />
            {/* todo - logout -session/localstorage etc. */}


            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button onClick = {() => setOpenEditUserData(true)} className='bottom-sheet-item'>{userEdit}</button>
                <button onClick = {() => setOpenEditMailModal(true)} className='bottom-sheet-item'>{changeMail}</button>
                <button onClick = {() => setOpenEditUserPasswordModal(true)} className='bottom-sheet-item'>{changePassword}</button>
                <button className='bottom-sheet-item'>{logout}</button>
            </ReactBottomsheet>
        </div>
    );
}

const UserInfo = ({ user }) => {

    return (
        <div className="user-container__info">
            {user &&
                <div>
                    <Avatar />
                    <h2>{user.firstName} {user.lastName}</h2>
                    <p>{user.role}</p>
                    <p>{user.phoneNumber}</p>
                    <p>{user.email}</p>
                </div>
            }
        </div>
    );
}

const Avatar = () => {

    const uploadAvatar = () => {
        console.log('test')
    }

    return (
        <div onClick={() => uploadAvatar()} className="avatar">
        </div>
    );
}


const Navs = () => {

    const [activeTab, setActiveTab] = useState('1');
    const myPlans = "Plans";
    const myTrainers = "Trainers";

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }
    return (
        <div className="user-container__tabs">
            <Nav tabs>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '1' })}
                        onClick={() => { toggle('1'); }}
                    >
                        <h2>{myPlans}</h2>
                    </NavLink>
                </NavItem>
                <NavItem>
                    <NavLink
                        className={classnames({ active: activeTab === '2' })}
                        onClick={() => { toggle('2'); }}
                    >
                        <h2>{myTrainers}</h2>
                    </NavLink>
                </NavItem>
            </Nav>
            <TabContent activeTab={activeTab}>

                <TabPane tabId="1">
                    <h1>My Plans</h1>
                </TabPane>

                <TabPane tabId="2">
                    <h1>My Trainers</h1>
                </TabPane>
            </TabContent>
        </div>
    )
}



export default User;