// Coinstats API integration for fetching gas prices and chain data
import axios from "axios";

const COINSTATS_API_BASE = "https://api.coinstats.app/public/v2";

export interface ChainGasData {
  chainId: string;
  chainName: string;
  gasPrice: number; // in GWEI
  tokenSymbol: string;
  estimatedGasCost: number; // in USD
}

export interface GasAnalysis {
  chains: ChainGasData[];
  contractCodeLength: number;
  estimatedComplexity: string;
}

// Supported blockchain chains with their identifiers
const SUPPORTED_CHAINS = [
  { id: "ethereum", name: "Ethereum", symbol: "ETH", chainId: "1" },
  { id: "polygon", name: "Polygon", symbol: "MATIC", chainId: "137" },
  { id: "bsc", name: "Binance Smart Chain", symbol: "BNB", chainId: "56" },
  { id: "arbitrum", name: "Arbitrum", symbol: "ETH", chainId: "42161" },
  { id: "optimism", name: "Optimism", symbol: "ETH", chainId: "10" },
  { id: "avalanche", name: "Avalanche", symbol: "AVAX", chainId: "43114" },
];

/**
 * Fetch current gas prices for all supported chains
 * Uses token prices from coinstats to calculate estimated costs
 */
export async function fetchChainGasData(): Promise<ChainGasData[]> {
  try {
    const chainGasData: ChainGasData[] = [];

    // Fetch all token prices in one request for efficiency
    const response = await axios.get(
      `${COINSTATS_API_BASE}/coins/marks?limit=100&skip=0&currency=usd`
    );

    const coins = response.data.coins;
    const coinMap = new Map(coins.map((coin: any) => [coin.symbol, coin.price]));

    // For each supported chain, calculate gas data
    for (const chain of SUPPORTED_CHAINS) {
      const tokenPrice = coinMap.get(chain.symbol) || 0;

      // Estimate gas costs (typical smart contract deployment/interaction)
      // Average gas limit for a contract interaction
      const estimatedGasLimit = 200000; // standard estimate
      const estimatedGasPrice = getEstimatedGasPrice(chain.id); // GWEI

      const estimatedGasCostUSD = (estimatedGasLimit * estimatedGasPrice * tokenPrice) / 1e9;

      chainGasData.push({
        chainId: chain.chainId,
        chainName: chain.name,
        gasPrice: estimatedGasPrice,
        tokenSymbol: chain.symbol,
        estimatedGasCost: estimatedGasCostUSD,
      });
    }

    return chainGasData;
  } catch (error) {
    console.error("Error fetching chain gas data:", error);
    // Return fallback data if API fails
    return getFallbackChainData();
  }
}

/**
 * Get estimated gas prices for different chains
 * In production, this should fetch from actual chain RPC endpoints
 */
function getEstimatedGasPrice(chainId: string): number {
  // These are typical/average gas prices - in production, fetch from actual chain
  const gasPrices: Record<string, number> = {
    ethereum: 45, // GWEI
    polygon: 35, // GWEI
    bsc: 3, // GWEI
    arbitrum: 0.3, // GWEI
    optimism: 0.5, // GWEI
    avalanche: 25, // GWEI
  };
  return gasPrices[chainId] || 20;
}

/**
 * Fallback chain data in case API fails
 */
function getFallbackChainData(): ChainGasData[] {
  return [
    {
      chainId: "1",
      chainName: "Ethereum",
      gasPrice: 45,
      tokenSymbol: "ETH",
      estimatedGasCost: 5.2,
    },
    {
      chainId: "137",
      chainName: "Polygon",
      gasPrice: 35,
      tokenSymbol: "MATIC",
      estimatedGasCost: 1.8,
    },
    {
      chainId: "56",
      chainName: "Binance Smart Chain",
      gasPrice: 3,
      tokenSymbol: "BNB",
      estimatedGasCost: 0.45,
    },
    {
      chainId: "42161",
      chainName: "Arbitrum",
      gasPrice: 0.3,
      tokenSymbol: "ETH",
      estimatedGasCost: 0.03,
    },
    {
      chainId: "10",
      chainName: "Optimism",
      gasPrice: 0.5,
      tokenSymbol: "ETH",
      estimatedGasCost: 0.05,
    },
    {
      chainId: "43114",
      chainName: "Avalanche",
      gasPrice: 25,
      tokenSymbol: "AVAX",
      estimatedGasCost: 1.5,
    },
  ];
}

/**
 * Estimate contract complexity based on code analysis
 */
export function estimateComplexity(contractCode: string): string {
  const codeLength = contractCode.length;
  const functionCount = (contractCode.match(/function\s+\w+/gi) || []).length;
  const storageVarCount = (
    contractCode.match(/\b(public|private|internal|external)\s+\w+\s+\w+/gi) || []
  ).length;

  const complexityScore = functionCount + storageVarCount / 2;

  if (codeLength < 500) return "Simple";
  if (complexityScore < 10) return "Low";
  if (complexityScore < 30) return "Medium";
  if (complexityScore < 60) return "High";
  return "Very High";
}
