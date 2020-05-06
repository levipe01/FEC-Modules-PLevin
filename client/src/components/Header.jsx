import React from 'react';
import PropTypes from 'prop-types';

const Header = (props) => (
  <div className="header">
    <h2 className="header-left">Sponsored products related to this item</h2>
    <div className="header-right">
<div className="page-nums">Page {props.currentPage} of {props.totalPages}</div>
      {
        props.currentPage > 1
        && <div className="start-over" onClick={props.resetCarousel}>
              <div className='seperator'></div>
              <div className='so-button'>Start Over</div>
            </div>
      }
    </div>
  </div>
);

Header.propTypes = {
  currentPage: PropTypes.number,
  resetCarousel: PropTypes.func,
  totalPages: PropTypes.number,
};

export default Header;
