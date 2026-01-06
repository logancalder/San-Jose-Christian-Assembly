export default function InfoBanner() {
  return (
    <div className="w-full bg-white/90 backdrop-blur-sm py-6 px-4 mb-8 rounded-lg shadow-lg">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 text-center">
        {/* Bible Verse */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Today's Verse</h3>
          <p className="text-gray-600 italic">
            "For God so loved the world that he gave his one and only Son, that whoever 
            believes in him shall not perish but have eternal life." 
          </p>
          <p className="text-sm text-gray-500">- John 3:16</p>
        </div>

        {/* Meeting Time */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Join Us Sunday</h3>
          <p className="text-gray-600 text-xl font-medium">9:30 AM</p>
          <p className="text-gray-500">Weekly Worship Service</p>
        </div>

        {/* Address */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-800">Location</h3>
          <p className="text-gray-600">123 Church Street</p>
          <p className="text-gray-600">City, State 12345</p>
        </div>
      </div>
    </div>
  )
} 