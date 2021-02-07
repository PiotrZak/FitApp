import React, { useState, useEffect } from 'react';
import { exerciseService } from "services/exerciseService";
import { useHistory, Link } from "react-router-dom";
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";
import GlobalTemplate from 'templates/GlobalTemplate';
import SmallButton from 'components/atoms/SmallButton';
import Nav from 'components/atoms/Nav';
import BackTopNav from 'components/molecules/BackTopNav';
import { Headline, Subline } from 'components/typography';
import { translate } from 'utils/Translation';
import styled from 'styled-components';
import { useNotificationContext, ADD } from 'support/context/NotificationContext';
import ExercisePanel from './ExercisePanel';
import { useUserContext } from 'support/context/UserContext';
import ReactPlayer from 'react-player'

const InfoTab = styled.div`
  display:flex;
  border-bottom: 1px solid grey;
  align-items: center;
  justify-content: space-between;
  height:4.4rem;
`;

const Exercise = (props) => {

  const { user } = useUserContext();
  const { notificationDispatch } = useNotificationContext();

  const [exercise, setExercise] = useState();
  const [bottomSheet, setBottomSheet] = useState('none')
  const history = useHistory();

  const { match } = props;
  let id = match.params.id;

  useEffect(() => {
    getExercise(id)
  }, [id]);

  const getExercise = (id) => {
    exerciseService
      .getExerciseById(id)
      .then((data) => {
        setExercise(data);
        console.log(data)
      })
      .catch((error) => {
      });
  }

  const deleteExercise = () => {
    exerciseService
      .deleteExerciseById(id)
      .then(() => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { success: 'OK', message: translate('ExerciseDeleted') },
            type: 'positive',
          },
        });
        history.goBack()
      })
      .catch((error) => {
        notificationDispatch({
          type: ADD,
          payload: {
            content: { error, message: translate('ErrorAlert') },
            type: 'error',
          },
        });
      });
  }

  const Breakpoints = {
    desktop: {
      breakpoint: { max: 5000, min: 768 },
      items: 1,
    },
    laptop: {
      breakpoint: { max: 1024, min: 0 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 1,
    },
  };

  return (
    <>
      <GlobalTemplate>
        <Nav>
          {exercise && <BackTopNav text={exercise.title} />}
          {user.role != "user" &&
          exercise && <SmallButton onClick={() => setBottomSheet('flex')} iconName="plus" />}
        </Nav>

        {exercise && exercise.files &&
          <>
              <Video video ={exercise.files} videoName = {exercise.name}/>
            <Carousel
              swipeable={true}
              responsive={Breakpoints}
            >
              {exercise.files.map((file, i) =>
                <Slide key={i} img={file} />)}
            </Carousel>
          </>
        }
        {exercise &&
          <>
            <h1>{exercise.name}</h1>
            {exercise.series > 0 && <InfoTab><Headline>{translate('Series')}</Headline> <Subline>{exercise.series} times</Subline></InfoTab>}
            {exercise.times > 0 && <InfoTab><Headline>{translate('ExerciseTime')}</Headline><Subline>{exercise.times} s</Subline></InfoTab>}
            {exercise.repeats > 0 && <InfoTab><Headline>{translate('Repeat')}</Headline><Subline>{exercise.repeats} x</Subline></InfoTab>}
            {exercise.weight > 0 && <InfoTab><Headline>{translate('Weight')}</Headline><Subline>{exercise.weight} kg</Subline></InfoTab>}

            <h3>Description:</h3>
            <p>{exercise.description}</p>
          </>
        }
      </GlobalTemplate>
      <ExercisePanel
        props={props}
        bottomSheet={bottomSheet}
        setBottomSheet={setBottomSheet}
        exercise={exercise}
        deleteExercise={deleteExercise}
      />
    </>
  );
};

const ExerciseImageContainer = styled.img`
height: 400px;
width: auto;
object-fit: cover;
`;

const Video= ({video, videoName}) => {


  
  return(
    <>
    <ReactPlayer url={require(`../../../../../server/wwwroot/Movies/${videoName}.mp4`)} 
      controls = {true}/>
</>
  )
}


const Slide = ({ key, img }) => {
  return (
    <ExerciseImageContainer key={key} alt={key} src={`data:image/jpeg;base64,${img}`} />
  );
};

export default Exercise;
