import React, { useState, useEffect } from 'react';
import { exerciseService } from "../../services/exerciseService";
import Icon from "../../../src/common/Icon"
import { NavLink } from 'react-router-dom';
import Return from "../../common/Return"
import Button from "../../common/MenuButton/MenuButton"

export const Exercises = () => {
    const [exercises, setExercises] = useState();

    useEffect(() => {
        exerciseService
            .getAllExercises()
            .then((data) => {
                console.log(data)
                setExercises(data);
            })
            .catch(() => {
            });
    }, []);


    const noExercises = "There are no added exercises in this category"

    return (
        <div className="container">
            <div className="container__title">
                <Return />
                <h2>Category Name</h2>
                <NavLink
                    exact
                    to="/add-exercise"
                    activeClassName="active"
                >
                    <Icon name={"plus"} fill={"#5E4AE3"} />
                </NavLink>
            </div>

            <div className="users">
                {exercises ? exercises.map((exercise) => <Button headline={exercise.name} subline={exercise.description} image={exercise.files[0]} exercise={exercise} />)
                    : noExercises}
            </div>
        </div>
    );
}


export default Exercises;