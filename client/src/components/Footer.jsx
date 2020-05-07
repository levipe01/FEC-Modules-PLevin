import React from 'react';
import PropTypes from 'prop-types';

const Footer = (props) => (
    <div className="feedbackWrapper">
      {
        !props.feedbackVisible
          ? <div className="feedbackButton" onClick={props.toggleFeedback}>Ad Feedback</div>
          : <div className="feedbackButton" onClick={props.toggleFeedback}>Hide Feedback</div>
      }
    </div>
);

Footer.propTypes = {
  toggleFeedback: PropTypes.func.isRequired,
  feedbackVisible: PropTypes.bool.isRequired,
};

export default Footer;
