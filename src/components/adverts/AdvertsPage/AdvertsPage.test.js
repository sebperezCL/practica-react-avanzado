import React from 'react';
import { shallow } from 'enzyme';

import { AdvertsPage } from './AdvertsPage';

describe('AdvertsPage', () => {
  const props = {
    loading: false,
    error: null,
    filters: {
      name: 'name',
      sale: 'sale',
      price: [],
      tags: [],
    },
    adverts: [],
    searchAdverts: jest.fn(),
  };

  const render = () => shallow(<AdvertsPage {...props} />);

  test('snapshot', () => {
    const wrapper = render();
    expect(wrapper).toMatchSnapshot();
  });

  test('should render empty AdvertsPage with Refine your search message', () => {
    const wrapper = render();
    expect(props.searchAdverts).toHaveBeenCalled();
    expect(wrapper.find('span').text()).toBe('Refine your search');
  });

  test('should render AdvertsPage with List items', () => {
    props.adverts = [{ _id: 'id' }];
    const wrapper = render();
    expect(props.searchAdverts).toHaveBeenCalled();
    expect(wrapper.find('List').exists()).toBe(true);
  });
});
