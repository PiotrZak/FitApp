import React, { useState, useEffect } from 'react';
import { userService } from 'services/userServices';
import { planService } from 'services/planService';
import styled from 'styled-components';
import { commonUtil } from 'utils/common.util';
import Icon from 'components/atoms/Icon';
import { CheckboxGenericComponent } from "components/organisms/CheckboxGeneric"
import Button from "components/atoms/Button"
import { Headline, MainHeadline } from 'components/typography';
import StyledReactBottomSheet, {StyledReactBottomSheetExtended, BottomNav, BottomNavItem, BottomItem} from 'components/organisms/BottomSheet'


const assignPlanToUserNotification = "assignPlanToUserNotification";
const returnToSubMenu = "returnToSubMenu";
const selectFromPlans = "selectFromPlans";

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const noPlans = "No plans";

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

    useEffect(() => {
        getAllPlans();
        if (activeUsers == 0) {
            setAssignPlan('none')
        }
    }, [activeUsers]);

    const closeAssignPlansToUser = () => {
        setBottomSheet('flex');
        setAssignPlan(false);
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
                setAssignPlan('none');
                setBottomSheet(false);
            })
            .catch((error) => {
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
                        {returnToSubMenu}
                    </p>
                </BottomNavItem>
            </BottomNav>

            <div>
                <h4>{selectFromPlans}</h4>
                {/* <Loader isLoading={isLoading}> */}
                {plans ?
                plans.map((element, i) =>
                    <BottomItem onClick={() => assignUserToPlan(element)}>
                        <Headline>{element.name}</Headline>
                    </BottomItem>
                )
                : <p>{noPlans}</p>
            }
                {/* {plansResults ?
                    <CheckboxGenericComponent
                        dataType="plans"
                        displayedValue="title"
                        dataList={plansResults}
                        onSelect={getSelectedPlanIds} />
                    : <p>No Plans</p>} */}
                {/* </Loader> */}
                <Button disabled={activePlans.length === 0} className="btn btn--primary btn--lg" onClick={assignUserToPlan} name={activePlans.length === 0 ? "Select Plan" : "Assign Plans to Users"} />
            </div>

        </StyledReactBottomSheetExtended>
    );
};