import React, { useState } from "react";
import { MapPin, Users, Wifi, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Chatbot from "./Chatbot";

const features = [
  {
    icon: <Users size={40} />,
    title: "Personalized Experience",
    description: "Tailor your journey to your travel style and preferences.",
    color: "#85A947",
  },
  {
    icon: <MapPin size={40} />,
    title: "Top Locations",
    description: "Discover hidden gems and iconic spots across the globe.",
    color: "#85A947",
  },
  {
    icon: <Wifi size={40} />,
    title: "Stay Connected",
    description: "Strong network and support throughout your trip.",
    color: "#85A947",
  },
  {
    icon: <Globe size={40} />,
    title: "Global Reach",
    description: "Explore destinations in over 100+ countries.",
    color: "#85A947",
  },
];

const allPlaces = [
  { name: "Santorini, Greece", image: "https://static.wixstatic.com/media/b5c872_2db990f1774c4d1fa2669d4b86886ea4~mv2.jpg/v1/fill/w_2500,h_1666,al_c/b5c872_2db990f1774c4d1fa2669d4b86886ea4~mv2.jpg" },
  { name: "Kyoto, Japan", image: "https://www.advantour.com/img/japan/images/kyoto.jpg" },
  { name: "Banff, Canada", image: "https://www.erikastravels.com/wp-content/uploads/2015/11/Lake-Moraine-in-Banff-Canada-1.jpg" },
  { name: "Marrakech, Morocco", image: "https://img2.10bestmedia.com/Images/Photos/383159/GettyImages-1124472547_54_990x660.jpg?auto=webp&width=3840&quality=75" },
  { name: "Amalfi Coast, Italy", image: "https://www.worldatlas.com/r/w1200/upload/08/fb/59/shutterstock-390573763.jpg" },
  { name: "Bali, Indonesia", image: "https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" },
  { name: "Petra, Jordan", image: "https://www.state.gov/wp-content/uploads/2019/04/Japan-2107x1406.jpg" },
  { name: "Paris, France", image: "https://www.captureatrip.com/_next/image?url=https%3A%2F%2Fcaptureatrip-cms-storage.s3.ap-south-1.amazonaws.com%2FPlaces_To_Visit_In_France_177c888f3f.webp&w=3840&q=50" },
  { name: "Dubai, UAE", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSx5i7zYFd9h1kvhf7ZB8tFCMpwFW4IAzFcdA&s" },
  { name: "Cape Town, South Africa", image: "https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" },
  { name: "Queenstown, New Zealand", image: "https://img2.10bestmedia.com/Images/Photos/383159/GettyImages-1124472547_54_990x660.jpg?auto=webp&width=3840&quality=75" },
  { name: "Prague, Czech Republic", image: "https://cdn.britannica.com/69/156369-050-75E7FD08/skyline-Dubai-United-Arab-Emirates.jpg" },
  { name: "Cusco, Peru", image: "https://img2.10bestmedia.com/Images/Photos/383159/GettyImages-1124472547_54_990x660.jpg?auto=webp&width=3840&quality=75" },
  { name: "Barcelona, Spain", image: "https://mediaim.expedia.com/destination/9/cd8a3f3db7149b0ce36d052aea1182df.jpg" },
  { name: "Hallstatt, Austria", image: "https://img2.10bestmedia.com/Images/Photos/383159/GettyImages-1124472547_54_990x660.jpg?auto=webp&width=3840&quality=75" },
  { name: "Seoul, South Korea", image: "https://balidave.com/wp-content/uploads/2022/11/best-hotel-bali.jpeg" }
];

export default function WhyWanderlust() {
  const [visibleCount, setVisibleCount] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 4, filteredPlaces.length));
  };

  const filteredPlaces = allPlaces.filter((place) =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Why Wanderlust Caves Section */}
      <Chatbot/>
      <section className="py-16 px-4 bg-[#F0F0D7] text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Why Wanderlust Caves?</h2>
          <p className="text-gray-600 text-lg">
            Here’s what makes us your best travel buddy.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-6 text-center border-t-4"
              style={{ borderTopColor: feature.color }}
            >
              <div className="mb-6 flex items-center justify-center">
                <div
                  className="w-16 h-16 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: feature.color }}
                >
                  <div className="text-white">{feature.icon}</div>
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Popular Destinations Section */}
      <section className="py-16 px-4 bg-white text-gray-800">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2 text-[#85A947]">Popular Destinations</h2>
          <p className="text-gray-500 mb-6">Search for trending destinations around the world</p>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Search city (e.g. Paris, Bali...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full max-w-md px-4 py-2 border border-[#85A947] rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#85A947]"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredPlaces.slice(0, visibleCount).map((place, index) => (
            <div
              key={index}
              className="bg-white rounded-xl overflow-hidden border border-[#85A947] shadow hover:shadow-lg transition duration-300"
            >
              <div className="h-40 w-full bg-gray-100">
                <img
                  src={place.image}
                  alt={place.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="bg-[#85A947] text-white py-3 px-4 text-base font-medium text-left">
                {place.name}
              </div>
            </div>
          ))}
        </div>

        {filteredPlaces.length === 0 && (
          <div className="text-center mt-8 text-gray-500">
            No destinations match your search.
          </div>
        )}

        {visibleCount < filteredPlaces.length && (
          <div className="mt-10 flex justify-center">
            <button
              onClick={loadMore}
              className="px-6 py-3 rounded-full bg-[#85A947] text-white hover:bg-[#F0F0D7] hover:text-[#85A947] transition"
            >
              Load More
            </button>
          </div>
        )}
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-[#85A947] text-white py-20 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Share Your Travel Stories?</h2>
          <p className="text-lg mb-6">
            Inspire others with your adventures. Submit your journey, tips, or memories and become part of the Wanderlust Caves community.
          </p>
          <button
            className="bg-white text-[#85A947] font-semibold py-3 px-8 rounded-2xl hover:bg-[#F0F0D7] transition duration-300"
            onClick={() => navigate('/blog')}
          >
            Share Your Story
          </button>
          <button
            className="bg-white ml-5 text-[#85A947] font-semibold py-3 px-8 rounded-2xl hover:bg-[#F0F0D7] transition duration-300"
            onClick={() => navigate('/subscription')}
          >
            View Subscription Plans
          </button>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-[#333] text-white py-14 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
          <div>
            <h3 className="text-2xl font-bold mb-3">Wanderlust Caves</h3>
            <p className="text-sm">
              Explore the world, discover hidden gems, and create unforgettable memories. Your journey begins here.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#85A947]">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Home</a></li>
              <li><a href="#" className="hover:underline">Destinations</a></li>
              <li><a href="#" className="hover:underline">Stories</a></li>
              <li><a href="#" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#85A947]">Explore</h4>
            <ul className="space-y-1 text-sm">
              <li><a href="#" className="hover:underline">Solo Travel</a></li>
              <li><a href="#" className="hover:underline">Food & Culture</a></li>
              <li><a href="#" className="hover:underline">Travel Tips</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-3 text-[#85A947]">Join Our Newsletter</h4>
            <input
              type="email"
              placeholder="Your email"
              className="w-full p-2 rounded-lg text-black mb-3"
            />
            <button className="bg-[#85A947] text-white font-semibold px-4 py-2 rounded-lg hover:bg-[#F0F0D7] hover:text-[#85A947] transition">
              Subscribe
            </button>
            <div className="mt-4 flex justify-center md:justify-start gap-4">
              <a href="#"><i className="fab fa-facebook-f hover:text-[#85A947]"></i></a>
              <a href="#"><i className="fab fa-instagram hover:text-[#85A947]"></i></a>
              <a href="#"><i className="fab fa-twitter hover:text-[#85A947]"></i></a>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center text-sm text-[#F0F0D7]">
          &copy; {new Date().getFullYear()} Wanderlust Caves. All rights reserved.
        </div>
      </footer>
    </>
  );
}
