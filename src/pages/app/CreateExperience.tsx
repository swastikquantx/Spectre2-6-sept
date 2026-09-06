export default function CreateExperience() {
  return (
    <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto text-center py-10">
      <h1 className="text-4xl font-light tracking-tight text-white mb-8">What do you want to build?</h1>
      
      <div className="w-full relative mb-16">
        <input 
          type="text" 
          placeholder="Describe your software, venture, or system..." 
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-xl text-white placeholder-slate-500 focus:outline-none focus:border-white/20 focus:bg-white/10 transition-all text-center"
        />
        <div className="absolute inset-y-0 right-4 flex items-center">
          <button className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold tracking-tight hover:bg-slate-200 transition-colors">
            GENERATE
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
        {[
          "NEW VENTURE", "SOFTWARE / SaaS", "BUSINESS SYSTEM", "AI APPLICATION", 
          "AUTOMATION", "AGENT", "WEBSITE / PORTAL", "START FROM TEMPLATE"
        ].map((item) => (
          <div key={item} className="bg-white/[0.02] border border-white/5 hover:border-white/10 hover:bg-white/[0.04] transition-colors rounded-xl p-6 cursor-pointer flex flex-col items-center justify-center h-32 gap-3 group">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-slate-400 group-hover:text-white transition-colors">
              <span className="text-lg">+</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest group-hover:text-white transition-colors">{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
