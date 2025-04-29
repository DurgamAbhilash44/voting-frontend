import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 min-h-screen text-white">

      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-4xl font-extrabold mb-6">
          About the Voting Portal
        </h1>
        <p className="text-xl mb-4 max-w-2xl mx-auto">
          The Voting Portal is a secure, transparent, and user-friendly platform that allows individuals to participate in democratic processes.
        </p>
      </section>

      {/* Content Section */}
      <section className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: Purpose */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Our Purpose</h2>
          <p className="text-lg mb-4">
            Our goal is to provide a reliable and efficient voting system where users can cast their votes safely and securely. We aim to make democratic participation accessible to everyone, everywhere.
          </p>
        </div>

        {/* Section 2: Security */}
        <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg">
          <h2 className="text-3xl font-semibold mb-4">Security & Transparency</h2>
          <p className="text-lg mb-4">
            We prioritize security by using advanced encryption methods to protect voter information. Our system ensures transparency, allowing users to verify their votes without compromising confidentiality.
          </p>
        </div>
      </section>

      {/* Section 3: Features */}
      <section className="bg-white text-gray-800 py-12">
        <h2 className="text-3xl font-semibold text-center mb-8">Key Features</h2>
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="text-center p-6 bg-indigo-600 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Simple & User-Friendly</h3>
            <p className="text-lg">
              Our intuitive interface allows users to navigate through the portal easily, whether they're voting or reviewing results.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="text-center p-6 bg-purple-600 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Fast & Secure Voting</h3>
            <p className="text-lg">
              Cast your vote in seconds with our fast, secure voting mechanism that ensures your vote is counted accurately.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="text-center p-6 bg-pink-600 text-white rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold mb-4">Real-Time Results</h3>
            <p className="text-lg">
              View real-time vote results as they come in, providing a transparent overview of the voting process.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p>&copy; 2025 Voting Portal. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default About;
