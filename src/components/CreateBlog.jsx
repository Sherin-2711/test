import React, { useState, useEffect } from "react";

const sections = [
  { id: "basic", name: "Basic Information", icon: "📝" },
  { id: "attractions", name: "Attractions", icon: "🌄" },
  { id: "create", name: "Create", icon: "✍" },
  { id: "food", name: "Food Recommendations", icon: "🍽" },
  { id: "tips", name: "Trips & Tips", icon: "🧳" },
  { id: "post", name: "Post", icon: "📤" },
];

const CreateBlog = () => {
  const [activeSection, setActiveSection] = useState("basic");
  const [blogs, setBlogs] = useState([]);
  const [place, setPlace] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [visibleCount, setVisibleCount] = useState(3);
  const [showToast, setShowToast] = useState(false);
  const [formProgress, setFormProgress] = useState(0);
  const [animateSection, setAnimateSection] = useState(false);

  useEffect(() => {
    const storedBlogs = localStorage.getItem("blogs");
    if (storedBlogs) {
      setBlogs(JSON.parse(storedBlogs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("blogs", JSON.stringify(blogs));
  }, [blogs]);

  useEffect(() => {
    // Calculate form progress based on filled fields
    // This is a simple implementation that would need to be expanded
    // based on actual form fields tracking
    const progress = Math.min(
      sections.findIndex(section => section.id === activeSection) / (sections.length - 1) * 100,
      100
    );
    setFormProgress(progress);
    
    // Trigger animation when section changes
    setAnimateSection(true);
    const timer = setTimeout(() => setAnimateSection(false), 500);
    return () => clearTimeout(timer);
  }, [activeSection]);

  const handlePublish = () => {
    if (place.trim() && description.trim()) {
      const newBlog = { 
        place, 
        description, 
        date: new Date().toLocaleDateString(),
        id: Date.now()
      };
      setBlogs([newBlog, ...blogs]);
      setPlace("");
      setDescription("");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const handleSectionChange = (sectionId) => {
    setActiveSection(sectionId);
  };

  const handleDeleteBlog = (id) => {
    setBlogs(blogs.filter(blog => blog.id !== id));
  };

  const renderSection = () => {
    const sectionClass = `space-y-4 transition-all duration-300 ${
      animateSection ? "opacity-0 transform translate-y-4" : "opacity-100 transform translate-y-0"
    }`;
    
    switch (activeSection) {
      case "basic":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">📝</span> Basic Information
            </h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Blog Title</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="My Amazing Adventure in..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Destination/Place Name</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Paris, France"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Best Time to Visit</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Spring (April-June)"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Short Description</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={4}
                placeholder="Write a captivating introduction to your travel experience..."
              ></textarea>
            </div>
          </div>
        );

      case "attractions":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">🌄</span> Attractions
            </h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Top Attractions</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={3}
                placeholder="List the must-visit places..."
              ></textarea>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Must-See Landmark</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="e.g., Eiffel Tower"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Entry Fee / Opening Hours (optional)</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="$20 / 9am-5pm"
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Hidden Gems or Offbeat Spots</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Share a secret spot tourists don't know about..."
              />
            </div>
          </div>
        );

      case "create":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">✍</span> Create
            </h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal Experience</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={4}
                placeholder="Share your personal journey and experiences..."
              ></textarea>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Fun Fact or Local Myth</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Did you know that..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Photo Upload</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#85A947] transition-colors">
                <input type="file" className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer text-gray-500 hover:text-[#85A947]">
                  <span className="text-2xl">📷</span>
                  <p className="mt-2">Click to upload photos</p>
                  <p className="text-xs">or drag and drop your images here</p>
                </label>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Your Travel Vibe</label>
              <div className="flex gap-4">
                {["Relaxing", "Adventure", "Cultural"].map(vibe => (
                  <label key={vibe} className="flex items-center cursor-pointer group">
                    <div className="relative w-5 h-5 mr-2">
                      <input 
                        type="radio" 
                        name="vibe" 
                        value={vibe} 
                        className="appearance-none w-5 h-5 rounded-full border-2 border-gray-300 checked:border-[#85A947] checked:bg-white transition-all" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-0 transition-opacity checked:opacity-100">
                        <div className="w-2 h-2 rounded-full bg-[#85A947]"></div>
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-[#85A947] transition-colors">{vibe}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case "food":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">🍽</span> Food Recommendations
            </h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Suggested Cafes</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Best cafes and restaurants..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Must-Try Local Dishes</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={3}
                placeholder="Describe delicious local cuisine..."
              ></textarea>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferences</label>
              <div className="flex gap-4">
                {["Fine Dining", "Street Food", "Casual", "Vegetarian"].map(pref => (
                  <label key={pref} className="flex items-center cursor-pointer group">
                    <div className="relative w-5 h-5 mr-2">
                      <input 
                        type="checkbox" 
                        className="appearance-none w-5 h-5 rounded border-2 border-gray-300 checked:border-[#85A947] checked:bg-[#85A947] transition-all" 
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white pointer-events-none opacity-0 checked:opacity-100">
                        <span className="transform scale-75">✓</span>
                      </div>
                    </div>
                    <span className="text-gray-700 group-hover:text-[#85A947] transition-colors">{pref}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Personal Food Story or Tip</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={3}
                placeholder="Share a memorable food experience..."
              ></textarea>
            </div>
          </div>
        );

      case "tips":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">🧳</span> Trips & Tips
            </h2>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Packing Essentials</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="What to pack for this destination..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Mode of Transport</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="How to get around..."
              />
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Do's and Don'ts</label>
              <textarea 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                rows={3}
                placeholder="Cultural etiquette and practical advice..."
              ></textarea>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <label className="block text-sm font-medium text-gray-700 mb-1">Safety Tips</label>
              <input 
                type="text" 
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all" 
                placeholder="Important safety information..."
              />
            </div>
          </div>
        );

      case "post":
        return (
          <div className={sectionClass}>
            <h2 className="text-xl font-semibold flex items-center">
              <span className="mr-2">📤</span> Post
            </h2>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 text-center">
              <div className="max-w-md mx-auto">
                <div className="w-20 h-20 mx-auto bg-[#F0F0D7] rounded-full flex items-center justify-center mb-4">
                  <span className="text-3xl">📝</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">Ready to Share Your Adventure?</h3>
                <p className="text-gray-600 mb-6">Your travel blog is almost complete! Upload a cover image and hit publish to share your journey with the world.</p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 mb-6 hover:border-[#85A947] transition-colors">
                  <input type="file" className="hidden" id="cover-image" />
                  <label htmlFor="cover-image" className="cursor-pointer text-gray-500 hover:text-[#85A947]">
                    <span className="text-3xl">🖼</span>
                    <p className="mt-2">Upload a cover image</p>
                    <p className="text-xs text-gray-400">Recommended size: 1200 x 630px</p>
                  </label>
                </div>
                
                <button 
                  onClick={handlePublish} 
                  className="bg-[#85A947] text-white px-8 py-3 rounded-full font-medium hover:bg-[#738f3c] transition-colors shadow-md hover:shadow-lg transform hover:scale-105 transition-transform"
                >
                  Publish Your Travel Blog
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0D7] p-6 text-[#333]">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
      <div 
  className="h-1 bg-[#85A947] transition-all duration-500 ease-out"
  style={{ width: `${formProgress}%` }}
></div>

      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-3/4">
            <div className="flex items-center mb-2">
              <h1 className="text-3xl font-bold">Create Your Travel Blog</h1>
              <div className="ml-3 text-2xl animate-bounce">✈</div> 
            </div>
            <p className="mb-6 text-sm text-gray-600">Document your journey beautifully and inspire fellow travelers with your experiences.</p>

            {/* Section navigation with sticky behavior */}
            <div className="sticky top-2 z-10 bg-[#F0F0D7] pt-2 pb-4 mb-6 border-b border-gray-200">
              <div className="flex flex-wrap gap-2">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center ${
                      activeSection === section.id
                        ? "bg-[#85A947] text-white shadow-md transform scale-105"
                        : "bg-white text-[#333] border border-[#85A947] hover:bg-[#f5f5e0] hover:border-[#738f3c]"
                    }`}
                    onClick={() => handleSectionChange(section.id)}
                  >
                    <span className="mr-1">{section.icon}</span> {section.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
              {renderSection()}
            </div>

            {/* Navigation buttons */}
            <div className="flex justify-between mt-6">
              {activeSection !== sections[0].id && (
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex > 0) {
                      handleSectionChange(sections[currentIndex - 1].id);
                    }
                  }}
                  className="px-4 py-2 rounded-lg text-[#85A947] border border-[#85A947] hover:bg-[#f5f5e0] transition-colors flex items-center"
                >
                  <span className="mr-1">←</span> Previous Step
                </button>
              )}
              
              {activeSection !== sections[sections.length - 1].id && (
                <button
                  onClick={() => {
                    const currentIndex = sections.findIndex(s => s.id === activeSection);
                    if (currentIndex < sections.length - 1) {
                      handleSectionChange(sections[currentIndex + 1].id);
                    }
                  }}
                  className="ml-auto px-4 py-2 rounded-lg bg-[#85A947] text-white hover:bg-[#738f3c] transition-colors flex items-center"
                >
                  Next Step <span className="ml-1">→</span>
                </button>
              )}
            </div>
          </div>

          <div className="w-full md:w-1/4">
            <div className="bg-white shadow-lg rounded-2xl p-5 sticky top-20">
              <div className="text-center mb-4">
                <span className="inline-block p-3 bg-[#F0F0D7] rounded-full">
                  <span className="text-2xl">📋</span>
                </span>
                <h2 className="text-lg font-bold mt-2" style={{ color: "#85A947" }}>
                  Quick Publish
                </h2>
                <div className="h-1 w-16 bg-[#85A947] mx-auto mt-2 rounded-full"></div>
              </div>

              <div className="space-y-3">
                <label className="block text-xs font-semibold mb-1">Name of the Place</label>
                <input
                  type="text"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  placeholder="e.g., Jaipur"
                  className="w-full border border-gray-300 rounded-full px-3 py-2 text-xs mb-1 focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all"
                />

                <label className="block text-xs font-semibold mb-1">Blog Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Your experience..."
                  rows="4"
                  className="w-full border rounded-xl px-3 py-2 text-xs resize-none mb-1 focus:ring-2 focus:ring-[#85A947] focus:border-transparent transition-all"
                ></textarea>

                <button
                  onClick={handlePublish}
                  className="w-full text-white text-xs font-semibold py-2 rounded-full transition-all transform hover:scale-105 duration-200"
                  style={{ backgroundColor: "#85A947" }}
                >
                  Publish Now
                </button>
              </div>

              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-sm font-semibold text-[#85A947]">Your Blogs</h3>
                  <span className="text-xs text-gray-500">{blogs.length} entries</span>
                </div>

                <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                  {blogs.length === 0 ? (
                    <div className="text-center text-gray-400 py-4 text-xs">
                      No blogs yet. Create your first travel story!
                    </div>
                  ) : (
                    blogs.slice(0, visibleCount).map((blog, index) => (
                      <div
                        key={blog.id || index}
                        className="bg-[#F0F0D7] rounded-lg p-2 text-xs hover:bg-[#e4e4cc] transition-colors group relative"
                      >
                        <div 
                          className="cursor-pointer"
                          onClick={() => setSelectedBlog(blog)}
                        >
                          <div className="font-bold text-[#85A947] flex items-center">
                            <span>📍</span>
                            <span className="ml-1">{blog.place}</span>
                            <span className="ml-auto text-gray-500 text-xs">{blog.date}</span>
                          </div>
                          <div className="truncate mt-1">{blog.description}</div>
                        </div>
                        <button 
                          onClick={() => handleDeleteBlog(blog.id)}
                          className="absolute right-0 top-0 w-6 h-6 flex items-center justify-center text-gray-500 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {visibleCount < blogs.length && (
                  <button
                    onClick={handleLoadMore}
                    className="w-full text-xs mt-3 py-1.5 rounded-full text-white transition-colors hover:bg-[#444]"
                    style={{ backgroundColor: "#333" }}
                  >
                    Load More ({blogs.length - visibleCount} remaining)
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for blog preview */}
      {selectedBlog && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm"
          onClick={() => setSelectedBlog(null)}
        >
          <div
            className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[#F0F0D7] inline-block p-2 rounded-lg mb-2">
              <span className="text-lg">✈</span>
            </div>
            <h2 className="text-xl font-bold mb-1 text-[#85A947]">
              {selectedBlog.place}
            </h2>
            <p className="text-gray-500 text-xs mb-3">{selectedBlog.date}</p>
            <div className="h-px w-full bg-gray-200 mb-3"></div>
            <p className="text-sm text-[#333] mb-4">{selectedBlog.description}</p>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 border border-[#333] text-[#333] rounded-full text-sm hover:bg-gray-100 transition-colors"
                onClick={() => setSelectedBlog(null)}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-[#85A947] text-white rounded-full text-sm hover:bg-[#738f3c] transition-colors"
                onClick={() => setSelectedBlog(null)}
              >
                Edit Blog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 bg-[#85A947] text-white px-4 py-3 rounded-lg shadow-lg text-sm flex items-center animate-fade-in-up transition-all transform">
          <span className="mr-2 text-lg">✅</span> 
          Blog saved successfully!
        </div>
      )}

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default CreateBlog;