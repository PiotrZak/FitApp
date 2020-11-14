import React, { useState, useEffect } from 'react';
import { categoryService } from "services/categoryService";
import { exerciseService } from "services/exerciseService";
import { Link, useHistory } from 'react-router-dom';
import Icon from 'components/atoms/Icon';
import styled from 'styled-components';
import { commonUtil } from "utils/common.util"
import "react-multi-carousel/lib/styles.css";
// import { PlanPanelExercises } from "../Plans/microModules/PlanPanelExercises"
import Search from "components/molecules/Search"
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate, { Nav } from "templates/GlobalTemplate"
import { useThemeContext } from 'support/context/ThemeContext';
import { PlanPanelExercises } from './PlanPanelExercises';

const IconWrapper = styled.div`
    margin-top: .4rem;
`;

const noExerciseInPlan = "There are no added exercises in this Plan";
const noExerciseInCategory = "There are no added exercises in this category"
const ExerciseSearch = "Which exercises You searching?"

const Category = (props) => {

    const [category, setCategory] = useState();
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isLoading, setIsLoading] = useState(false)
    const { theme } = useThemeContext();

    const [selectedExercise, setselectedExercise] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)

    const [bottomSheet, setBottomSheet] = useState('none')

    const history = useHistory();
    const { match } = props;
    let id = match.params.id;

    useEffect(() => {
        getCategory(id)
        getCategoryExercise(id)
    }, [id, bottomSheet, setBottomSheet]);


    const getCategory = (id) => {
        categoryService
            .getCategoryById(id)
            .then((data) => {
                setCategory(data);
            })
            .catch((error) => {
            });
    }

    const getCategoryExercise = (id) => {
        exerciseService
            .getExercisesByCategory(id)
            .then((data) => {
                console.log(data)
                setExercises(data);
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setselectedExercise(selectedExercises)
        selectedExercises.length > 0 ? setBottomSheet('flex') : setBottomSheet('none');
    }

    const filterExercises = event => {
        console.log('test')
        setSearchTerm(event.target.value);
        console.log(searchTerm)
    };

    const results = !searchTerm
        ? exercises
        : exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    return (
        <>
            <GlobalTemplate>
                <Nav>
                    <BackTopNav />
                    {category && <h2>{category.title}</h2>}
                    {category &&
                        <Link
                            to={{
                                pathname: "/add-exercise",
                                state: { id: category.categoryId }
                            }}
                        >
                            <IconWrapper>
                                <Icon name="plus" fill={theme.colorInputActive} />
                            </IconWrapper>
                        </Link>
                    }
                </Nav>
                <Search callBack={filterExercises} placeholder = {translate('ExerciseSearch')} />
                {results ?
                <CheckboxGenericComponent
                    dataType={"exercises"}
                    dataList={results}
                    displayedValue={"name"}
                    onSelect={submissionHandleElement} />
                    :
                    <p>nothing</p>}
            </GlobalTemplate>
            <PlanPanelExercises
                selectedExercise={selectedExercise}
                bottomSheet={bottomSheet}
                setSelectedElementsBottomSheet={setSelectedElementsBottomSheet}
                selectedElementsBottomSheet={selectedElementsBottomSheet}
                theme={theme}
            />
        </>
    );
}

export default Category;