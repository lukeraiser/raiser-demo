import Image from 'next/image';

export default function ImpactHero() {
  return (
    <div className="relative h-[500px] bg-[#4361EE] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[#4361EE] opacity-20" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-20 left-0 w-full h-[480px] bg-[#F72585] opacity-10 transform -skew-y-6" />
          <div className="absolute top-40 right-0 w-full h-[460px] bg-[#F72585] opacity-10 transform skew-y-6" />
        </div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="flex items-center space-x-4 mb-8">
          <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
            <div className="w-14 h-14 bg-[#7209B7] rounded-full relative">
              {/* Superhero logo would go here */}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Small But Mighty</h1>
            <p className="text-white text-opacity-90">Community Support Charity</p>
          </div>
        </div>

        <div className="max-w-2xl">
          <h2 className="text-5xl font-bold text-white mb-6">Small Actions, Big Impact</h2>
          <p className="text-xl text-white mb-8">
            Building stronger communities through support, connection, and empowerment.
          </p>
          <div className="flex space-x-4">
            <button className="bg-[#F72585] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
              Donate Now
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:bg-opacity-10 transition">
              Get Involved
            </button>
          </div>
        </div>

        {/* Powered by Raiser */}
        <div className="absolute top-8 right-8 flex items-center">
          <span className="text-white text-sm mr-2">Powered by</span>
          <div className="text-[#FF69B4] font-bold">RAISER</div>
        </div>
      </div>
    </div>
  );
} 