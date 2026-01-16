import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render shows the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can log the error to a service like Sentry here
    console.error("Glimpse App Error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-950 text-white p-6">
          <h2 className="text-2xl font-bold mb-4">Something went wrong.</h2>
          <p className="text-zinc-400 mb-8 text-center max-w-md">
            We encountered an unexpected error. Don't worry, your generations are safe!
          </p>
          <button 
            onClick={() => window.location.href = '/'}
            className="px-6 py-2 bg-pink-600 rounded-full font-medium hover:bg-pink-700 transition-colors"
          >
            Go Back Home
          </button>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;