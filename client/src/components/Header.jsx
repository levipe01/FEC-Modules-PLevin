import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ totalPages, resetCarousel, currentPage }) => (
  <div className="header">
    <h2 className="header-left">Sponsored products related to this item</h2>
    <div className="header-right">
      <div className="page-nums">Page {currentPage} of {totalPages}</div>
      {
        currentPage > 1
        && <div className="start-over" onClick={resetCarousel}>
              <div className='seperator'></div>
              <div className='so-button'>Start Over</div>
            </div>
      }
    </div>
  </div>
);

Header.propTypes = {
  currentPage: PropTypes.number.isRequired,
  resetCarousel: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
};

export default Header;
