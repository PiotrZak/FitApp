import React from 'react';
import { useHistory } from 'react-router-dom';
import GenericElement from 'components/molecules/GenericElement';
import styled from 'styled-components';
import { translate } from "utils/Translation";

export const possibleTypes = {
  categories: 'categories',
  category: 'category',
  exercises: 'exercises',
  exercise: 'exercise',
  plans: 'plans',
  plan: 'plan',
  users: 'users',
  user: 'user',
};

const StyledGenericElement = styled(GenericElement)`
  margin-bottom: .8rem;
`;

export const RenderType = ({
  theme, type, element, i,
}) => {
  const history = useHistory();
  const redirectToItem = (itemCase, id) => {
    history.push({
      pathname: `/${itemCase}/${id}`,
      state: { id },
    });
  };

  
  const renderType = () => {
    switch (type) {
      case possibleTypes.categories:

      let exerciseLabel =translate("Exercises");
        if(element.exercises == 1){
          exerciseLabel = translate("Exercise")
        }
        return (
          <StyledGenericElement
            key={i}
            onClick={() => redirectToItem(possibleTypes.category, element.categoryId)}
            headline={element.title}
            subline={`${element.exercises}  ${exerciseLabel}`}
            category={element.category}
            AvatarType="noAvatar"
          />
        );

      case 'users':
        return (
          <StyledGenericElement
            key={i}
            onClick={() => redirectToItem(possibleTypes.user, element.userId)}
            theme={theme}
            avatarType="circle"
            avatarUrl={element.avatar}
            headline={`${element.firstName}  ${element.lastName}`}
            user={element}
            subline={element.role}
          />
        );
      case 'plans':
        return (
          <StyledGenericElement
            onClick={() => redirectToItem(possibleTypes.plan, element.planId)}
            theme={theme}
            avatarType="noAvatar"
            key={i}
            headline={element.title}
            subline={element.creatorName}
            plan={element}
          />
        );

      case 'exercises':
        return (
          <StyledGenericElement
            key={i}
            avatarType="circle"
            avatarUrl = {element.files && element.files[0]}
            onClick={() => redirectToItem(possibleTypes.exercises, element.exerciseId)}
            headline={element.name}
            exercise={element}
          />
        );
    }
  };

  return (
    <>
      {renderType(type, element, i)}
    </>
  );
};
