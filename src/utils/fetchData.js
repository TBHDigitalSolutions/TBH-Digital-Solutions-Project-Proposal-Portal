// src/utils/fetchData.js
export const fetchData = async (filename = 'content.json') => {
  const url = `${process.env.PUBLIC_URL}/data/${filename}`; // Points to the local file in public/data/

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`Failed to fetch data: ${response.statusText}`);
    return response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
