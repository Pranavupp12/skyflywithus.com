import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'terms-and-conditions',
  description: 'Learn about the team and mission behind SkyFlyWithUs.',
};

/**
 * Terms and Conditions Page Component for skyflywithus.com
 * Renders the legal agreement based on the provided content.
 */
const TermsAndConditionsPage: React.FC = () => {
  // Define placeholder contact information
  const contactEmail = 'support@skyflywithus.com';
  const contactWebsite = 'https://www.skyflywithus.com';
  const lastUpdated = 'November 25, 2025';
  const siteName = 'skyflywithus.com';

  return (
    <>
    
      <div className="terms-and-conditions-page  max-w-5xl  container mx-auto p-4 md:p-8 lg:p-12">
        
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Terms and Conditions
          </h1>
          <p className="text-sm text-gray-600">
            <strong>Published:</strong> {lastUpdated}
          </p>
        </header>

        {/* Main Content Sections */}
        <div className="space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Acceptance of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              1. Acceptance of Terms
            </h2>
            <p>
              By using our services, you agree to these Terms and Conditions. If you disagree, we kindly ask that you refrain from using our services.
            </p>
          </section>

          {/* 2. Content Accuracy Notice */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              2. Content Accuracy Notice
            </h2>
            <p>
              Our website provides general information about flights and travel. While we have Professional duties to keep our content <strong>accurate and helpful</strong>, we cannot guarantee that all information is always complete or up to date.
            </p>
            <p className="mt-2 p-3 bg-yellow-50 border-l-4 border-yellow-500 italic">
              We are not legally responsible for any issues, losses, or decisions that result from using the information on our site. We recommend verifying details with airlines or official sources before making any travel plans.
            </p>
          </section>

          {/* 3. Reviews & Opinions */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              3. Reviews & Opinions
            </h2>
            <p>
              All reviews, guides, and opinions come from our own experience and research. Your results or experiences may not be the same, and that’s okay.
            </p>
          </section>

          {/* 4. Limitation of Liability */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              4. Limitation of Liability
            </h2>
            <p>
              We are <strong>No-blame</strong> (not responsible) for the following events:
            </p>
            <ul className="list-disc list-inside ml-4 space-y-1">
              <li>Travel delays</li>
              <li>Flight cancellations</li>
              <li>Booking losses</li>
              <li>Incorrect use of information from our blog</li>
            </ul>
          </section>

          {/* 5. Change of Terms */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              5. Change of Terms
            </h2>
            <p>
              We reserve the right to update these Terms and Conditions at any time. By continuing to use our services, you accept the updated terms.
            </p>
          </section>

          {/* 6. Contact Information */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-3">
              6. Contact Information
            </h2>
            <p>
              If you have questions, contact us at:
            </p>
            <div className="mt-2 space-y-1">
              <p>
                <strong>Email:</strong> <a href={`mailto:${contactEmail}`} className="text-blue-600 hover:text-blue-800 font-medium">{contactEmail}</a>
              </p>
              <p>
                <strong>Website:</strong> <a href={contactWebsite} className="text-blue-600 hover:text-blue-800 font-medium" target="_blank" rel="noopener noreferrer">{contactWebsite}</a>
              </p>
            </div>
          </section>

        </div>



      </div>
      <hr className='my-8 h-1 mx-4  max-w-5xl md:mx-auto text-black' />
     
    </>
  );
};

export default TermsAndConditionsPage;