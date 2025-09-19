import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Download, MapPin, Smartphone, Globe, Star, Clock, Camera, Coffee, Car, Utensils, ShoppingBag, Music, Calendar, Heart, Play } from 'lucide-react';
import AppModal from './components/AppModal';
import LanguageSelector from './components/LanguageSelector';
import AboutModal from './components/AboutModal';
import PrivacyModal from './components/PrivacyModal';
import InstructionsModal from './components/InstructionsModal';
import RecommendationForm from './components/RecommendationForm';
import ModerationPanel from './components/ModerationPanel';
import CookieBanner from './components/CookieBanner';
import { appDatabase, wildcardApps, losAngelesApps, caliApps, tokyoApps, parisApps, sydneyApps, dubaiApps } from './data/appData';
import WildcardModal from './components/WildcardModal';

const destinations = [
  {
    name: 'London',
    country: 'United Kingdom',
    image: 'https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: [
      { name: 'Tube Map', icon: MapPin, color: 'bg-red-500' },
      { name: 'Boris Bikes', icon: Car, color: 'bg-blue-500' },
      { name: 'Timeout', icon: Clock, color: 'bg-purple-500' },
      { name: 'Citymapper', icon: Globe, color: 'bg-green-500' },
      { name: 'OpenTable', icon: Utensils, color: 'bg-orange-500' },
      { name: 'National Gallery', icon: Camera, color: 'bg-indigo-500' },
      { name: 'Pret A Manger', icon: Coffee, color: 'bg-amber-500' },
      { name: 'Harrods', icon: ShoppingBag, color: 'bg-pink-500' },
      { name: 'West End Shows', icon: Music, color: 'bg-teal-500' }
    ]
  },
  {
    name: 'Bangkok',
    country: 'Thailand',
    image: 'https://images.pexels.com/photos/1007025/pexels-photo-1007025.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: [
      { name: 'BTS SkyTrain', icon: MapPin, color: 'bg-emerald-500' },
      { name: 'Grab', icon: Car, color: 'bg-green-600' },
      { name: 'Foodpanda', icon: Utensils, color: 'bg-pink-500' },
      { name: 'Temple Guide', icon: Globe, color: 'bg-yellow-500' },
      { name: 'Chatuchak', icon: ShoppingBag, color: 'bg-purple-500' },
      { name: 'Bangkok Events', icon: Calendar, color: 'bg-blue-500' },
      { name: 'Street Food', icon: Coffee, color: 'bg-orange-500' },
      { name: 'Tuk Tuk', icon: Star, color: 'bg-red-500' },
      { name: 'Wat Finder', icon: Heart, color: 'bg-indigo-500' }
    ]
  },
  {
    name: 'Istanbul',
    country: 'Turkey',
    image: 'https://images.pexels.com/photos/1556795/pexels-photo-1556795.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: [
      { name: 'Metro Istanbul', icon: MapPin, color: 'bg-blue-600' },
      { name: 'BiTaksi', icon: Car, color: 'bg-yellow-500' },
      { name: 'Yemeksepeti', icon: Utensils, color: 'bg-red-500' },
      { name: 'Hagia Sophia', icon: Globe, color: 'bg-purple-500' },
      { name: 'Grand Bazaar', icon: ShoppingBag, color: 'bg-orange-500' },
      { name: 'Turkish Coffee', icon: Coffee, color: 'bg-amber-600' },
      { name: 'Bosphorus', icon: Camera, color: 'bg-teal-500' },
      { name: 'Istanbul Card', icon: Star, color: 'bg-green-500' },
      { name: 'Local Events', icon: Music, color: 'bg-pink-500' }
    ]
  },
  {
    name: 'Los Angeles',
    country: 'United States',
    image: 'https://images.pexels.com/photos/161963/hollywood-sign-los-angeles-california-161963.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: losAngelesApps
  },
  {
    name: 'Cali',
    country: 'Colombia',
    image: 'https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: caliApps
  },
  {
    name: 'Tokyo',
    country: 'Japan',
    image: 'https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: tokyoApps
  },
  {
    name: 'Paris',
    country: 'France',
    image: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: parisApps
  },
  {
    name: 'Sydney',
    country: 'Australia',
    image: 'https://images.pexels.com/photos/783682/pexels-photo-783682.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: sydneyApps
  },
  {
    name: 'Dubai',
    country: 'United Arab Emirates',
    image: 'https://images.pexels.com/photos/1470502/pexels-photo-1470502.jpeg?auto=compress&cs=tinysrgb&w=800',
    apps: dubaiApps
  }
];

