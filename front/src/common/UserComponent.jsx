import React from "react";
import { Link } from 'react-router-dom';
import Icon from "./Icon"

const AVATAR_TYPES = {
    square: "square",
    circle: "circle"
}
const ExerciseComponent = ({ exercise }) => (
    <div className="user-component">
      <img src={`data:image/jpeg;base64,${exercise.files[0]}`} />
      <div>
        <h3>{exercise.name}</h3>
        <p>{exercise.series} / {exercise.times}</p>
      </div>
      <Link to={{
        pathname: `/exercise/${exercise.exerciseId}`,
        state: { id: exercise.exerciseId }
      }}>
            <Icon name="arrow-right" fill="white" />
        </Link>
    </div>
);


export default ExerciseComponent;
