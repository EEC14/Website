import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const Terms: React.FC = () => {
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
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Terms of Service</h1>

        <div className="prose prose-blue max-w-none">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing or using HealthChat (the "Service"), you agree to be bound by these Terms of
            Service ("Terms"). If you do not agree, you must immediately cease use of the Service.
            These Terms are subject to change at any time without notice, and continued use of the
            Service constitutes acceptance of the revised Terms.
          </p>

          <h2>2. Scope of Service</h2>
          <p>
            The Service provides AI-generated health, workout, and diet plans for informational purposes only. 
            It is not a substitute for professional advice, diagnosis, or treatment. The creators of the Service 
            reserve the right to modify, limit, or discontinue the Service at any time without prior notice.
          </p>

          <h2>3. User Responsibilities</h2>
          <p>
            Users agree to:
          </p>
          <ul>
            <li>Provide accurate information when interacting with the Service.</li>
            <li>Use the Service in compliance with applicable laws and regulations.</li>
            <li>Accept full responsibility for any actions taken based on information provided by the Service.</li>
          </ul>
          <p>Prohibited activities include, but are not limited to:</p>
          <ul>
            <li>Misuse of the Service for unlawful purposes.</li>
            <li>Interference with the Service's functionality.</li>
            <li>Submission of false, misleading, or harmful information.</li>
          </ul>

          <h2>4. Data Protection and Privacy</h2>
          <p>
            By using the Service, you consent to the collection and use of your data as outlined in our <Link to="/privacy">Privacy Policy</Link>. 
            This includes the pseudonymized storage of shared chat messages and compliance with applicable data protection regulations, 
            including GDPR and CCPA.
          </p>

          <h2>5. Disclaimer of Liability</h2>
          <p>
            The Service is provided "as-is" and "as available" without any warranties, express or implied.
          </p>
          <ul>
            <li>No Warranty: We do not guarantee accuracy, reliability, or availability of the Service.</li>
            <li>Limitation of Liability: To the fullest extent permitted by law, we disclaim all liability for
            damages, including but not limited to direct, indirect, incidental, or consequential damages
            arising from the use of the Service.</li>
            <li>User Responsibility: Users acknowledge they use the Service at their own risk.</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <p>
            All content, designs, and intellectual property associated with the Service are owned
            exclusively by ESB Healthcare Ltd or its licensors. Users are granted a limited,
            non-transferable license to access and use the Service for personal, non-commercial
            purposes. Unauthorized use or reproduction is strictly prohibited.
          </p>

          <h2>7. Termination of Access</h2>
          <p>
            We reserve the right to suspend or terminate user access to the Service at any time and for
            any reason, including violations of these Terms or operational considerations.
          </p>

          <h2>8. Governing Law and Jurisdiction</h2>
          <p>
            These Terms are governed by the laws of England and Wales. Any disputes arising under
            these Terms shall be subject to the exclusive jurisdiction of the courts in London.
          </p>

          <h2>9. Changes to These Terms</h2>
          <p>
            We reserve the right to update these Terms at any time without prior notice. Users are
            encouraged to review these Terms periodically to stay informed of any updates.
          </p>

          <h2>10. Contact Information</h2>
          <p>
            For questions or concerns regarding these Terms, users can contact:
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

export default Terms;
