import { Construction } from "lucide-react";

export default function UnderConstruction() {
  return (
    <div className="min-h-screen bg-[#090e18] text-white flex items-center justify-center px-6">
      <div className="max-w-xl text-center">
        <Construction className="w-16 h-16 mx-auto text-yellow-400 mb-6" />

        <h1 className="text-5xl font-bold mb-4">
          🚧 Demo Under Construction
        </h1>

        <p className="text-gray-400 mb-6">
          This project is currently being prepared for deployment.
        </p>

        <div className="bg-[#0d1117] border border-white/10 rounded-xl p-5">
          <p>✅ Source Code Available</p>
          <p>✅ Analysis Complete</p>
          <p>🚧 Public Demo Coming Soon</p>
        </div>

        <p className="mt-6 text-sm text-gray-500 italic">
          The model finished training before the deployment finished deploying.
        </p>
      </div>
    </div>
  );
}