// src/pages/AITestPage.tsx
import React from 'react';
import CustomTextField from '../components/Textfield/CustomTextField'; // Make sure this path is correct

export default function AITestPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>DeepSeek AI Test Page</h1>
      <p>Type a question and press Enter to get an AI response:</p>
      <CustomTextField />
    </div>
  );
}