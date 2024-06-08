import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = () => {
  const [rules, setRules] = useState([]);
  const [audienceSize, setAudienceSize] = useState(0);

  const addRule = () => {
    setRules([...rules, { field: '', condition: '', value: '' }]);
  };

  const updateRule = (index, field, value) => {
    const newRules = [...rules];
    newRules[index][field] = value;
    setRules(newRules);
  };

  const checkAudienceSize = async () => {
    const response = await axios.post('http://localhost:3000/api/audience/check', { rules });
    setAudienceSize(response.data.size);
  };

  return (
    <div className="p-8 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Create Audience</h2>
      {rules.map((rule, index) => (
        <div key={index} className="mb-4">
          <input
            type="text"
            placeholder="Field"
            className="mr-2 p-2 border border-gray-300 rounded"
            value={rule.field}
            onChange={(e) => updateRule(index, 'field', e.target.value)}
          />
          <input
            type="text"
            placeholder="Condition"
            className="mr-2 p-2 border border-gray-300 rounded"
            value={rule.condition}
            onChange={(e) => updateRule(index, 'condition', e.target.value)}
          />
          <input
            type="text"
            placeholder="Value"
            className="p-2 border border-gray-300 rounded"
            value={rule.value}
            onChange={(e) => updateRule(index, 'value', e.target.value)}
          />
        </div>
      ))}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded mr-2"
        onClick={addRule}
      >
        Add Rule
      </button>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={checkAudienceSize}
      >
        Check Audience Size
      </button>
      <div className="mt-4">Audience Size: {audienceSize}</div>
    </div>
  );
};

export default AudienceForm;
