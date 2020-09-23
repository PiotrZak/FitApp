import React, { useState, useEffect } from 'react';
import { categoryService } from "services/categoryService";
import { exerciseService } from "services/exerciseService";
import { Link, useHistory } from 'react-router-dom';
import { alertActions } from 'redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import { CheckboxGenericComponent } from "common/CheckboxGenericComponent"
import Icon from "common/Icon"
import Return from "common/Return"
import { commonUtil } from "utils/common.util"
import { Loader } from "common/Loader"
import "react-multi-carousel/lib/styles.css";
import { PlanExercises } from "../Plans/Plan"
import { Search } from "common/Search"
import Spacer from "common/Spacer"

var ReactBottomsheet = require('react-bottomsheet');

const noExerciseInPlan = "There are no added exercises in this Plan";

export const Category = (props) => {

    const [category, setCategory] = useState();
    const [exercises, setExercises] = useState();
    const [searchTerm, setSearchTerm] = React.useState("");
    const [isLoading, setIsLoading] = useState(true)

    const [activeSelectedExercise, setActiveSelectedExercise] = useState([])
    const [selectedElementsBottomSheet, setSelectedElementsBottomSheet] = useState(false)

    const [bottomSheet, setBottomSheet] = useState(false)

    const history = useHistory();
    const { match } = props;
    let id = match.params;

    const dispatch = useDispatch()

    useEffect(() => {
        getCategory(id.id)
        getCategoryExercise(id.id)
    }, [id.id]);


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
                setExercises(data);
                setIsLoading(false)
            })
            .catch((error) => {
            });
    }

    const deleteCategory = () => {
        categoryService
            .deleteCategoryById(id.id)
            .then(() => {
                dispatch(alertActions.success("Category succesfully deleted!"))
                history.push('/categories');
            })
            .catch(() => {
            });
    }

    const submissionHandleElement = (selectedData) => {
        const selectedExercises = commonUtil.getCheckedData(selectedData, "exerciseId")
        setActiveSelectedExercise(selectedExercises)
        if (selectedExercises.length > 0) {
            setSelectedElementsBottomSheet(true);
        } else {
            setSelectedElementsBottomSheet(false);
        }
    }

    const filterExercises = event => {
        setSearchTerm(event.target.value);
    };

    const results = !searchTerm
        ? exercises
        : exercises.filter(exercise =>
            exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );


    const noExerciseInCategory = "There are no added exercises in this category"

    return (
        <div>
            <div className="container">
                <div className="container__title">
                    <Return />

                    {category && <h2>{category.title}</h2>}

                    <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
                    {category &&
                        <Link
                            to={{
                                pathname: "/add-exercise",
                                state: { id: category.categoryId }
                            }}
                        >
                            <Icon name={"plus"} fill={"#5E4AE3"} />
                        </Link>
                    }
                </div>

                <Search callBack={filterExercises} />
                <Spacer h={90} />

                <Loader isLoading={isLoading}>
                    {results ? <CheckboxGenericComponent dataType={"exercises"} dataList={results} displayedValue={"name"} onSelect={submissionHandleElement} /> : <h1>{noExerciseInPlan}</h1>}
                </Loader>

                <ReactBottomsheet
                    visible={bottomSheet}
                    onClose={() => setBottomSheet(false)}>
                    <button onClick={() => deleteCategory()} className='bottom-sheet-item'>Delete</button>
                </ReactBottomsheet>
            </div>
            <PlanExercises activeSelectedExercise={activeSelectedExercise} id={id} setSelectedElementsBottomSheet={setSelectedElementsBottomSheet} selectedElementsBottomSheet={selectedElementsBottomSheet} props={props} />
        </div>
    );
}

export default Category;