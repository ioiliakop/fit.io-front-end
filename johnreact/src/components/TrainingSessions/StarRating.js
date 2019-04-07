import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

/**
 * Expects a rating of 0-5
 * Returns 5 stars with respective filled/empty status depending on input
 * 
 * @param {Number} props.rating
 */
function StarRating (props) {
    return (
        <React.Fragment>
         {Array.from({ length: 5 }, (v, i) => {
         return ((i + 1) <= props.rating) ? <FontAwesomeIcon key={i} icon="star" style={{color: '#EEBD01'}} /> : <FontAwesomeIcon key={i} icon={["far", "star"]} style={{color: '#EEBD01'}} />;
        })}
        </React.Fragment>
    );
}

export default StarRating;