function AppIcon({ app, index }: { app: any, index: number }) {
  const IconComponent = app.icon;
  const [showModal, setShowModal] = useState(false);
  
  const handleClick = () => {
    setShowModal(true);
  };
  
  return (
    <>
      <div className="group cursor-pointer" onClick={handleClick}>
      <div className={`${app.color} rounded-2xl p-4 shadow-lg transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl flex items-center justify-center aspect-square`}>
        <IconComponent className="w-6 h-6 text-white" />
      </div>
      <p className="text-xs text-gray-700 mt-2 text-center font-medium truncate">{app.name}</p>
      </div>
      <AppModal 
        app={appDatabase[app.name]} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
    </>
  );
}

function WildcardIcon({ destinationName }: { destinationName: string }) {
  const [showModal, setShowModal] = useState(false);
  const [showWildcardInfo, setShowWildcardInfo] = useState(false);
  
  const wildcardAppName = destinationName === 'London' ? 'Flush' : 
                         destinationName === 'Bangkok' ? 'Klook' : 'Duolingo';
  
  const handleAppClick = () => {
    setShowModal(true);
  };
  
  const handleInfoClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowWildcardInfo(true);
  };
  
  return (
    <>
      <div className="col-span-3 mt-4">
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-4 shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer group relative" onClick={handleAppClick}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white bg-opacity-20 rounded-xl p-2">
                <Star className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Wildcard Pick</p>
                <p className="text-white text-opacity-90 text-xs">{wildcardApps[wildcardAppName]?.name}</p>
              </div>
            </div>
            <button 
              onClick={handleInfoClick}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-1.5 transition-all duration-200"
            >
              <span className="text-white text-xs font-bold">?</span>
            </button>
          </div>
          <div className="mt-2">
            <p className="text-white text-opacity-80 text-xs leading-relaxed">
              This week's special pick - a unique app that offers something different!
            </p>
          </div>
        </div>
      </div>
      
      <AppModal 
        app={wildcardApps[wildcardAppName]} 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
      />
      
      <WildcardModal 
        isOpen={showWildcardInfo} 
        onClose={() => setShowWildcardInfo(false)} 
      />
    </>
  );
}

