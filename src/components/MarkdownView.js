// src/components/MarkdownView.js
import React from 'react';
import ReactMarkdown from 'react-markdown';

const MarkdownView = ({ content }) => {
  return (
    <div className="markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownView;
