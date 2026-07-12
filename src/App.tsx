import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Layout components
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { ScrollToTop } from './components/layout/ScrollToTop';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Programs } from './pages/Programs';
import { SixPillars } from './pages/SixPillars';
import { Gallery } from './pages/Gallery';
import { Testimonials } from './pages/Testimonials';
import { Partnership } from './pages/Partnership';
import { Volunteer } from './pages/Volunteer';
import { AnnualReport } from './pages/AnnualReport';
import { Contact } from './pages/Contact';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen">
          {/* Header Navigation */}
          <Navbar />
          
          {/* Main Body Content */}
          <main className="flex-grow pt-[72px]">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/six-pillars" element={<SixPillars />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/partnership" element={<Partnership />} />
              <Route path="/volunteer" element={<Volunteer />} />
              <Route path="/annual-report" element={<AnnualReport />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </main>

          {/* Footer Grid */}
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
