import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";
import { fetchChainGasData, estimateComplexity } from "@/lib/coinstats";

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface AnalysisRequest {
  contractCode: string;
}

interface AnalysisResponse {
  success: boolean;
  contractCode: string;
  gasEstimates: Array<{
    chainId: string;
    chainName: string;
    gasPrice: number;
    estimatedGasCost: number;
    tokenSymbol: string;
  }>;
  optimizationSuggestions: string;
  complexity: string;
  error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body: AnalysisRequest = await request.json();
    const { contractCode } = body;

    if (!contractCode || contractCode.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Contract code is required" },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { success: false, error: "OpenAI API key not configured" },
        { status: 500 }
      );
    }

    // Get complexity estimate
    const complexity = estimateComplexity(contractCode);

    // Fetch gas data for all chains
    const chainGasData = await fetchChainGasData();

    // Prepare the prompt for OpenAI, prompt should carry my fetched gas data and my precalc code compecity
    const systemPrompt = `You are an expert smart contract auditor and gas optimization specialist. 
Analyze the provided Solidity smart contract code and provide:
1 An estimate of the contracts gas costs based on the chain data given
2. Specific optimization recommendations to reduce gas costs
3. Security considerations
4. An overall complexity assessment (Low, Medium, High) based on the code structure and patterns used.
Keep your response concise but detailed, focusing on actionable improvements.`;

    const userPrompt = `Please analyze this smart contract and provide optimization suggestions:

\`\`\`solidity
${contractCode}
\`\`\`

Focus on:
- Gas optimization opportunities
- Storage patterns that could be more efficient
- Function call patterns that consume unnecessary gas
- Loop optimizations
- State variable packing opportunities`;

    // Call OpenAI API
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      max_tokens: 1500,
      temperature: 0.7,
    });

    const optimizationSuggestions =
      completion.choices[0]?.message?.content ||
      "Unable to generate optimization suggestions";

    return NextResponse.json({
      success: true,
      contractCode: contractCode.substring(0, 100) + "...", // Store only first 100 chars
      gasEstimates: chainGasData,///the fucl
      optimizationSuggestions,
      complexity
    } as AnalysisResponse);
  } catch (error) {
    console.error("Error analyzing contract:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    return NextResponse.json(
      {
        success: false,
        error: `Failed to analyze contract: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}
