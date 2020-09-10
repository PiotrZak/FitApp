import { http } from "./http.service";

export const exerciseService = {
  getExercisesByCategory,
  getExercisesByPlan,
  getAllExercises,
  addExercise,
  editExercise,
  getExerciseById,
  deleteExerciseById
  };

// const apiURL = "http://test.eba-hxurpixx.eu-west-1.elasticbeanstalk.com"
const localapiURL = "http://localhost:5005"

const EXERCISES_URL = `${localapiURL}/Exercises`;

  function getAllExercises(body) {
    return http.get(EXERCISES_URL, body);
  }

  function getExercisesByCategory(id) {
    return http.get(`${EXERCISES_URL}/category/${id}`);
  }

  function getExercisesByPlan(id) {
    return http.get(`${EXERCISES_URL}/plan/${id}`);
  }

  function addExercise(body) {
    return http.postFile(`${EXERCISES_URL}/create`, body);
  }

  function editExercise(id, body) {
    return http.put(`${EXERCISES_URL}/${id}`, body);
  }

  function getExerciseById(id) {
    return http.get(`${EXERCISES_URL}/${id}`);
  }

  function deleteExerciseById(id) {
    return http.del(`${EXERCISES_URL}/${id}`);
  }
