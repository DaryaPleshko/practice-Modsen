import React from 'react';
import { iErrorBoundaryProps, iErrorBoundaryState } from '../interface';
class ErrorBoundary extends React.Component<iErrorBoundaryProps, iErrorBoundaryState> {
  constructor(props: iErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): iErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo): void {
    this.logErrorToMyService(error, info.componentStack);
  }

  logErrorToMyService(error: Error, componentStack: string | null | undefined): void {
    console.error('Logged error: ', error, componentStack);
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}

export default ErrorBoundary;
