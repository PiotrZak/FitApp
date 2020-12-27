import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import styled from 'styled-components';
import { commonUtil } from 'utils/common.util';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { translate } from 'utils/Translation';
import { Headline } from 'components/typography';
import {StyledReactBottomSheetExtended, BottomNav, BottomNavItem} from 'components/organisms/BottomSheet'
import { useNotificationContext, ADD } from 'support/context/NotificationContext';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

export const AssignUsersToPlans = ({
    bottomSheet,
    assignPlan,
    setAssignPlan,
    activeUsers,
    setBottomSheet,
}) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [plans, setPlans] = useState();
    const [activePlans, setActivePlans] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const { notificationDispatch } = useNotificationContext();

    useEffect(() => {
        getAllPlans();
        if (activeUsers == 0) {
            setAssignPlan('none')
        }
    }, [activeUsers]);

    const closeAssignPlansToUser = () => {
        setBottomSheet('flex');
        setAssignPlan('none');
    };

    const filterPlans = (event) => {
        setSearchTerm(event.target.value);
    };

    const plansResults = !searchTerm
        ? plans
        : plans.filter((plan) => plan.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

    const getAllPlans = () => {
        planService
            .getAllPlans()
            .then((data) => {
                setPlans(data);
                setIsLoading(false);
            })
            .catch(() => {
            });
    };

    const getSelectedPlanIds = (selectedData) => {
        const selectedPlans = commonUtil.getCheckedData(selectedData, 'planId');
        setActivePlans(selectedPlans);
    };

    const assignUserToPlan = () => {
        const data = { clientIds: activeUsers, planIds: activePlans };

        userService
            .assignPlanToUser(data)
            .then(() => {
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { success: 'OK', message: translate('PlansAssignedToUser') },
                        type: 'positive'
                    }
                })
                setAssignPlan('none');
                setBottomSheet(false);
            })
            .catch((error) => {
                console.log(error)
                notificationDispatch({
                    type: ADD,
                    payload: {
                        content: { error: error, message: translate('ErrorAlert') },
                        type: 'error'
                    }
                })
            });
    };

    return (
        <StyledReactBottomSheetExtended
            showBlockLayer={false}
            visible={assignPlan}
            className={""}
            onClose={() => setBottomSheet(false)}
            appendCancelBtn={false}
        >
            <BottomNav>
                <BottomNavItem>
                    <Headline>{activeUsers.length}</Headline>
                </BottomNavItem>
                <IconWrapper>
                    <Icon name="check" fill="#2E6D2C" />
                </IconWrapper>
                <BottomNavItem>
                    <IconWrapper>
                        <Icon name="arrow-left" fill="#5E4AE3" />
                    </IconWrapper>
                    <p onClick={() => closeAssignPlansToUser()}>
                        {translate('ReturnToSubMenu')}
                    </p>
                </BottomNavItem>
            </BottomNav>
            <div>
                <h4>
                {translate('SelectFromTrainers')}
                </h4>
                {/* <Loader isLoading={isLoading}> */}
                {plansResults ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        theme = "light"
                        displayedValue="title"
                        dataList={plansResults}
                        onSelect={getSelectedPlanIds} />
                    : <p>{translate('NoPlans')}</p>}
                {/* </Loader> */}
                <Button disabled={activePlans.length === 0} type="submit" buttonType="primary" size="lg" buttonPlace="auth" onClick={assignUserToPlan}>
                {activePlans.length === 0 ? translate('SelectPlan') : translate('AssignPlanToUsers')}
                </Button>
            </div>

        </StyledReactBottomSheetExtended>
    );
};