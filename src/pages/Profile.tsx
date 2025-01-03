import React, { useState, useEffect } from 'react';
import { getAuth, updateEmail, User, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface Subscription {
  plan: string;
  status: string;
  renewalDate?: string;
}

interface UserData {
  subscription: Subscription | null;
  stripeCustomerId?: string;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [stripeCustomerId, setStripeCustomerId] = useState<string>('');
  const [verificationSent, setVerificationSent] = useState<boolean>(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUserData = async (): Promise<void> => {
      if (auth.currentUser) {
        setUser(auth.currentUser);
        setNewEmail(auth.currentUser.email || '');

        const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          setSubscription(userData.subscription);
          setStripeCustomerId(userData.stripeCustomerId || '');
        }
      }
    };

    fetchUserData();
  }, [auth.currentUser]);

  useEffect(() => {
    const handleVerificationComplete = async () => {
      if (user?.emailVerified && stripeCustomerId && verificationSent) {
        try {
          await updateStripeEmail(newEmail, stripeCustomerId);
          setSuccess('Email updated successfully');
          setVerificationSent(false);
        } catch (err) {
          setError('Failed to update Stripe email');
        }
      }
    };

    handleVerificationComplete();
  }, [user?.emailVerified]);

  const updateStripeEmail = async (newEmail: string, customerId: string): Promise<void> => {
    const response = await fetch('/.netlify/functions/update-stripe-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: newEmail,
        customerId: customerId
      })
    });

    if (!response.ok) {
      throw new Error('Failed to update Stripe email');
    }
  };

  const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (auth.currentUser) {
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
        setVerificationSent(true);
        setSuccess('Verification email sent. Please check your inbox and verify the new email address.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold mb-6">Profile Settings</h1>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-md mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-50 text-green-600 p-4 rounded-md mb-4">
            {success}
          </div>
        )}

        <form onSubmit={handleEmailUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={newEmail}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading || verificationSent}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending verification...' : verificationSent ? 'Verification email sent' : 'Update Email'}
          </button>
        </form>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Details</h2>
          {subscription ? (
            <div className="space-y-2">
              <p>Plan: {subscription.plan}</p>
              <p>Status: {subscription.status}</p>
              {subscription.renewalDate && (
                <p>
                  Renewal Date:{' '}
                  {new Date(subscription.renewalDate).toLocaleDateString()}
                </p>
              )}
            </div>
          ) : (
            <p>No active subscription</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;