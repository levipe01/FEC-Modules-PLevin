import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      test: [],
    };
  }


  render() {
    return (
      <h1 test={this.state.test}>Hello From App </h1>
    );
  }
}

export default App;
