'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function OGARTAPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Banner Image */}
      <div className="relative h-[400px]">
        <Image
          src="/images/banner.jpg"
          alt="Small But Mighty Banner"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
            {/* Header */}
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded-full shadow-lg">
                  <Image
                    src="/images/smb-logo.png"
                    alt="Small But Mighty"
                    width={40}
                    height={40}
                    className="object-contain"
                  />
                </div>
                <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <h2 className="text-sm font-bold text-white">Small But Mighty</h2>
                  <p className="text-xs text-white/90">Community Support Charity</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <Link 
                  href="/dashboard" 
                  className="flex items-center gap-2 px-4 py-2 bg-[#ff65c3] text-white rounded-full hover:bg-opacity-90 transition-colors"
                >
                  <span>←</span>
                  Back to Dashboard
                </Link>
                <Link 
                  href="https://raiser.uk" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white text-sm hover:text-[#ff65c3] transition-colors"
                >
                  Powered by <span className="font-medium">Raiser</span>
                </Link>
              </div>
            </div>

            {/* Hero Content */}
            <div className="flex flex-col justify-center h-[calc(100%-80px)] text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Small Actions, Big Impact
              </h1>
              <p className="text-xl text-white opacity-90 mb-8">
                Building stronger communities through<br />
                support, connection, and empowerment.
              </p>
              <div className="flex justify-center gap-4">
                <button className="px-6 py-3 bg-[#ff65c3] text-white rounded-full hover:bg-opacity-90 transition-colors">
                  Donate Now
                </button>
                <button className="px-6 py-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors">
                  Get Involved
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Who We Are */}
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-white p-3 rounded-full shadow-md">
            <Image
              src="/images/smb-logo.png"
              alt="Small But Mighty"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Who We Are</h2>
        </div>
        <p className="text-gray-600">
          Small But Mighty is a community-based charity dedicated to supporting vulnerable individuals and families 
          in Smallville. Since 2018, we've been providing essential services, educational 
          resources, and community spaces to help people thrive despite challenging circumstances.
        </p>
        <p className="text-gray-600 mt-4">
          We may be small, but our impact is mighty - every action we take creates ripples of positive change.
        </p>
      </div>

      {/* Our Impact */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">Our Impact</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#E0E7FF] rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-[#6366F1]">1,250+</span>
              </div>
              <p className="text-sm text-gray-600">People Supported<br />Annually</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#FCE7F3] rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-[#FF3366]">35</span>
              </div>
              <p className="text-sm text-gray-600">Support Groups<br />Weekly Sessions</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#E0E7FF] rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-[#6366F1]">12</span>
              </div>
              <p className="text-sm text-gray-600">Community Projects<br />Active Programs</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 mx-auto bg-[#FCE7F3] rounded-full flex items-center justify-center mb-3">
                <span className="text-xl font-bold text-[#FF3366]">85%</span>
              </div>
              <p className="text-sm text-gray-600">Positive Outcomes<br />Reported Improvement</p>
            </div>
          </div>
        </div>
      </div>

      {/* Help Us Reach Our Goal */}
      <div className="max-w-2xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Help Us Reach Our Goal</h2>
        <div className="relative h-4 bg-gray-100 rounded-full overflow-hidden mb-4">
          <div 
            className="absolute left-0 top-0 h-full bg-[#FF3366]"
            style={{ width: '60%' }}
          />
        </div>
        <p className="text-sm text-gray-600 mb-2">£54,000 raised of £90,000 yearly goal</p>
        <p className="text-sm text-gray-500">Help us raise the remaining £36,000 to support our community!</p>
      </div>

      {/* What We Do */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">What We Do</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/youth-club.jpg"
                alt="Family Support"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-12 h-12 mx-auto bg-[#E0E7FF] rounded-full flex items-center justify-center mb-3">
              <span className="text-xl">👨‍👩‍👧‍👦</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Family Support</h3>
            <p className="text-gray-600 text-sm">
              Providing essential resources, counselling, and practical help to families in need.
            </p>
            <p className="text-sm text-[#6366F1] mt-2">£120 supports one family</p>
          </div>
          <div className="text-center">
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden">
              <Image
                src="/images/sports.jpg"
                alt="Community Groups"
                fill
                className="object-cover"
              />
            </div>
            <div className="w-12 h-12 mx-auto bg-[#FCE7F3] rounded-full flex items-center justify-center mb-3">
              <span className="text-xl">👥</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Community Groups</h3>
            <p className="text-gray-600 text-sm">
              Running weekly support groups including kids & coffee clubs, skills workshops, and social groups.
            </p>
            <p className="text-sm text-[#FF3366] mt-2">£60 funds one session</p>
          </div>
          <div className="text-center">
            <div className="relative w-full aspect-video mb-4 rounded-lg overflow-hidden bg-[#000B1D]">
              <Image
                src="/images/superman-flying.jpg"
                alt="Skills Development - Learning to fly with Superman"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="w-12 h-12 mx-auto bg-[#E0E7FF] rounded-full flex items-center justify-center mb-3">
              <span className="text-xl">🦸‍♂️</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">Skills Development</h3>
            <p className="text-gray-600 text-sm">
              Teaching practical life skills including CV writing, job searching, and flying!
            </p>
            <p className="text-sm text-[#6366F1] mt-2">£150 funds one program</p>
          </div>
        </div>
      </div>

      {/* Recent Updates */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Updates</h2>
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src="/images/youth-club.jpg"
                alt="Arts & Nature Group Session"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E0E7FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎨</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Arts & Nature Group</h3>
                  <p className="text-xs text-gray-500">2 days ago</p>
                </div>
              </div>
              <p className="text-gray-600">
                Amazing session today! Our participants created beautiful art & nature group projects. So many beautiful creations 
                and wonderful conversations. The community spirit was truly heartwarming!
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src="/images/education.jpg"
                alt="Skills Workshop Session"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FCE7F3] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🎓</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Skills Workshop Success</h3>
                  <p className="text-xs text-gray-500">4 days ago</p>
                </div>
              </div>
              <p className="text-gray-600">
                Three of our participants landed their dream jobs this week! Their dedication to learning and growth has paid off. 
                Special thanks to our mentors who helped them discover their inner strength.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative w-full aspect-video">
              <Image
                src="/images/core-costs.jpg"
                alt="Community Coffee Morning"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#E0E7FF] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-sm">🌟</span>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Community Heroes Spotlight</h3>
                  <p className="text-xs text-gray-500">1 week ago</p>
                </div>
              </div>
              <p className="text-gray-600">
                Meet Sarah, one of our amazing volunteers who's been running our weekly coffee morning for a year now. 
                Her dedication has helped create a welcoming space where friendships flourish.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-[#6366F1] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-lg mb-4">Your support can change lives. Donate today!</p>
          <button className="px-6 py-3 bg-white text-[#6366F1] rounded-full hover:bg-opacity-90 transition-colors">
            Donate Now
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Image
                src="/images/smb-logo.png"
                alt="Small But Mighty Logo"
                width={32}
                height={32}
                className="object-contain"
              />
              <span className="text-sm text-gray-600">© 2025 Small But Mighty</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard" className="text-sm text-gray-600 hover:text-gray-900">
                Back to Raiser Dashboard
              </Link>
              <span className="text-sm text-gray-400">|</span>
              <span className="text-sm text-gray-600">Powered by Raiser</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
} 