function DestinationSection({ destination, index }: { destination: any, index: number }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}>
          {/* Image Section */}
          <div className="lg:w-1/2">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                src={destination.image} 
                alt={destination.name}
                className="w-full h-80 lg:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <h3 className="text-3xl font-bold text-white mb-1">{destination.name}</h3>
                <p className="text-white/90 text-lg">{destination.country}</p>
              </div>
            </div>
          </div>

          {/* Apps Grid Section */}
          <div className="lg:w-1/2">
            <div className="text-center lg:text-left mb-8">
              <h4 className="text-2xl font-bold text-gray-900 mb-4">
                Essential Apps for {destination.name}
              </h4>
              <p className="text-gray-600 text-lg">
                Discover the best local apps to make your {destination.name} experience unforgettable
              </p>
            </div>

            {/* 3x3 Grid + Wildcard */}
            <div className="grid grid-cols-3 gap-4 mb-8 max-w-sm mx-auto lg:mx-0">
              {destination.apps.map((app: any, appIndex: number) => (
                <AppIcon key={appIndex} app={app} index={appIndex} />
              ))}
              <WildcardIcon destinationName={destination.name} />
            </div>

            {/* Download Button */}
            <div className="text-center lg:text-left">
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
                <Download className="w-5 h-5" />
                Download AppVoyage
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function App() {
  const { t } = useTranslation();
  const [showAbout, setShowAbout] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  const [showRecommendationForm, setShowRecommendationForm] = useState(false);
  const [showModerationPanel, setShowModerationPanel] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 p-2 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">AppVoyage</span>
            </div>
            <nav className="hidden md:flex items-center gap-8">
              <a href="#destinations" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.destinations')}</a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.features')}</a>
              <button onClick={() => setShowAbout(true)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">{t('header.about')}</button>
              <button onClick={() => setShowRecommendationForm(true)} className="text-gray-700 hover:text-blue-600 font-medium transition-colors">Recommend App</button>
              <LanguageSelector />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">
                {t('header.downloadApp')}
              </button>
              {/* Admin/Moderation Button - you might want to add proper admin check */}
              <button 
                onClick={() => setShowModerationPanel(true)} 
                className="text-xs bg-purple-100 hover:bg-purple-200 text-purple-700 px-3 py-1 rounded-full transition-colors"
                title="Moderation Panel"
              >
                Admin
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-teal-50 py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
            <span className="bg-gradient-to-r from-blue-600 to-teal-500 bg-clip-text text-transparent"> {t('hero.titleHighlight')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            {t('hero.subtitle')}
          </p>
          
          {/* Download Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <div className="flex flex-col sm:flex-row gap-3">
              <a 
                href="https://apps.apple.com/app/id000000000" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Download on App Store
              </a>
              <a 
                href="https://play.google.com/store/apps/details?id=com.example.appvoyage" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-3"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                </svg>
                Get it on Google Play
              </a>
            </div>
            <button 
              onClick={() => setShowInstructions(true)} 
              className="border-2 border-gray-300 hover:border-gray-400 text-gray-700 px-6 py-3 rounded-xl font-semibold text-lg transition-all duration-300 hover:bg-gray-50 inline-flex items-center gap-2"
            >
              <Play className="w-5 h-5" />
              {t('hero.watchDemo')}
            </button>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Globe className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.curatedApps.title')}</h3>
              <p className="text-gray-600">{t('features.curatedApps.description')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-teal-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <Star className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.expertReviews.title')}</h3>
              <p className="text-gray-600">{t('features.expertReviews.description')}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <div className="bg-orange-100 w-12 h-12 rounded-xl flex items-center justify-center mb-4 mx-auto">
                <MapPin className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{t('features.offlineAccess.title')}</h3>
              <p className="text-gray-600">{t('features.offlineAccess.description')}</p>
            </div>
          </div>
        </div>
      </section>
      {/* Destinations Section */}
      <section id="destinations" className="bg-gray-50">
        <div className="max-w-6xl mx-auto py-16 px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{t('destinations.title')}</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            {t('destinations.subtitle')}
          </p>
        </div>

        {destinations.map((destination, index) => (
          <DestinationSection key={destination.name} destination={destination} index={index} />
        ))}
      </section>

      {/* Final CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-teal-600 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-white mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            {t('cta.subtitle')}
          </p>
          <button className="bg-white hover:bg-gray-100 text-blue-600 px-10 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transform transition-all duration-300 hover:scale-105 inline-flex items-center gap-3">
            <Download className="w-6 h-6" />
            {t('cta.button')}
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-3 mb-4 md:mb-0">
              <div className="bg-gradient-to-br from-blue-600 to-teal-500 p-2 rounded-xl">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">AppVoyage</span>
            </div>
            <div className="flex gap-8">
              <button onClick={() => setShowPrivacy(true)} className="text-gray-400 hover:text-white transition-colors">{t('footer.privacy')}</button>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.terms')}</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">{t('footer.support')}</a>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">{t('footer.copyright')}</p>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AboutModal isOpen={showAbout} onClose={() => setShowAbout(false)} />
      <PrivacyModal isOpen={showPrivacy} onClose={() => setShowPrivacy(false)} />
      <InstructionsModal isOpen={showInstructions} onClose={() => setShowInstructions(false)} />
      <RecommendationForm isOpen={showRecommendationForm} onClose={() => setShowRecommendationForm(false)} />
      <ModerationPanel isOpen={showModerationPanel} onClose={() => setShowModerationPanel(false)} />

      {/* Cookie Consent Banner */}
      <CookieBanner />
    </div>
  );
}

export default App;
