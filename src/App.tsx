import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { HomePage } from './pages/HomePage';
import { StayPage } from './pages/StayPage';
import { StayDetailPage } from './pages/StayDetailPage';
import { ResortMapPage } from './pages/ResortMapPage';
import { ExplorePage } from './pages/ExplorePage';
import { AttractionDetailPage } from './pages/AttractionDetailPage';
import { DiningPage } from './pages/DiningPage';
import { OffersPage } from './pages/OffersPage';
import { GalleryPage } from './pages/GalleryPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';
import { ManageBookingPage } from './pages/ManageBookingPage';
import { AccountPage } from './pages/AccountPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BookingProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/stay" element={<StayPage />} />
          <Route path="/stay/:slug" element={<StayDetailPage />} />
          <Route path="/resort-map" element={<ResortMapPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/explore/:slug" element={<AttractionDetailPage />} />
          <Route path="/dining" element={<DiningPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/reviews" element={<ReviewsPage />} />
          <Route path="/faqs" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/manage-booking" element={<ManageBookingPage />} />
          <Route path="/account" element={<AccountPage />} />
          {/* Fallback */}
          <Route path="*" element={<HomePage />} />
        </Routes>
      </Router>
    </BookingProvider>
  );
}
