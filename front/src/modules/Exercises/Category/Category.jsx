import React, { useState, useEffect } from 'react';
import { categoryService } from "../../../services/categoryService";
import { exerciseService } from "../../../services/exerciseService";
import { Link, useHistory } from 'react-router-dom';
import { alertActions } from '../../../redux/actions/alert.actions'
import { useDispatch } from 'react-redux';
import Icon from "../../../common/Icon"
import Return from "../../../common/Return"
import "react-multi-carousel/lib/styles.css";
import Button from "../../../common/MenuButton/MenuButton"

var ReactBottomsheet = require('react-bottomsheet');

export const Category = (props) => {

    const [category, setCategory] = useState();
    const [exercises, setExercises] = useState()

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
                console.log(data)
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


    const filterExercises = (e) => {
        const input = new RegExp(e.target.value, 'i');
        const newItems = exercises.filter(
          (item) => item.name.match(input)
        );
        setExercises(newItems);
      };
    

    const noExerciseInCategory = "There are no added exercises in this category"

    return (
        <div className="container">
            <div className="container__title">
                <Return />

                {category && <h2>{category.title}</h2>}

                <div onClick={() => setBottomSheet(true)}><Icon name={"plus"} fill={"#5E4AE3"} /></div>
                {category &&
                <Link
                    to ={{
                        pathname: "/add-exercise",
                        state: { id: category.categoryId }
                    }}
                >
                    <Icon name={"plus"} fill={"#5E4AE3"} />
                </Link>
                }
            </div>

            <input
              type='text'
              onChange={filterExercises}
              placeholder={"find exercises"}
            />

              {exercises ? exercises.map((exercise) => <Button headline={exercise.name} subline={exercise.description} image={exercise.files[0]} exercise={exercise} />)
                    : noExerciseInCategory}

            <ReactBottomsheet
                visible={bottomSheet}
                onClose={() => setBottomSheet(false)}>
                <button onClick={() => deleteCategory()} className='bottom-sheet-item'>Delete</button>
            </ReactBottomsheet>
        </div>
    );
}

export default Category;