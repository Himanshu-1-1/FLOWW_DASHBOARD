import React from 'react';
import Card from '../UI/Card';

interface CompletionProgressProps {
  percentage: number;
}

const CompletionProgress: React.FC<CompletionProgressProps> = ({ percentage }) => {
  return (
    <Card>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Overall Progress</h3>
      <div className="relative pt-1">
        <div className="flex mb-2 items-center justify-between">
          <div>
            <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 dark:text-green-300 bg-green-200 dark:bg-green-900">
              Task Completion
            </span>
          </div>
          <div className="text-right">
            <span className="text-xs font-semibold inline-block text-green-600 dark:text-green-300">
              {percentage}%
            </span>
          </div>
        </div>
        <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200 dark:bg-green-900">
          <div
            style={{ width: `${percentage}%` }}
            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500 dark:bg-green-400 transition-all duration-500"
          ></div>
        </div>
      </div>
    </Card>
  );
};

export default CompletionProgress;