/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import App from '../client/src/components/App.jsx';
import Footer from '../client/src/components/Footer.jsx';


describe('Unit Tests', () => {
  test('should render the app component on the screen', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toExist();
  });
});

describe('Unit Interaction Tests', () => {
  test('it should correctly update the state when resetCarouse is called', () => {
    const wrapper = mount(<App />);
    const mockSubmitHandler = () => {
      wrapper.setState({ feedbackVisible: true });
    };
    const header = shallow(
      <Footer
        feedbackVisible={false}
        toggleFeedback={mockSubmitHandler}
      />,
    );
    header.find('.feedbackButton').simulate('click');
    expect(wrapper.instance().state.feedbackVisible).toBe(true);
  });
});
