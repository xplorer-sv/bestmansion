import React, { useState, useEffect, useRef } from 'react';
import { Home, MapPin, Bed, Wifi, Droplets, Zap, Phone, Mail, Menu, X, Check, Shield, Coffee, Wind, Bike } from 'lucide-react';

export default function BestMansion() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [typedWord, setTypedWord] = useState('Modern');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const words = ['Modern', 'Quality', 'Affordable'];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      const sections = ['home', 'experience', 'location', 'features', 'gallery', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const typingSpeed = isDeleting ? 80 : 150;
    const pauseBeforeDelete = 2000;

    const timer = setTimeout(() => {
      const currentWord = words[wordIndex];
      
      if (!isDeleting && typedWord === currentWord) {
        setTimeout(() => setIsDeleting(true), pauseBeforeDelete);
      } else if (isDeleting && typedWord === '') {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      } else {
        setTypedWord(
          isDeleting
            ? currentWord.substring(0, typedWord.length - 1)
            : currentWord.substring(0, typedWord.length + 1)
        );
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [typedWord, isDeleting, wordIndex]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setMobileMenuOpen(false);
    }
  };

  const parallaxOffset = scrollY * 0.5;
  const headerOpacity = Math.min(scrollY / 100, 1);

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-20 right-20 w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-pink-600 rounded-full filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Header */}
      <header 
        className="fixed w-full z-50 transition-all duration-500"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${headerOpacity * 0.9})`,
          backdropFilter: scrollY > 50 ? 'blur(20px)' : 'none'
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition-opacity" />
                <div className="relative w-11 h-11 bg-black rounded-xl flex items-center justify-center border border-gray-800">
                  <Home className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold tracking-tight">Best Mansion</h1>
                <p className="text-xs text-gray-400">Chennai</p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex space-x-1">
              {['Home', 'Experience', 'Location', 'Features', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`px-4 py-2 text-sm rounded-lg transition-all ${
                    activeSection === item.toLowerCase()
                      ? 'bg-white bg-opacity-10 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-white hover:bg-opacity-5'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <button className="md:hidden text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 backdrop-blur-xl border-t border-gray-800">
            <nav className="flex flex-col p-6 space-y-2">
              {['Home', 'Experience', 'Location', 'Features', 'Gallery', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-left py-3 px-4 text-gray-300 hover:text-white hover:bg-white hover:bg-opacity-5 rounded-lg transition-all"
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{ transform: `translateY(${parallaxOffset}px)` }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black z-10" />
          <img
            src="/images/image1.jpg"
            alt="Best Mansion"
            className="w-full h-full object-cover scale-110 opacity-60"
          />
        </div>

        <div className="relative z-20 text-center px-6 max-w-5xl mx-auto">
          <div 
            className="space-y-8"
            style={{
              transform: `translateY(${scrollY * 0.3}px)`,
              opacity: 1 - scrollY / 500
            }}
          >
            <div className="inline-block">
              <div className="px-4 py-2 bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-full text-sm mb-6">
                Hassle-free Living in Chennai
              </div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none">
              Redefining
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                {typedWord}
              </span>
              <br />
              <span className="text-white">Living</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-light">
              Experience affordable accommodation where comfort meets sophistication
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="group relative px-8 py-4 bg-white text-black rounded-full font-medium overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">Reserve Your Space</span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
              <button
                onClick={() => scrollToSection('experience')}
                className="px-8 py-4 bg-white bg-opacity-10 backdrop-blur-xl border border-white border-opacity-20 rounded-full font-medium hover:bg-opacity-20 transition-all"
              >
                Explore More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-sm text-gray-400 tracking-widest uppercase">The Experience</div>
                <h2 className="text-5xl md:text-6xl font-bold tracking-tight leading-tight">
                  Where Every Detail
                  <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    Matters
                  </span>
                </h2>
              </div>
              
              <p className="text-xl text-gray-400 leading-relaxed">
                Step into a world where premium amenities meet thoughtful design. 
                Best Mansion isn't just accommodation—it's a lifestyle curated for those who demand excellence.
              </p>

              <div className="space-y-6 pt-8">
                {[
                  { icon: Shield, title: '24/7 Security', desc: 'Your safety is our priority' },
                  { icon: Zap, title: 'Uninterrupted Power', desc: 'Never worry about outages' },
                  { icon: Coffee, title: 'Community Spaces', desc: 'Connect and unwind' }
                ].map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex items-start space-x-4 group cursor-pointer"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-50 group-hover:opacity-100 transition-opacity" />
                      <div className="relative w-12 h-12 bg-black border border-gray-800 rounded-lg flex items-center justify-center group-hover:border-pink-500 transition-colors">
                        <item.icon className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
                      <p className="text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20" />
              <div className="relative grid grid-cols-2 gap-4">
                <div 
                  className="space-y-4"
                  style={{ transform: `translateY(${-scrollY * 0.05}px)` }}
                >
                  <img src="/images/image2.jpg" alt="Management" className="rounded-2xl shadow-2xl" />
                  <img src="/images/image8.jpg" alt="Amenities" className="rounded-2xl shadow-2xl" />
                </div>
                <div 
                  className="space-y-4 pt-12"
                  style={{ transform: `translateY(${-scrollY * 0.03}px)` }}
                >
                  <img src="/images/image3.jpg" alt="Rooms" className="rounded-2xl shadow-2xl" />
                  <img src="/images/image6.jpg" alt="Comfort" className="rounded-2xl shadow-2xl" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section id="location" className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm text-gray-400 tracking-widest uppercase mb-4">Location</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight mb-6">
              At The Heart Of
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Everything
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Strategically positioned for seamless connectivity to Chennai's prime destinations
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { title: 'VR Mall', time: '10 mins', desc: 'Shopping & Entertainment' },
              { title: 'AMPA Skywalk', time: '5 mins', desc: '7 Screen Multiplex' },
              { title: 'Koyambedu CMBT', time: '5 mins', desc: 'Major Transit Hub' },
              { title: 'Anna Nagar', time: '8 mins', desc: 'Business District' },
              { title: 'Vadapalani', time: '10 mins', desc: 'Commercial Center' },
              { title: 'Metro Station', time: '7 mins', desc: 'Rapid Transit' }
            ].map((location, idx) => (
              <div 
                key={idx}
                className="group relative bg-white bg-opacity-5 backdrop-blur-xl border border-white border-opacity-10 rounded-2xl p-8 hover:bg-opacity-10 transition-all cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-pink-600 opacity-0 group-hover:opacity-10 transition-opacity" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold">{location.title}</h3>
                    <MapPin className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                    {location.time}
                  </div>
                  <p className="text-gray-400">{location.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-white border-opacity-10">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-20 z-10" />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.416256100027!2d80.2116927!3d13.0727848!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5266a1d126f4d5%3A0xdfa41b46176f657d!2sBEST%20MANSION%20CHENNAI!5e0!3m2!1sen!2sus!4v1717733648975!5m2!1sen!2sus"
              width="100%"
              height="500"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm text-gray-400 tracking-widest uppercase mb-4">Features</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              Built For
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Excellence
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-4 gap-6 mb-20">
            {[
              { icon: Zap, title: 'Generator Backup', img: '/images/image4.jpg' },
              { icon: Droplets, title: 'Hot Water 24/7', img: '/images/image7.jpg' },
              { icon: Bike, title: 'Parking', img: '/images/image9.jpg' },
              { icon: Wind, title: 'RO Water', img: '/images/image8.jpg' }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group relative aspect-square rounded-3xl overflow-hidden cursor-pointer"
              >
                <img 
                  src={feature.img} 
                  alt={feature.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <feature.icon className="w-8 h-8 mb-3 text-purple-400" />
                  <h3 className="text-xl font-bold">{feature.title}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="relative bg-white bg-opacity-5 backdrop-blur-xl border border-white border-opacity-10 rounded-3xl p-12">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 rounded-3xl" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-12 text-center">Premium Amenities</h3>
              <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[
                  'A/C Rooms', 'Non-A/C Rooms', 'Attached Bathrooms', 'Premium Mattresses',
                  'Wardrobes', 'Outdoor Patio', 'Common TV Hall', 'Housekeeping',
                  '24/7 Security', 'First Aid', 'Fire Safety', 'Laundry Service'
                ].map((amenity, idx) => (
                  <div key={idx} className="flex items-center space-x-3 group cursor-pointer">
                    <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="relative py-32 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <div className="text-sm text-gray-400 tracking-widest uppercase mb-4">Gallery</div>
            <h2 className="text-5xl md:text-6xl font-bold tracking-tight">
              See For
              <span className="block bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Yourself
              </span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            {[
              { src: '/images/image1.jpg', title: 'Exterior', span: 'md:col-span-2', style: { aspectRatio: '630/297' } },
              { src: '/images/image3.jpg', title: 'Rooms' },
              { src: '/images/image6.jpg', title: 'Comfort' },
              { src: '/images/image7.jpg', title: 'Hot Water' },
              { src: '/images/image8.jpg', title: 'RO Water' },
              { src: '/images/image4.jpg', title: 'Power Backup' }
            ].map((img, idx) => (
              <div
                key={idx}
                className={`group relative overflow-hidden rounded-2xl ${img.span || 'aspect-square'} cursor-pointer`}
                style={img.style}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-6 left-6">
                    <p className="text-2xl font-bold">{img.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="space-y-8">
            <div className="text-sm text-gray-400 tracking-widest uppercase">Get In Touch</div>
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
              Your New Home
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Awaits
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Starting at just ₹3,600/month. Experience affordable and quality lifestyle without the premium price.
            </p>

            <div className="pt-8 space-y-4">
              <a
                href="https://wa.me/+919381019882?text=Hi, I'm interested in finding a room at Best Mansion. Could you please provide more information?"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group relative px-12 py-5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg overflow-hidden transition-all hover:scale-105"
              >
                <span className="relative z-10">Connect on WhatsApp</span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>

              <div className="text-gray-400 space-y-2">
                <p className="flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>93810 19882 / 90258 12030</span>
                </p>
                <p className="flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Anna Avenue, Arumbakkam, Chennai 600 106</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white border-opacity-10 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-500">
          <p>© 2024 Best Mansion. Exclusively for Men. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}