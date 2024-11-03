// src/utils/savePDF.js

import jsPDF from 'jspdf';

// Function to generate and save the PDF of the quote
export const savePDF = (quote) => {
  const doc = new jsPDF();
  doc.text(`Quote Title: ${quote.title}`, 10, 10);
  doc.text(`Price: $${quote.price}`, 10, 20);
  doc.text(`Description: ${quote.description}`, 10, 30);

  // Add line items if any
  if (quote.lineItems && quote.lineItems.length > 0) {
    let yOffset = 40;
    quote.lineItems.forEach((item) => {
      doc.text(`${item.label}: $${item.amount}`, 10, yOffset);
      yOffset += 10;
    });
  }

  // Save the generated PDF
  doc.save(`${quote.title}.pdf`);
};
