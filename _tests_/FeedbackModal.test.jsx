/* eslint-env jest */
import React from 'react';
import { shallow, mount } from 'enzyme';
import FeedbackModal from '../client/src/components/FeedbackModal.jsx';


describe('Modal Unit Tests', () => {
  const sampleProduct = {
    id: '1000',
    name: 'Digital Feed Synthesizing Interface',
    product_url: 'http://norene.net',
    image_url: 'http://lorempixel.com/640/480/technics',
    is_prime: true,
    price: '278.00',
  };

  test('should render the FeedbackModal Component', () => {
    const wrapper = shallow(<FeedbackModal
      modalItem={sampleProduct}
      toggleModal={() => {}}
      toggleFeedback={() => {}}
    />);
    expect(wrapper).toExist();
  });

  test('should invoke the toggleModal prop when the cancel button is clicked', () => {
    const mockToggleModal = jest.fn();
    const wrapper = shallow(
      <FeedbackModal
        modalItem={sampleProduct}
        toggleModal={mockToggleModal}
        toggleFeedback={() => {}}
      />,
    );
    const updateButton = wrapper.find('.fb-modal-cancel');
    updateButton.simulate('click');
    expect(mockToggleModal).toHaveBeenCalled();
  });

  test('should invoke the sendFeedback method when the submit button is clicked', () => {
    const mockSendFeedback = jest.fn();
    const wrapper = shallow(
      <FeedbackModal
        modalItem={sampleProduct}
        toggleModal={() => {}}
        toggleFeedback={() => {}}
      />,
    );
    wrapper.instance().sendFeedback = mockSendFeedback;
    const updateButton = wrapper.find('.fb-modal-send');
    updateButton.simulate('click');
    expect(mockSendFeedback).toHaveBeenCalled();
  });

  test('should render the correct modalItem details', () => {
    const wrapper = shallow(
      <FeedbackModal
        modalItem={sampleProduct}
        handleFeedback={() => {}}
        toggleModal={() => {}}
        toggleFeedback={() => {}}
      />,
    );
    expect(wrapper.find('.fb-modal-price').text()).toBe('$278.00');
    expect(wrapper.find('.fb-modal-name').text()).toBe('Digital Feed Synthesizing Interface');
  });

  test('it should correctly update the state when textarea is updated', () => {
    const wrapper = mount(
      <FeedbackModal
        modalItem={sampleProduct}
        handleFeedback={() => {}}
        toggleModal={() => {}}
        toggleFeedback={() => {}}
      />,
    );

    const event = { target: { value: 'this is a test', name: 'comments' } };
    wrapper.find('textarea').simulate('change', event);
    expect(wrapper.instance().state.comments).toBe('this is a test');
  });
});
