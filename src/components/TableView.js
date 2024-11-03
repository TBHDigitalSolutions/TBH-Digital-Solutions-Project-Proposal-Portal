// src/components/TableView.js

import React from 'react';

const TableView = ({ data }) => {
  if (!data || !data.length) return <p className="text-gray-700 dark:text-gray-300">No data available.</p>;

  return (
    <table className="w-full border-collapse rounded-lg shadow-lg">
      <thead>
        <tr className="bg-gray-100 dark:bg-gray-700">
          {Object.keys(data[0]).map((header, idx) => (
            <th key={idx} className="p-2 border-b text-left text-gray-900 dark:text-white font-bold">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => (
          <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-600">
            {Object.values(row).map((cell, cellIdx) => (
              <td key={cellIdx} className="p-2 border-b text-gray-700 dark:text-gray-300">
                {cell || "-"}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableView;
