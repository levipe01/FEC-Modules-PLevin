/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import GalleryItem from '../client/src/components/GalleryItem.jsx';


describe('GalleryItem Unit Tests', () => {
  const sampleProduct = {
    id: '1000',
    name: 'Digital Feed Synthesizing Interface',
    product_url: 'http://norene.net',
    image_url: 'http://lorempixel.com/640/480/technics',
    is_prime: true,
    price: '278.00',
  };

  test('should render the correct Item details', () => {
    const wrapper = shallow(
      <GalleryItem
        item={sampleProduct}
        products={[sampleProduct]}
        toggleModal={() => {}}
        updateModalItem={() => {}}
        feedbackVisible={true}
      />,
    );
    expect(wrapper.find({ className: 'price' }).text()).toBe('$278.00');
    expect(wrapper.find({ href: 'http://norene.net' }).text()).toBe('Digital Feed Synthesizing Interface');
  });

  test('should invoke the updateModalItem & toggleModal prop when the feedback button is clicked', () => {
    const mockToggleModal = jest.fn();
    const mockUpdateModalItem = jest.fn();
    const wrapper = shallow(
      <GalleryItem
        item={sampleProduct}
        products={[sampleProduct]}
        toggleModal={mockToggleModal}
        updateModalItem={mockUpdateModalItem}
        feedbackVisible={true}
      />,
    );
    const updateButton = wrapper.find('.carousel-feedback-wrapper');
    const event = { target: { id: '1000' } };
    updateButton.simulate('click', event);
    expect(mockToggleModal).toHaveBeenCalled();
    expect(mockUpdateModalItem).toHaveBeenCalled();
  });
});
