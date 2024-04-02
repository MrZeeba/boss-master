import React from 'react';
import renderer from 'react-test-renderer';

import SettingsPage from '../SettingsPage';

describe('<View />', () => {
  it('has 1 children', () => {
    const tree = renderer.create(<SettingsPage />).toJSON();
    expect(tree.children.length).toBe(1);
  });
});

it('renders correctly', () => {
  const tree = renderer.create(<SettingsPage />).toJSON();
  expect(tree).toMatchSnapshot();
});
