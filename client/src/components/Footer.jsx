import React from 'react';
import PropTypes from 'prop-types';

const Footer = ({ toggleFeedback, feedbackVisible }) => (
    <div className="feedbackWrapper">
      {
        !feedbackVisible
          ? <div className="feedbackButton" onClick={toggleFeedback}>Ad Feedback</div>
          : <div className="feedbackButton" onClick={toggleFeedback}>Hide Feedback</div>
      }
    </div>
);

Footer.propTypes = {
  toggleFeedback: PropTypes.func.isRequired,
  feedbackVisible: PropTypes.bool.isRequired,
};

export default Footer;
