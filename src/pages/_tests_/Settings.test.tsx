import React from 'react';
import renderer from 'react-test-renderer';

import Settings from '../Settings';

describe('<View />', () => {
  it('has 1 children', () => {
    const tree = renderer.create(<Settings />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<Settings />).toJSON();
  expect(tree).toMatchSnapshot();
});
