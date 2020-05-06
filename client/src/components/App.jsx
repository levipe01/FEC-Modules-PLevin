import React from 'react';
import Header from './Header.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentPage: 2,
      totalPages: 73,
    };

    this.resetCarousel = this.resetCarousel.bind(this);
  }

  resetCarousel() {
    this.setState({
      currentPage: 1,
    });
  }

  render() {
    return (
      <Header currentPage={this.state.currentPage}
      resetCarousel={this.resetCarousel} totalPages={this.state.totalPages}/>
    );
  }
}

export default App;
