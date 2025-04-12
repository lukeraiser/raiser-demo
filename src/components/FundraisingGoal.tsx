export default function FundraisingGoal() {
  const raised = 15000;
  const target = 25000;
  const progress = (raised / target) * 100;

  return (
    <div className="bg-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Our Fundraising Goal</h2>
          <p className="mt-4 text-lg text-gray-600">
            Help us reach our target to make an even bigger impact in our community
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gray-100 rounded-full h-6 overflow-hidden">
            <div
              className="bg-[#F72585] h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between mt-4">
            <div className="text-left">
              <p className="text-2xl font-bold text-[#F72585]">£{raised.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Raised</p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">£{target.toLocaleString()}</p>
              <p className="text-sm text-gray-600">Target</p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-[#4361EE] text-white px-8 py-3 rounded-full font-semibold hover:bg-opacity-90 transition">
              Donate Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 