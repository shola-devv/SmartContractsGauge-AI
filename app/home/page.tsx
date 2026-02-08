"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Loader, Zap, Coins } from "lucide-react";
import { useRouter } from "next/navigation";

interface ChainGasData {
  chainId: string;
  chainName: string;
  gasPrice: number;
  tokenSymbol: string;
  estimatedGasCost: number;
}

interface AnalysisResult {
  success: boolean;
  contractCode: string;
  complexity: string;
  gasEstimates: ChainGasData[];
  optimizationSuggestions: string;
  error?: string;
}

const HomePage = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [contractCode, setContractCode] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showInput, setShowInput] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const isAnalyzing = localStorage.getItem("isAnalyzing");
    const savedCode = localStorage.getItem("analysisContractCode");
    const savedResult = localStorage.getItem("analysisResult");

    if (savedCode) {
      setContractCode(savedCode);
    }

    if (savedResult) {
      try {
        const result = JSON.parse(savedResult);
        setAnalysisResult(result);
        setShowInput(false);
        setIsLoading(false);
      } catch (error) {
        console.error("Error parsing analysis result:", error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleNewAnalysis = () => {
    localStorage.removeItem("analysisContractCode");
    localStorage.removeItem("analysisResult");
    localStorage.removeItem("isAnalyzing");
    router.push("/landing");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Header */}
        <header className="border-b border-slate-700/50 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <button
              onClick={handleNewAnalysis}
              className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <ArrowLeft size={20} />
              <span>Back to Analyzer</span>
            </button>
            <h1 className="text-2xl font-bold text-white">Smart Contract Analysis</h1>
            <div className="w-24"></div>
          </div>
        </header>

        {/* Main content */}
        <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
          {isLoading ? (
            <div className="flex items-center justify-center h-96">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              >
                <Loader size={48} className="text-blue-400" />
              </motion.div>
            </div>
          ) : analysisResult && analysisResult.success ? (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-8"
              >
                {/* Contract Complexity */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
                >
                  <h2 className="text-xl font-semibold text-white mb-4">Contract Complexity</h2>
                  <div className="inline-block px-4 py-2 rounded-lg bg-purple-500/20 border border-purple-500/50">
                    <span className="text-purple-300 font-medium">{analysisResult.complexity}</span>
                  </div>
                </motion.div>

                {/* Gas Estimates */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Zap className="text-yellow-400" size={24} />
                    <h2 className="text-xl font-semibold text-white">Estimated Gas Costs by Chain</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {analysisResult.gasEstimates.map((chain) => (
                      <motion.div
                        key={chain.chainId}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 hover:border-blue-500/50 transition-colors"
                      >
                        <h3 className="text-lg font-semibold text-blue-300 mb-3">{chain.chainName}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Gas Price:</span>
                            <span className="text-white font-medium">{chain.gasPrice.toFixed(2)} GWEI</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Token:</span>
                            <span className="text-white font-medium">{chain.tokenSymbol}</span>
                          </div>
                          <div className="flex justify-between pt-2 border-t border-slate-600">
                            <span className="text-gray-400 font-semibold">Estimated Cost:</span>
                            <span className="text-yellow-400 font-bold">${chain.estimatedGasCost.toFixed(2)}</span>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Optimization Suggestions */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-slate-800/50 border border-slate-700 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-6">
                    <Coins className="text-green-400" size={24} />
                    <h2 className="text-xl font-semibold text-white">Optimization Suggestions</h2>
                  </div>
                  <div className="prose prose-invert max-w-none">
                    <div className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {analysisResult.optimizationSuggestions}
                    </div>
                  </div>
                </motion.div>

                {/* Action Button */}
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleNewAnalysis}
                  className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200"
                >
                  Analyze Another Contract
                </motion.button>
              </motion.div>
            </AnimatePresence>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <h2 className="text-2xl font-bold text-white mb-4">No analysis data available</h2>
              <button
                onClick={handleNewAnalysis}
                className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Analyzer
              </button>
            </motion.div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% {
            transform: translate(0, 0) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
        }

        .animate-blob {
          animation: blob 7s infinite;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;
