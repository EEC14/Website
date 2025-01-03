import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, verifyBeforeUpdateEmail } from 'firebase/auth';
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

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setNewEmail(user.email || '');

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data() as UserData;
          setSubscription(userData.subscription);
          
          const currentEmail = user.email || '';
          const previousEmail = localStorage.getItem('previousEmail');
          
          // Only update Stripe if we detect an email change
          if (userData.stripeCustomerId && previousEmail && currentEmail !== previousEmail) {
            try {
              console.log('Updating Stripe email:', { currentEmail, previousEmail });
              await updateStripeEmail(currentEmail, userData.stripeCustomerId);
              localStorage.removeItem('previousEmail');
            } catch (err) {
              console.error('Failed to update Stripe email:', err);
            }
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const updateStripeEmail = async (email: string, customerId: string): Promise<void> => {
    const response = await fetch('/.netlify/functions/update-stripe-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        customerId
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
        localStorage.setItem('previousEmail', auth.currentUser.email || '');
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
        setSuccess('Verification email sent. Please check your inbox and click the verification link.');
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
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending verification...' : 'Update Email'}
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