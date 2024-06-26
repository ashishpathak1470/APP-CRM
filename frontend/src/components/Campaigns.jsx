import React, { useEffect, useState } from "react";
import axios from "axios";

const Campaigns = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      const response = await axios.get("https://crm-server-1-rfg3.onrender.com/api/campaigns");
      setCampaigns(response.data.campaigns.reverse());
    } catch (error) {
      console.error("Error fetching campaigns:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-7 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full p-4 sm:p-8 bg-white shadow-md rounded-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-indigo-800">
          Campaigns
        </h2>
        <div>
          {campaigns.map((campaign) => (
            <div
              key={campaign._id}
              className="border-b border-gray-200 pb-4 mb-4"
            >
              <p className="text-gray-800 text-base sm:text-lg font-semibold">
                Created At:{" "}
                <span className="font-normal">
                  {new Date(campaign.createdAt).toLocaleString()}
                </span>
              </p>
              <p className="text-gray-800 text-base sm:text-lg font-semibold">
                Audience Size:{" "}
                <span className="font-bold text-indigo-600">
                  {campaign.audienceSize}
                </span>
              </p>
              <p className="text-gray-800 text-base sm:text-lg font-semibold">
                Status:{" "}
                <span
                  className={`font-bold ${
                    campaign.status === "SENT"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  {campaign.status}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Campaigns;
