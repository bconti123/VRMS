import { render } from '@testing-library/react';
import React from 'react';
import { expect, test } from 'vitest';
import LeaderBoard from './Leaderboard';

test('renders without crashing', () => {
  const { container } = render(<LeaderBoard />);
  expect(container).toMatchSnapshot();
});
