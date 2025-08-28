import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Button from '../Button';
import { ThemeProvider } from '@/theme/ThemeProvider';

// Wrapper component to provide theme context to the Button
const ButtonWithTheme = (props: any) => (
  <ThemeProvider>
    <Button {...props} />
  </ThemeProvider>
);

describe('Button', () => {
  it('renders correctly with a title', () => {
    const { getByText } = render(<ButtonWithTheme title="Press Me" />);
    expect(getByText('Press Me')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<ButtonWithTheme title="Press Me" onPress={onPressMock} />);
    fireEvent.press(getByText('Press Me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it('is disabled when the disabled prop is true', () => {
    const onPressMock = jest.fn();
    const { getByText } = render(<ButtonWithTheme title="Press Me" onPress={onPressMock} disabled />);
    const button = getByText('Press Me');
    fireEvent.press(button);
    expect(onPressMock).not.toHaveBeenCalled();
    // Note: React Native Testing Library doesn't directly expose style checks easily.
    // We infer disabled state from behavior.
  });

  it('shows an activity indicator when isLoading is true', () => {
    const { queryByText, UNSAFE_getByType } = render(<ButtonWithTheme title="Press Me" isLoading />);
    
    // The title should not be visible
    expect(queryByText('Press Me')).toBeNull();
    
    // Check if ActivityIndicator is present
    const activityIndicator = UNSAFE_getByType('ActivityIndicator');
    expect(activityIndicator).toBeTruthy();
  });
});
