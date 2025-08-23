import Image from 'next/image';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      <Navigation />
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-purple-900 via-purple-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
              About the Artist
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto">
              A journey of faith, color, and divine inspiration
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Artist Introduction */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Hello, I'm Banu
            </h2>
            
            {/* Tamil Introduction with Calligraphy */}
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-xl p-6 mb-6">
              <div className="text-center mb-4">
                <p className="text-2xl font-light text-purple-800 mb-2" style={{fontFamily: 'serif', letterSpacing: '0.05em'}}>
                  வணக்கம், நான் பானு
                </p>
                <p className="text-sm text-purple-600 italic">Vanakkam, naan Banu (Hello, I'm Banu)</p>
              </div>
              <div className="text-center">
                <p className="text-lg text-purple-700 mb-2" style={{fontFamily: 'serif', letterSpacing: '0.02em'}}>
                  கலை என் வாழ்க்கை, இயேசு என் வழி
                </p>
                <p className="text-sm text-purple-600 italic">Kalai en vaazhkkai, Yesu en vazhi (Art is my life, Jesus is my way)</p>
              </div>
            </div>

            <div className="prose prose-lg text-gray-700 space-y-4">
              <p>
                Welcome to my artistic world! I'm a passionate artist originally from the beautiful state of Tamil Nadu, India, 
                now residing in New Jersey. My journey from the vibrant landscapes and rich cultural heritage of Tamil Nadu 
                to the diverse artistic community of New Jersey has deeply enriched my creative expression.
              </p>
              <p>
                My art is deeply rooted in my Christian faith, and I find endless inspiration in the verses 
                and stories that have shaped my spiritual walk. Each brushstroke is a prayer, each color 
                a reflection of God's magnificent creation.
              </p>
              <p>
                Growing up in Tamil Nadu, I was surrounded by incredible diversity in art, culture, and faith. 
                The classical Tanjore paintings, temple architecture, and vibrant festival traditions of my homeland 
                continue to influence my artistic style, which I now blend with contemporary Christian themes 
                in my New Jersey studio.
              </p>
            </div>
          </div>
          
          <div className="relative">
            <div className="aspect-[4/5] bg-gradient-to-br from-purple-100 to-indigo-100 rounded-2xl shadow-xl overflow-hidden">
              {/* Placeholder for artist photo */}
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center text-purple-600">
                  <svg className="w-24 h-24 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <p className="text-sm">Artist Photo</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Artistic Journey */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">My Artistic Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Faith Foundation</h3>
              <p className="text-gray-600">
                My spiritual journey began in childhood, attending church in Chennai where I first discovered 
                the beauty of biblical stories through stained glass windows and religious art. The rich Christian 
                heritage of Tamil Nadu deeply influenced my early understanding of faith.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Artistic Awakening</h3>
              <p className="text-gray-600">
                During my art studies, I realized that my true calling was to merge my faith with my artistic 
                talents, creating pieces that speak to the soul and glorify God.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Divine Purpose</h3>
              <p className="text-gray-600">
                Today, I create art that serves as a bridge between the divine and earthly realms, 
                helping others experience God's love through visual storytelling.
              </p>
            </div>
          </div>
        </div>

        {/* Faith & Art Philosophy */}
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-2xl p-8 mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Faith Through Art</h2>
          
          {/* Tamil Christian Verse */}
          <div className="max-w-3xl mx-auto text-center mb-8">
            <div className="bg-white rounded-xl p-6 shadow-sm border">
              <p className="text-2xl text-purple-800 mb-3" style={{fontFamily: 'serif', letterSpacing: '0.05em', lineHeight: '1.6'}}>
                கர்த்தராகிய இயேசுவே என் ஒளி, என் கலை
              </p>
              <p className="text-sm text-purple-600 italic mb-4">
                Karthraagiya Yesuve en oli, en kalai<br/>
                (Lord Jesus is my light, my art)
              </p>
              <div className="flex justify-center">
                <div className="w-24 h-0.5 bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-400"></div>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto text-center">
            <blockquote className="text-xl text-gray-700 italic mb-6">
              "Every good and perfect gift is from above, coming down from the Father of the heavenly lights, 
              who does not change like shifting shadows."
            </blockquote>
            <p className="text-sm text-purple-600 font-medium mb-6">— James 1:17</p>
            <p className="text-gray-700 leading-relaxed">
              This verse guides my artistic process. I believe that my ability to create, to see beauty, 
              and to translate emotions into visual form is a gift from God. My paintings often incorporate 
              biblical themes, Christian symbolism, and verses that have personally impacted my life. 
              Through vibrant colors and meaningful compositions, I aim to create pieces that not only 
              beautify spaces but also inspire contemplation and spiritual reflection.
            </p>
          </div>
        </div>

        {/* Cultural Heritage */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Cultural Heritage</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Tamil Nadu Heritage</h3>
              
              {/* Tamil Heritage Quote */}
              <div className="bg-white border-l-4 border-purple-500 p-4 mb-6">
                <div className="text-center">
                  <p className="text-xl text-gray-800 mb-2" style={{fontFamily: 'serif', letterSpacing: '0.03em'}}>
                    தமிழ் மண்ணின் மணம், கிறிஸ்துவின் அன்பு
                  </p>
                  <p className="text-sm text-gray-600 italic mb-3">
                    Thamizh mannin manam, Christuvin anbu<br/>
                    (The fragrance of Tamil soil, the love of Christ)
                  </p>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-indigo-400 mx-auto"></div>
                </div>
              </div>

              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  Growing up in Tamil Nadu has blessed me with exposure to some of the world's most vibrant 
                  artistic traditions. From the intricate gold work of Tanjore paintings to the bold 
                  colors of Chettinad architecture, and the graceful forms of classical Bharatanatyam, 
                  these influences permeate my work.
                </p>
                <p>
                  I often incorporate traditional Tamil motifs, temple iconography, and the rich color palettes 
                  of South Indian art into my contemporary Christian pieces, creating a unique fusion that speaks 
                  to my heritage as a Tamil Christian artist.
                </p>
              </div>
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">New Jersey Studio</h3>
              <div className="prose prose-lg text-gray-700 space-y-4">
                <p>
                  My move to New Jersey has opened new chapters in my artistic journey. The multicultural 
                  environment here has allowed me to share my Tamil Christian heritage while learning from 
                  diverse artistic communities. My studio in New Jersey has become a bridge between cultures.
                </p>
                <p>
                  This blend of Tamil traditions with American contemporary art, Tamil heritage with global perspectives, 
                  East Coast innovation with South Indian spirituality, creates artwork that resonates with 
                  diverse audiences while maintaining deep cultural and spiritual significance.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Favorite Verses */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Verses That Inspire</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "She is clothed with strength and dignity; she can laugh at the days to come."
              </blockquote>
              <p className="text-purple-600 font-medium">— Proverbs 31:25</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "Be strong and courageous. Do not be afraid; do not be discouraged, 
                for the Lord your God will be with you wherever you go."
              </blockquote>
              <p className="text-purple-600 font-medium">— Joshua 1:9</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "For I know the plans I have for you," declares the Lord, 
                "plans to prosper you and not to harm you, to give you hope and a future."
              </blockquote>
              <p className="text-purple-600 font-medium">— Jeremiah 29:11</p>
            </div>
            
            <div className="text-center p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
              <blockquote className="text-lg text-gray-700 italic mb-4">
                "And we know that in all things God works for the good of those who love him, 
                who have been called according to his purpose."
              </blockquote>
              <p className="text-purple-600 font-medium">— Romans 8:28</p>
            </div>
          </div>
        </div>

        {/* Tamil Blessing */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-2xl p-8 max-w-4xl mx-auto">
            <div className="mb-6">
              <p className="text-3xl font-light mb-4" style={{fontFamily: 'serif', letterSpacing: '0.05em', lineHeight: '1.8'}}>
                உங்கள் வாழ்க்கையில் இயேசுவின் அன்பும் அமைதியும் நிறைந்திருக்கட்டும்
              </p>
              <p className="text-purple-200 text-lg italic mb-4">
                Ungal vaazhkkaiyil Yesuvn anbum amaithiyum nirainthirukattum
              </p>
              <p className="text-purple-100 text-base">
                "May the love and peace of Jesus fill your life"
              </p>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-32 h-0.5 bg-gradient-to-r from-purple-200 via-white to-purple-200"></div>
            </div>
            <p className="text-purple-200 text-sm">— Banu's Blessing</p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
