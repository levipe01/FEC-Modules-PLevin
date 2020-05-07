/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../client/src/components/Footer.jsx';


describe('Footer Unit Tests', () => {
  test('should render the Footer Component', () => {
    const wrapper = shallow(<Footer
      feedbackVisible={true}
      toggleFeedback={() => {}}/>);
    expect(wrapper).toExist();
  });
});

describe('Toggle Feedback', () => {
  test('should invoke the toggleFeedback prop when the start over button is clicked', () => {
    const mockToggleFeedback = jest.fn();
    const wrapper = shallow(
      <Footer
        feedbackVisible={true}
        toggleFeedback={mockToggleFeedback}
      />,
    );
    const updateButton = wrapper.find('.feedbackButton');
    updateButton.simulate('click');
    expect(mockToggleFeedback).toHaveBeenCalled();
  });
});
