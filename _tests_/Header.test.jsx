/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import Header from '../client/src/components/Header.jsx';


describe('Header Render Tests', () => {
  test('should render the Header component on the screen', () => {
    const wrapper = shallow(<Header
      currentPage={2}
      resetCarousel={() => {}}
      totalPages={10}
    />);
    expect(wrapper).toExist();
  });
});


describe('Resets Carousel', () => {
  test('should invoke the resetCarousel prop when the start over button is clicked', () => {
    const mockRestCarousel = jest.fn();
    const wrapper = shallow(
      <Header
        currentPage={2}
        resetCarousel={mockRestCarousel}
        totalPages={10}
      />,
    );
    const updateButton = wrapper.find('.start-over');
    updateButton.simulate('click');
    expect(mockRestCarousel).toHaveBeenCalled();
  });
});
