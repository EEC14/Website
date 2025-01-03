import React, { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged, User, verifyBeforeUpdateEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

interface UserData {
  isPro: boolean;
  isDeluxe: boolean;
}

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [newEmail, setNewEmail] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setNewEmail(user.email || '');

        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserData(userDoc.data() as UserData);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleEmailUpdate = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      if (auth.currentUser) {
        await verifyBeforeUpdateEmail(auth.currentUser, newEmail);
        setSuccess('Verification email sent. Please check your inbox and click the verification link.');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };
    const handleManageBilling = async () => {
    try {
      const response = await fetch("/.netlify/functions/billingportal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customerId: user?.stripeCustomerId,
        }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();
      window.location.href = data.url;
    } catch (error) {
      console.error("There was an error!", error);
      alert("Failed to redirect to the billing portal. If you subscribed in the application, please modify your subscription there.");
    }

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
        <div>
        {user.isPro || user.isDeluxe ? (
            <button
              onClick={() => {
                handleManageBilling();
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-1.5 w-full px-3 py-2 bg-gradient-to-r from-blue-900 to-blue-800 text-white rounded-xl hover:from-blue-800 hover:to-blue-700"
            >
              <Crown className="w-4 h-4" />
              <span className="text-sm">Update the billing email</span>
            </button>
          ) : (
            <p></p>
          )}
        </div>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Subscription Status</h2>
          <div className="space-y-2">
            {userData?.isDeluxe && <p>Deluxe Plan Active</p>}
            {userData?.isPro && !userData?.isDeluxe && <p>Pro Plan Active</p>}
            {!userData?.isPro && !userData?.isDeluxe && <p>No active subscription</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;