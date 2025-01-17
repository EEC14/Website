import { Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
// import CarePlan from "./pages/CarePlan";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ProAccount from "./pages/ProAccount";
import PaymentSuccess from "./pages/PaymentSuccess";
import SharedChat from "./pages/SharedChat";
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import { Header } from "./components/Header";
import { DailyHealthTip } from "./components/DailyHealthTip";
import { AuthProvider } from "./contexts/AuthContext";
import { AuthGuard } from "./components/AuthGuard";
// import { ProGuard } from "./components/ProGuard";
import { SharedChatsList } from "./pages/Share-chats";
import CarePlan from "./pages/generatorpage";
import { DeluxeGuard } from "./components/DeluxeGuard";
import Footer from "./components/Footer";
// import ManageBilling from "./pages/payment-dashboard";
import BetaTesting from "./pages/BetaTest";
import ProfilePage from "./pages/Profile";
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
        <Header />
        <div className="max-w-4xl px-4 py-4 mx-auto">
          <DailyHealthTip />
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <AuthGuard>
                <Chat />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route
            path="/app"
            element={
              <AuthGuard>
                <BetaTesting />
              </AuthGuard>
            }
          />
                    <Route
            path="/profile"
            element={
              <AuthGuard>
                <ProfilePage />
              </AuthGuard>
            }
          />
          <Route
            path="/payment-success"
            element={
              <AuthGuard>
                <PaymentSuccess />
              </AuthGuard>
            }
          />
          <Route
            path="/share-chats"
            element={
              <AuthGuard>
                <SharedChatsList />
              </AuthGuard>
            }
          />
          {/* <Route
            path="/payment-dashboard"
            element={
              <AuthGuard>
                <ManageBilling />
              </AuthGuard>
            }
          /> */}
          <Route
            path="/pro"
            element={
              <AuthGuard>
                <ProAccount />
              </AuthGuard>
            }
          />
          {/* <Route
            path="/care-plan"
            element={
              <AuthGuard>
                <ProGuard>
                  <CarePlan />
                </ProGuard>
              </AuthGuard>
            }
          /> */}
          <Route
            path="/plan"
            element={
              <AuthGuard>
                <DeluxeGuard>
                  <CarePlan />
                </DeluxeGuard>
              </AuthGuard>
            }
          />
          <Route path="/shared/:shareId" element={<SharedChat />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
