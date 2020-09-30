import React from "react";
import { Link } from 'react-router-dom';
import Icon from 'components/atoms/Icon';
import { planService } from "services/planService";

const GenericElement = ({
    handleElement,
    id,
    className,
    headline,
    subline,
    image,
    checkbox,
    secondaryMenu,
    exercise,
    category,
    plan,
    user,
    circle,
}) => {

    const types = [exercise, category, plan, user]

    return (
        <div className={className  ? className : "rectangleButton"}>
            <div className="rectangleButton__wrapper">
                {image
                    ? <div
                        className={`menuButton__image ${
                            circle &&
                            ' circle'
                            }`}
                    ><img src={`data:image/jpeg;base64,${image}`} /></div>
                    : <div
                        className={`menuButton__image-empty ${
                            circle &&
                            ' circle'
                            }`}

                    />}

                <div className="rectangleButton-info">
                    <h3 className="rectangleButton-info__headline">{headline}</h3>
                    <p className="rectangleButton-info__subline">{subline}</p>
                </div>
            </div>
            <div className="rectangleButton__menu">
            </div>
        </div>
    )
}

export default GenericElement;