import React from 'react';
import PropTypes from 'prop-types';


const FeedbackModal = ({ modalItem, toggleModal }) => (
    <div className="fb-modal">
      <div className="fb-modal-content">
        <div className="fb-modal-header">
          <h4>Share your feedback</h4>
        </div>
        <div className="fb-modal-main">
          <img src={modalItem.image_url}/>
          <div>{modalItem.name}</div>
          <div>{modalItem.price}</div>
          <form action="/action_page.php">
            <p>This item is:</p>
            <input type="radio" id="Unrelated" name="reason" value="Unrelated"></input>
            <label htmlFor="Unrelated">Unrelated to what I&apos;m shopping for</label><br></br>
            <input type="radio" id="Inappropriate" name="reason" value="Inappropriate"></input>
            <label htmlFor="Inappropriate">Inappropriate or offensive</label><br></br>
            <input type="radio" id="other" name="reason" value="other"></input>
            <label htmlFor="other">Other</label>
          </form>
          <form action="/action_page.php">
            <label htmlFor="fname">Comments:</label><br></br>
            <textarea type="text" id="fname" name="fname"></textarea>
          </form>
        </div>
        <div className="fb-modal-footer">
          <button onClick={toggleModal}>Cancel</button>
          <button onClick={toggleModal}>Send feedback</button>
        </div>
      </div>
    </div>
);

FeedbackModal.propTypes = {
  modalVisible: PropTypes.bool,
  toggleModal: PropTypes.func,
  modalItem: PropTypes.shape({
    image_url: PropTypes.string,
    id: PropTypes.string,
    name: PropTypes.string,
    product_url: PropTypes.string,
    is_prime: PropTypes.bool,
    price: PropTypes.string,
  }),
};


export default FeedbackModal;
