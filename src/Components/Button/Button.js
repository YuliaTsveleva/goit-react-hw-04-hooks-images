import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ loadMore }) {
  return (
    <button id="loadMore" onClick={loadMore} type="button" className={s.Button}>
      Load more
    </button>
  );
}
export default Button;

Button.propTypes = {
  loadMore: PropTypes.func,
};
