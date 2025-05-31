// src/components/ErrorBoundary.jsx
import React from 'react';
import { AlertTriangle } from 'lucide-react';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error in ErrorBoundary:", error, errorInfo);
        this.setState({ errorInfo });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen bg-red-50 dark:bg-red-950 p-4 text-center">
                    <AlertTriangle size={64} className="text-red-500 dark:text-red-400 mb-6" />
                    <h1 className="text-3xl font-bold text-red-700 dark:text-red-200 mb-3">Oops! Something Went Wrong.</h1>
                    <p className="text-red-600 dark:text-red-300 mb-6 max-w-md">
                        We've encountered an unexpected issue. Please try refreshing the page, or contact support if the problem persists.
                    </p>
                    {this.state.error && (
                        <details className="mt-4 p-4 bg-red-100 dark:bg-red-900/70 rounded-lg text-sm w-full max-w-lg text-left shadow-md">
                            <summary className="font-semibold text-red-700 dark:text-red-200 cursor-pointer hover:text-red-800 dark:hover:text-red-100">Error Details</summary>
                            <pre className="mt-3 p-2 bg-white dark:bg-gray-800 rounded whitespace-pre-wrap break-all text-red-600 dark:text-red-300 text-xs border border-red-200 dark:border-red-700">
                {this.state.error.toString()}
                                {this.state.errorInfo && this.state.errorInfo.componentStack && (
                                    <>
                                        <br />
                                        <br />
                                        <strong>Component Stack:</strong>
                                        {this.state.errorInfo.componentStack}
                                    </>
                                )}
              </pre>
                        </details>
                    )}
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        Refresh Page
                    </button>
                </div>
            );
        }
        return this.props.children;
    }
}

export default ErrorBoundary;
