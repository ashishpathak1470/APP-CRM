import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/campaigns');
      setCampaigns(response.data.campaigns.reverse());
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full p-8 bg-white shadow-md rounded-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-indigo-800">Campaigns</h2>
        <div>
          {campaigns.map(campaign => (
            <div key={campaign._id} className="border-b border-gray-200 pb-4 mb-4">
              <p className="text-gray-800 text-lg font-semibold">Created At: <span className="font-normal">{new Date(campaign.createdAt).toLocaleString()}</span></p>
              <p className="text-gray-800 text-lg font-semibold">Audience Size: <span className="font-bold text-indigo-600">{campaign.audienceSize}</span></p>
              <p className="text-gray-800 text-lg font-semibold">Status: <span className={`font-bold ${campaign.status === 'SENT' ? 'text-green-600' : 'text-red-600'}`}>{campaign.status}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
