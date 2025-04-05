import { useState } from 'react';
import axios from 'axios';

const sections = [
  'Basic Info',
  'Attractions',
  'Food & Dining',
  'Travel Tips',
  'Trip Plan',
];

const filterOptions = [
  'Solo Female Traveler',
  'Budget Travel',
  'Luxury Travel',
  'Adventure Seeker',
  'Family Friendly',
];

const getFilterDescription = (filter) => {
  switch (filter) {
    case 'Solo Female Traveler':
      return 'Safe for solo female travelers. Look for women-only stays and tours.';
    case 'Budget Travel':
      return 'Affordable options like hostels, public transport, and free tours.';
    case 'Luxury Travel':
      return 'Offers luxury hotels, private guides, and fine dining.';
    case 'Adventure Seeker':
      return 'Great for hiking, diving, or extreme sports.';
    case 'Family Friendly':
      return 'Kid-friendly attractions and safe environments for families.';
    default:
      return 'No info available.';
  }
};

const SearchForm = () => {
  const [location, setLocation] = useState('');
  const [filters, setFilters] = useState([]);
  const [results, setResults] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('Basic Info');

  const toggleFilter = (filter) => {
    setFilters((prev) =>
      prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]
    );
  };

  const generatePrompt = () => {
    return `Give me a detailed travel guide for ${location}, including:
1. Basic Info
2. Top Attractions
3. Best Food & Dining Spots
4. Travel Tips
5. Sample Trip Plan`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResults('');

    try {
      const prompt = generatePrompt();

      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
        }
      );

      setResults(response.data.choices[0].message.content);
    } catch (error) {
      console.error(error);
      setResults('⚠️ Error: ' + (error.response?.data?.error?.message || 'Something went wrong.'));
    } finally {
      setLoading(false);
    }
  };

  const getSectionContent = () => {
    const regexMap = {
      'Basic Info': /(?:Basic Info|1\..*?)\n([\s\S]*?)(?:\n\d\.|$)/i,
      Attractions: /(?:Top Attractions|2\..*?)\n([\s\S]*?)(?:\n\d\.|$)/i,
      'Food & Dining': /(?:Food & Dining|3\..*?)\n([\s\S]*?)(?:\n\d\.|$)/i,
      'Travel Tips': /(?:Travel Tips|4\..*?)\n([\s\S]*?)(?:\n\d\.|$)/i,
      'Trip Plan': /(?:Trip Plan|5\..*?)\n([\s\S]*?)(?:\n\d\.|$)/i,
    };

    const match = results.match(regexMap[activeSection]);
    return match ? match[1].trim() : 'No data available for this section.';
  };

  return (
    <div className="min-h-screen bg-[#F0F0D7] p-4 sm:p-6">
      <div className="max-w-7xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row h-[90vh]">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 bg-[#F0F0D7] p-6 border-r border-[#ccc] overflow-y-auto">
          <h2 className="text-xl font-bold text-[#85A947] mb-4">🔎 Filters</h2>
          <div className="flex flex-col gap-3">
            {filterOptions.map((opt) => (
              <label key={opt} className="flex items-center space-x-2 text-sm text-[#333]">
                <input
                  type="checkbox"
                  value={opt}
                  checked={filters.includes(opt)}
                  onChange={() => toggleFilter(opt)}
                  className="accent-[#85A947]"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 flex flex-col overflow-hidden">
          <h1 className="text-3xl font-bold text-[#333] mb-4 text-center sm:text-left">
            🌍 Wanderlust Travel Guide
          </h1>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter location (e.g., Tokyo)"
              className="flex-1 px-4 py-3 border border-[#ccc] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#85A947]"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 bg-[#85A947] text-white rounded-lg font-semibold hover:bg-green-700 transition"
            >
              {loading ? 'Generating...' : 'Search'}
            </button>
          </form>

          {/* Section Tabs */}
          {results && (
            <div className="flex flex-wrap gap-2 mb-4">
              {sections.map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-full font-medium border transition ${
                    activeSection === section
                      ? 'bg-[#85A947] text-white'
                      : 'bg-[#F0F0D7] text-[#333] hover:bg-[#e0e0c7]'
                  }`}
                >
                  {section}
                </button>
              ))}
            </div>
          )}

          {/* AI Response Content */}
          {results && (
            <div className="flex-1 overflow-y-auto bg-white border border-[#ccc] rounded-xl p-5 text-[#333] shadow-inner whitespace-pre-wrap">
              <h2 className="text-2xl font-semibold mb-3 text-[#85A947]">{activeSection}</h2>
              {getSectionContent()}
            </div>
          )}

          {/* Filter-Based Insights */}
          {filters.length > 0 && (
            <div className="mt-6">
              <h2 className="text-xl font-bold text-[#333] mb-4">✨ Personalized Insights</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filters.map((filter) => (
                  <div
                    key={filter}
                    className="p-4 border rounded-2xl shadow bg-white hover:shadow-md transition"
                  >
                    <h3 className="text-lg font-semibold text-[#85A947] mb-2">{filter}</h3>
                    <p className="text-sm text-[#333]">{getFilterDescription(filter)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default SearchForm;
