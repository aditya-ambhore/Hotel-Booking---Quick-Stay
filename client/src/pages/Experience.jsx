import React from "react";

const Experience = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Experience Luxury Like Never Before
        </h1>

        <p className="text-gray-600 text-lg leading-8 mb-10">
          Discover unforgettable experiences designed to make every journey
          special. From luxury accommodations and fine dining to adventure
          activities and wellness retreats, we help you create memories that
          last a lifetime.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🌴 Adventure
            </h2>
            <p className="text-gray-600">
              Explore mountains, beaches, hiking trails, and exciting outdoor
              adventures with our curated travel experiences.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🍽 Fine Dining
            </h2>
            <p className="text-gray-600">
              Enjoy world-class cuisine prepared by top chefs, offering a
              perfect blend of local flavors and international dishes.
            </p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 hover:shadow-xl transition">
            <h2 className="text-xl font-semibold text-gray-800 mb-3">
              🧘 Wellness
            </h2>
            <p className="text-gray-600">
              Relax with spa treatments, yoga sessions, and wellness programs
              designed to refresh your body and mind.
            </p>
          </div>
        </div>

        <div className="mt-12 bg-blue-50 rounded-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Why Choose Our Experiences?
          </h2>

          <ul className="list-disc pl-6 space-y-3 text-gray-600">
            <li>Handpicked premium destinations.</li>
            <li>Professional local guides.</li>
            <li>Luxury accommodations and services.</li>
            <li>24/7 customer support.</li>
            <li>Safe, secure, and unforgettable trips.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Experience;
