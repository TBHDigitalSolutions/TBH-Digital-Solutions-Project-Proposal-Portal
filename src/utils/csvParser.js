// src/utils/csvParser.js

/**
 * Parses CSV content into an array of objects.
 * Supports handling quoted fields, newlines within fields, and trimming spaces.
 * @param {string} csvContent - The raw CSV string.
 * @param {string} [delimiter=','] - The delimiter used in the CSV file (default is comma).
 * @returns {Array<Object>} - An array of objects where each object represents a row in the CSV.
 */
const parseCSV = (csvContent, delimiter = ',') => {
  if (!csvContent) return []; // Return an empty array if content is empty

  const rows = [];
  const lines = csvContent.split(/\r?\n/); // Handle both Unix (\n) and Windows (\r\n) line endings

  // If there are no lines, return an empty array
  if (lines.length === 0) return rows;

  // Extract headers from the first row
  const headers = extractFields(lines[0], delimiter);

  // Process remaining lines and convert them to objects
  for (let i = 1; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line) {
      const values = extractFields(line, delimiter);
      const rowObj = headers.reduce((acc, header, index) => {
        acc[header] = values[index] !== undefined ? values[index] : null; // Handle missing or empty values
        return acc;
      }, {});
      rows.push(rowObj);
    }
  }

  return rows;
};

/**
 * Extracts fields from a CSV line, handling quoted fields and commas inside quotes.
 * @param {string} line - A single line from the CSV.
 * @param {string} delimiter - The delimiter used in the CSV file.
 * @returns {Array<string>} - An array of values from the line.
 */
const extractFields = (line, delimiter) => {
  const regex = new RegExp(
    `\\s*(?:"([^"]*(?:""[^"]*)*)"|([^${delimiter}]+))\\s*${delimiter}?`,
    'g'
  );
  const fields = [];
  let match;
  while ((match = regex.exec(line)) !== null) {
    if (match[1] !== undefined) {
      // Handle quoted fields (replace double quotes with single)
      fields.push(match[1].replace(/""/g, '"'));
    } else {
      // Handle non-quoted fields
      fields.push(match[2] ? match[2].trim() : '');
    }
  }
  return fields;
};

export default parseCSV;
