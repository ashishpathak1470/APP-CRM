import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CampaignsList = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      const response = await axios.get('http://localhost:3000/api/campaigns');
      setCampaigns(response.data);
    };
    fetchCampaigns();
  }, []);

  return (
    <div className="p-8 bg-gray-100 rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Campaigns</h2>
      <ul>
        {campaigns.map((campaign) => (
          <li key={campaign._id} className="mb-2">
            <div className="p-4 bg-white rounded shadow-sm">
              {campaign.name} - {campaign.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CampaignsList;
