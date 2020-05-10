import React from 'react';
import PropTypes from 'prop-types';


class FeedbackModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prod_id: 0,
      user_name: '',
      type_id: 0,
      comments: '',
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleSubmit() {
    this.props.handleFeedback(this.state);
    this.props.toggleModal();
    this.props.toggleFeedback();
  }

  handleInput(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleUpdate(event) {
    const { name, value } = event.target;
    this.setState({
      [name]: Number(value),
    });
  }

  componentDidMount() {
    this.setState({
      prod_id: Number(this.props.modalItem.id),
      user_name: 'dummy_user',
    });
  }

  render() {
    return (
      <div className="fb-modal">
        <div className="fb-modal-content">
          <div className="fb-modal-header">
            <h4 className="fb-modal-bold">Share your feedback</h4>
          </div>
          <div className="fb-modal-main">
            <img src={this.props.modalItem.image_url} className="fb-modal-image"/>
            <div className="fb-modal-name">{this.props.modalItem.name}</div>
            <div className="fb-modal-price">${this.props.modalItem.price}</div>
          </div>

          <form className="fb-modal-type" action="/action_page.php">
            <p className="fb-modal-bold">This item is:</p>
            <input type="radio" name="type_id" value="1" onClick={this.handleUpdate}></input>
            <label htmlFor="Unrelated"> Unrelated to what I&apos;m shopping for</label><br></br>
            <input type="radio" name="type_id" value="2" onClick={this.handleUpdate}></input>
            <label htmlFor="Inappropriate"> Inappropriate or offensive</label><br></br>
            <input type="radio" name="type_id" value="3" onClick={this.handleUpdate}></input>
            <label htmlFor="other"> Other</label>
          </form>
          <form className="fb-modal-comments" action="/action_page.php">
            <label className="fb-modal-bold" htmlFor="fname">Comments</label><br></br>
            <textarea type="text" name="comments" className="fb-modal-textarea" onChange={this.handleInput} placeholder="Include additional details here"></textarea>
          </form>

          <div className="fb-modal-footer">
            <div className="fb-modal-buttons">
              <button className="fb-modal-cancel" onClick={this.props.toggleModal}>Cancel</button>
              <button className="fb-modal-send" onClick={this.handleSubmit}>Send feedback</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

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
  handleFeedback: PropTypes.func,
  toggleFeedback: PropTypes.func,
};


export default FeedbackModal;
