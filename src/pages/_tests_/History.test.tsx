import React from 'react';
import renderer from 'react-test-renderer';

import History from '../History';

describe('<View />', () => {
  it('has 1 children', () => {
    const tree = renderer.create(<History />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<History />).toJSON();
  expect(tree).toMatchSnapshot();
});
