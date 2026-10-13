import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./context/LanguageContext";
import { OfferProvider } from "./context/OfferContext";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <OfferProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin/*" element={<Admin />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </AuthProvider>
        </OfferProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}
