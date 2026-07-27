import React from "react";

const About = () => {
  return (
    <div className="px-6 md:px-16 lg:px-24 py-24">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-14">
          <h1 className="text-4xl font-bold text-gray-800">About QuickStay</h1>
          <p className="mt-4 text-gray-600 max-w-3xl mx-auto leading-7">
            At QuickStay, we believe every journey deserves a comfortable and
            memorable stay. Our mission is to connect travelers with the best
            hotels and unique experiences at affordable prices.
          </p>
        </div>

        {/* About Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?w=900"
              alt="Luxury Hotel"
              className="rounded-2xl shadow-lg w-full h-[400px] object-cover"
            />
          </div>

          <div>
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              Who We Are
            </h2>

            <p className="text-gray-600 leading-8 mb-5">
              QuickStay is a modern hotel booking platform designed to make
              travel planning simple and stress-free. Whether you're looking for
              luxury resorts, business hotels, or budget-friendly stays, we
              provide carefully selected accommodations to suit every traveler.
            </p>

            <p className="text-gray-600 leading-8">
              We are committed to offering secure bookings, transparent pricing,
              and excellent customer support, ensuring every trip becomes a
              memorable experience.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
          <div className="bg-gray-50 rounded-xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-600">500+</h2>
            <p className="text-gray-600 mt-2">Hotels</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-600">10K+</h2>
            <p className="text-gray-600 mt-2">Happy Guests</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-600">100+</h2>
            <p className="text-gray-600 mt-2">Destinations</p>
          </div>

          <div className="bg-gray-50 rounded-xl p-6 text-center shadow">
            <h2 className="text-3xl font-bold text-blue-600">24/7</h2>
            <p className="text-gray-600 mt-2">Support</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mt-20">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-10">
            Why Choose Us?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">🏨 Premium Hotels</h3>
              <p className="text-gray-600">
                Discover carefully selected hotels offering comfort, quality,
                and exceptional hospitality.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">💳 Secure Booking</h3>
              <p className="text-gray-600">
                Enjoy safe and secure online bookings with transparent pricing
                and instant confirmation.
              </p>
            </div>

            <div className="bg-white shadow-lg rounded-xl p-6">
              <h3 className="text-xl font-semibold mb-3">⭐ Trusted Service</h3>
              <p className="text-gray-600">
                Thousands of satisfied travelers trust us for reliable hotel
                bookings and excellent customer support.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-blue-600 rounded-2xl text-white py-12 px-6">
          <h2 className="text-3xl font-bold mb-4">
            Ready for Your Next Adventure?
          </h2>

          <p className="mb-6 text-blue-100">
            Find the perfect hotel and enjoy a seamless booking experience with
            QuickStay.
          </p>

          <button className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition">
            Book Your Stay
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
