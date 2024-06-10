import React, { useState } from 'react';
import axios from 'axios';

const AudienceForm = () => {
  const [filters, setFilters] = useState([
    { field: '', operator: '', value: 0, logic: 'AND' },
  ]);
  const [operators] = useState([
    { value: 'greater_then', label: 'Greater Then' },
    { value: 'less_then', label: 'Less Than' },
    { value: 'greater_then_or_equal_to', label: 'Greater Then or Equal To' },
    { value: 'less_then_or_equal_to', label: 'Less Then or Equal To' },
    { value: 'equal_to', label: 'Equal To' },
    { value: 'not_equal_to', label: 'Not Equal To' },
  ]);
  const [audienceSize, setAudienceSize] = useState(0);

  const handleAddFilter = () => {
    setFilters([...filters, { field: '', operator: '', value: '', logic: 'AND' }]);
  };

  const handleRemoveFilter = (index) => {
    const updatedFilters = [...filters];
    updatedFilters.splice(index, 1);
    setFilters(updatedFilters);
  };

  const handleInputChange = (index, e) => {
    const { name, value } = e.target;
    const updatedFilters = [...filters];
    updatedFilters[index][name] = value;
    setFilters(updatedFilters);
  };

  const handleLogicChange = (index, e) => {
    const { value } = e.target;
    const updatedFilters = [...filters];
    updatedFilters[index].logic = value;
    setFilters(updatedFilters);
  };

  const validateFilters = () => {
    for (let filter of filters) {
      if (!filter.field || !filter.operator || filter.value === '') {
        return false;
      }
    }
    return true;
  };

  const handleCheckAudienceSize = async () => {
    if (!validateFilters()) {
      alert('All fields must be filled out.');
      return;
    }

    console.log('Sending filters to API:', filters);

    try {
      const response = await axios.post('http://localhost:3000/api/audience/size', { filters });
      console.log('API response:', response);
      setAudienceSize(response.data.size);
    } catch (error) {
      console.error('Error checking audience size:', error);
    }
  };

  const handleSaveAudience = async () => {
    if (!validateFilters()) {
      alert('All fields must be filled out.');
      return;
    }

    console.log('Saving filters to API:', filters);

    try {
      await axios.post('http://localhost:3000/api/audience/save', { filters });
      navigateToCampaignsPage();
    } catch (error) {
      console.error('Error saving audience:', error);
    }
  };

  const navigateToCampaignsPage = () => {
    // This is a placeholder. Replace it with your actual navigation logic.
    window.location.href = '/campaigns';
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-3xl w-full p-12 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-6">Create Audience</h2>
        {filters.map((filter, index) => (
          <React.Fragment key={index}>
            <div className="mb-6 flex items-center">
              <div className="flex-1 mr-4">
                <select
                  name="field"
                  value={filter.field}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-4 border rounded w-full text-lg"
                >
                  <option value="">Select Field</option>
                  <option value="totalspends">Total Spends</option>
                  <option value="totalvisits">Max Visits</option>
                </select>
              </div>
              <div className="flex-1 mr-4">
                <select
                  name="operator"
                  value={filter.operator}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-4 border rounded w-full text-lg"
                >
                  <option value="">Select Operator</option>
                  {operators.map((operator, idx) => (
                    <option key={idx} value={operator.value}>{operator.label}</option>
                  ))}
                </select>
              </div>
              <div className="flex-1 mr-4">
                <input
                  type="number"
                  name="value"
                  value={filter.value}
                  onChange={(e) => handleInputChange(index, e)}
                  className="p-4 border rounded w-full text-lg"
                />
              </div>
              <button onClick={() => handleRemoveFilter(index)} className="bg-red-500 text-white py-3 px-6 rounded hover:bg-red-600 text-lg">Remove</button>
            </div>
          </React.Fragment>
        ))}
        <div className="mb-6">
          <button onClick={handleAddFilter} className="bg-green-500 text-white py-3 px-6 rounded hover:bg-green-600 text-lg">Add Filter</button>
        </div>
        <div className="mb-6">
          <button onClick={handleCheckAudienceSize} className="bg-indigo-500 text-white py-3 px-6 rounded hover:bg-indigo-600 text-lg">Check Audience Size</button>
        </div>
        <div className="mb-6">
          <p className="text-2xl">Audience Size: {audienceSize}</p>
        </div>
        <div className="mb-6 flex justify-center">
          <button onClick={handleSaveAudience} className="bg-blue-500 text-white py-3 px-6 rounded hover:bg-blue-600 text-lg">Save Audience and Go to Campaigns</button>
        </div>
      </div>
    </div>
  );
};

export default AudienceForm;
