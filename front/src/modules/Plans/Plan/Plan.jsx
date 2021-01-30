import React, { useState, useEffect, useCallback } from 'react';
import { exerciseService } from 'services/exerciseService';
import { commonUtil } from 'utils/common.util';
import 'react-multi-carousel/lib/styles.css';
import Search from 'components/molecules/Search';
import { translate } from 'utils/Translation';
import BackTopNav from 'components/molecules/BackTopNav';
import { CheckboxGenericComponent } from 'components/organisms/CheckboxGeneric';
import GlobalTemplate from 'templates/GlobalTemplate';
import Nav from 'components/atoms/Nav';
import { useThemeContext } from 'support/context/ThemeContext';
import { categoryService } from 'services/categoryService';
import SmallButton from 'components/atoms/SmallButton';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import { PlansPanel } from './microModules/PlansPanel';
import { PlansExercises } from './PlansExercises';
import { routes } from 'utils/routes';

const Plan = (props) => {
  const { theme } = useThemeContext();
  const [plan, setPlan] = useState();

  const [addExercisePanel] = useState('none');

  const [allExercises, setAllExercises] = useState([])
  const [exercises, setExercises] = useState();
  const [activeSelectedExercise, setActiveSelectedExercise] = useState([]);
  const [assignExercise, setAssignExercises] = useState('none');
  const [bottomSheet, setBottomSheet] = useState('none')

  const [planPanel, setPlanPanel] = useState('none')
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState();
  const  id  = props.match.params.id;
  const  title  = props.location.state.title;

  useEffect(() => {
    getAllCategories();
    getPlanExercise(id);
    getAllExercises();
  }, [id]);


  const getAllCategories = useCallback(() => {
    categoryService
      .getAllCategories()
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch(() => {
      });
  }, []);

  const getPlanExercise = useCallback((id) => {
    exerciseService
      .getExercisesByPlan(id)
      .then((data) => {
        const uniqueExercises = commonUtil.getUnique(data, 'name');
        setExercises(uniqueExercises);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getAllExercises = () => {
    exerciseService
      .getAllExercises()
      .then((data) => {
        setAllExercises(commonUtil.getUnique(data, 'name'));
      })
      .catch((error) => {
        console.error(error);
      });
  };



  const submissionHandleElement = (selectedData) => {
    const selectedExercises = commonUtil.getCheckedData(selectedData, 'exerciseId');
    setActiveSelectedExercise(selectedExercises);
    selectedExercises.length > 0 ? setPlanPanel('flex') : setPlanPanel('none');
  };

  const filterExercises = (event) => {
    setSearchTerm(event.target.value);
  };

  const results = !searchTerm
    ? exercises
    : exercises.filter((exercise) => exercise.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));

  return (
    <>
      <GlobalTemplate>
        <Nav>
        <BackTopNav route ={routes.plans} text={title} />
          <SmallButton iconName="plus" onClick={() => setBottomSheet('flex')} />
        </Nav>
        <Search callBack={filterExercises} placeholder={translate('ExerciseSearch')} />
        {results
          ? (
            <CheckboxGenericComponent
              dataType="exercises"
              displayedValue="name"
              dataList={results}
              onSelect={submissionHandleElement}
            />
          )
          : <p>{translate('NoExercises')}</p>}
      </GlobalTemplate>
      <PlansExercises
        selectedExercise={activeSelectedExercise}
        theme={theme}
        planId={id}
        categories={categories}
        planPanel={planPanel}
        setPlanPanel={setPlanPanel}
        isLoading={isLoading}
      />
      <PlansPanel
        bottomSheet={addExercisePanel}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        setAssignExercises={setAssignExercises}
        allExercises={allExercises}
        selectedExercise={activeSelectedExercise}
        theme={theme}
        planId={id}
        categories={categories}
        isLoading={isLoading}
      />
    </>
  );
};

export default Plan;
