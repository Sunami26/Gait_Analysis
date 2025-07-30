import React from 'react';

const Reports = () => {
  const result = JSON.parse(localStorage.getItem('latestReport'));

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">📄 Gait Analysis Report</h1>

      {result ? (
        <div className="bg-white rounded-xl shadow-md p-6 space-y-4">
          <p><strong>Status:</strong> <span className={result.status === 'Normal' ? 'text-green-600' : 'text-red-600'}>{result.status}</span></p>
          <p><strong>Gait Score:</strong> {result.gaitScore}/100</p>
          <p><strong>Remarks:</strong> {result.message}</p>
        </div>
      ) : (
        <div className="h-40 flex items-center justify-center text-gray-400 border border-dashed border-gray-300 rounded-lg">
          No report found. Please upload a gait video first.
        </div>
      )}
    </div>
  );
};

export default Reports;
