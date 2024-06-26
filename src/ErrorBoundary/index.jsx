import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    this.logErrorToMyService(error, info.componentStack);
  }

  logErrorToMyService(error, componentStack) {
    console.error('Logged error: ', error, componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

ErrorBoundary.propTypes = {
  fallback: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
