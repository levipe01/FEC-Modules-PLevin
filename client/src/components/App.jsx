import React from 'react';
import Footer from './Footer.jsx';
import Gallery from './Gallery.jsx';

const axios = require('axios').default;

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      feedbackVisible: false,
    };

    this.toggleFeedback = this.toggleFeedback.bind(this);
    this.getAllProducts = this.getAllProducts.bind(this);
  }

  toggleFeedback() {
    const newState = !this.state.feedbackVisible;
    this.setState({
      feedbackVisible: newState,
    });
  }

  getAllProducts() {
    axios.get('http://localhost:3000/api/similar_products')
      .then((response) => {
        this.setState({
          products: response.data.rows,
        });
      })
      .catch((err) => err);
  }

  componentDidMount() {
    this.getAllProducts();
  }

  render() {
    return (
      <div>
        <Gallery products={this.state.products} feedbackVisible={this.state.feedbackVisible}/>
        <Footer toggleFeedback={this.toggleFeedback} feedbackVisible={this.state.feedbackVisible}/>
      </div>

    );
  }
}

export default App;
