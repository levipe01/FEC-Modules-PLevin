import React from 'react';
import Footer from './Footer.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      feedbackVisible: false,
    };

    this.toggleFeedback = this.toggleFeedback.bind(this);
  }

  toggleFeedback() {
    const newState = !this.state.feedbackVisible;
    this.setState({
      feedbackVisible: newState,
    });
  }

  render() {
    return (
      <Footer toggleFeedback={this.toggleFeedback} feedbackVisible={this.state.feedbackVisible}/>
    );
  }
}

export default App;
