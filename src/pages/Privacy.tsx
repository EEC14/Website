import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Privacy: React.FC = () => {
  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          to="/signup"
          className="inline-flex items-center space-x-2 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sign Up</span>
        </Link>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2>1. Introduction</h2>
          <p>
            This Privacy Policy outlines the practices and principles regarding the collection, processing,
            and storage of data when interacting with HealthChat (the “Service”). By using the Service,
            users agree to the processing of their data as outlined in this policy. This policy is designed to
            comply with applicable laws, including GDPR, CCPA, and HIPAA where applicable.
          </p>

          <h2>2. Data Collection</h2>
          <p>
            We may collect the following types of data:
          </p>
          <ul>
            <li><strong>User Inputs:</strong> Data you provide during chatbot interactions, such as health questions or preferences.</li>
            <li><strong>Shared Chat Messages:</strong> Messages shared through the Service, stored pseudonymously in Firebase Firestore.</li>
            <li><strong>Technical Data:</strong> Device identifiers, IP addresses, browser types, cookies, and usage statistics.</li>
          </ul>

          <h2>3. Purpose of Data Use</h2>
          <p>
            The data collected may be used for purposes including, but not limited to:
          </p>
          <ul>
            <li>Providing personalized chatbot responses and services.</li>
            <li>Facilitating user communication via the "share chat" feature.</li>
            <li>Improving Service functionality and user experience.</li>
            <li>Ensuring compliance with applicable legal obligations and safeguarding user data.</li>
          </ul>

          <h2>4. Legal Basis for Processing</h2>
          <p>
            The legal basis for processing data depends on the user's jurisdiction:
          </p>
          <ul>
            <li><strong>GDPR (EEA/UK):</strong> Consent, legitimate interests, or contractual necessity.</li>
            <li><strong>CCPA (California):</strong> Compliance with consumer rights under the CCPA/CPRA.</li>
            <li><strong>HIPAA (US):</strong> If health data is classified as Protected Health Information (PHI), we comply with HIPAA safeguards.</li>
          </ul>

          <h2>5. Data Sharing and Transfers</h2>
          <p>
            We may share or transfer data to:
          </p>
          <ul>
            <li>Service providers such as OpenAI (for chatbot processing) and Firebase (for data storage).</li>
            <li>Regulatory authorities or legal entities as required by law.</li>
            <li>Buyers or successors in the event of a business merger or acquisition.</li>
          </ul>
          <p>
            Where data is transferred outside the EEA, appropriate safeguards such as Standard Contractual Clauses will be implemented.
          </p>

          <h2>6. Data Retention</h2>
          <p>
            Data will be retained as follows:
          </p>
          <ul>
            <li>User inputs: Processed transiently and not stored.</li>
            <li>Shared chat messages: Retained for up to 30 days in Firebase, then automatically deleted.</li>
            <li>Technical data: Retained for analytics and security purposes as long as operationally necessary.</li>
          </ul>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance functionality and analyze user behavior. Users can manage cookies through browser settings or opt-out options as required under CCPA.
          </p>

          <h2>8. User Rights</h2>
          <p>
            Users have rights under applicable laws, including:
          </p>
          <ul>
            <li><strong>GDPR:</strong> Access, rectify, erase, restrict, or port their data.</li>
            <li><strong>CCPA:</strong> Know, delete, and opt-out of the sale of personal data.</li>
          </ul>  
          <p>
            Requests can be submitted via email at compliance@esbhealthcare.com. We may deny requests where legally permissible.
          </p>

          <h2>9. Data Security</h2>
          <p>
            We implement robust security measures, including encryption, access controls, and regular audits. Users acknowledge that no system can guarantee absolute security.
          </p>

          <h2>10. Changes to This Policy</h2>
          <p>
            We reserve the right to update or modify this policy at any time. The latest version will be published on the Service. Continued use constitutes acceptance of the updated terms.
          </p>

          <h2>11. Contact Information</h2>
          <p>
            For inquiries, contact us at:
          </p>
          <ul>
            <li>Email: compliance@esbhealthcare.com</li>
            <li>Address: 1 Maple Road, Stockport SK7 2DH, GB</li>
          </ul>         
        </div>
      </div>
    </main>
  );
};

export default Privacy;
