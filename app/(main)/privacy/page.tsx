import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'privacy-policy-page',
  description: 'Learn about the team and mission behind SkyFlyWithUs.',
};

/**
 * Privacy Policy Page Component for skyflywithus.com
 * Renders the privacy policy detailing data collection and usage.
 */
const PrivacyPolicyPage: React.FC = () => {
  const publishedDate = 'November 25, 2025';
  const siteName = 'skyflywithus.com';

  return (
    <>
      

      <div className="privacy-policy-page max-w-5xl container mx-auto  p-4 md:p-8 lg:p-12 mt-25">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-600">
            <strong>Published:</strong> {publishedDate}
          </p>
          <p className="mt-4 text-lg text-gray-700">
            At <strong>{siteName}</strong>, we are committed to protecting your privacy and ensuring you have a positive experience while using our services.
          </p>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Information We Collect */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Information We Collect
            </h2>
            
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              A. Information You Provide
            </h3>
            <p>
              We value your privacy and handle your personal data with the <strong>highest level of care</strong>. We only collect information that you voluntarily provide, such as your:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Name</li>
              <li>Email address</li>
              <li>Any details submitted through contact forms, comments, or inquiries.</li>
            </ul>
          </section>

          {/* 2. Third-Party Services */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Third-Party Services
            </h2>
            <p>
              To enhance the quality and functionality of our website, we integrate select <strong>third-party tools</strong>.
            </p>
            <p className="mt-3 p-3 bg-blue-50 border-l-4 border-blue-500">
              One such service is <strong>SerpAPI</strong>, which helps us gather search-related insights and improve the accuracy and relevance of the content we provide. These third-party providers may process certain information as part of their operations, and we ensure they adhere to appropriate privacy and security standards.
            </p>
          </section>

          {/* 3. Email & Newsletter */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Email & Newsletter
            </h2>
            <p>
              Stay connected with the latest updates from <strong>SkyFlyWithUs</strong>. By subscribing to our email list, you will receive:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1 mt-2">
              <li>Exclusive flight deals</li>
              <li>Travel tips</li>
              <li>Industry insights</li>
              <li>Special offers directly in your inbox</li>
            </ul>
            <p className="mt-3">
              Whether it&apos;s last-minute discounts or expert travel guidance, our newsletter is designed to help you travel smarter and save more every time you fly.
            </p>
          </section>
          
          {/* Note/Conclusion Section (Optional but Recommended) */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              Commitment to Security
            </h2>
            <p>
              We employ reasonable and appropriate security measures to protect the personal information that we collect and process.
            </p>
          </section>

        </div>

      </div>
      <hr className='my-8 h-1 mx-4 max-w-5xl md:mx-auto text-black' />
    </>
  );
};

export default PrivacyPolicyPage;