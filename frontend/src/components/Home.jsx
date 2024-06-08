import React from "react";

function Home() {
  return (
    <section className="dark:text-gray-800 flex items-center justify-center min-h-screen">
      <div className="container flex flex-col lg:flex-row justify-center items-center p-6 mx-auto lg:py-24 h-full">
        <div className="flex items-center justify-center p-6 h-full w-full lg:w-1/2">
          <img
            src="https://img.freepik.com/free-vector/gradient-crm-illustration_23-2149373198.jpg?size=626&ext=jpg&ga=GA1.1.523283729.1717857103&semt=sph"
            alt="CRM Dashboard"
            className="object-contain h-full w-full max-w-lg lg:max-w-none shadow-2xl rounded-xl"
          />
        </div>
        <div className="flex flex-col justify-center p-6 text-center rounded-sm w-full lg:w-1/2 lg:text-left lg:ml-12 h-full">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-none">
            Boost Your Business with
            <span className="text-orange-500"> Our CRM</span>
          </h1>
          <p className="mt-8 mb-12 text-lg md:text-xl">
            Streamline your sales and improve customer relationships
            effortlessly.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Home;
