// src/hoc/withData.js
import React, { useState, useEffect } from 'react';
import { fetchData } from '../utils/fetchData';

const withData = (WrappedComponent, jsonFile, dataId) => {
  return (props) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadData = async () => {
        try {
          const jsonData = await fetchData(jsonFile);
          if (!jsonData) throw new Error(`No data found in ${jsonFile}`);

          const dataSource = jsonData.steps || jsonData.slides || []; // Default to empty array if not found

          const specificData = dataSource.find((item) => item.id === dataId);
          if (!specificData) throw new Error(`No data found for ID ${dataId} in ${jsonFile}`);

          setData(specificData);
        } catch (err) {
          console.error("Error loading data:", err);
          setError(`Failed to load data: ${err.message}`);
        } finally {
          setLoading(false);
        }
      };

      loadData();
    }, [jsonFile, dataId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!data) return <div className="text-gray-500">No data found.</div>;

    return <WrappedComponent {...props} data={data} />;
  };
};

export default withData;
