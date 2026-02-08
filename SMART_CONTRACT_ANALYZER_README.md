# Smart Contract Analyzer - AI Chatbot

A sophisticated AI-powered web application that analyzes smart contracts for gas optimization recommendations across multiple blockchain chains.

## Features

✨ **Key Features:**
- **Smart Contract Input** on the landing page with an elegant, modern interface
- **Animated Transition** from landing page to results page when analysis is submitted
- **AI-Powered Analysis** using GPT-4 to generate gas optimization suggestions
- **Multi-Chain Gas Estimates** for Ethereum, Polygon, BSC, Arbitrum, Optimism, and Avalanche
- **Real-time Gas Data** fetched from Coinstats API
- **Contract Complexity Assessment** based on code structure analysis
- **Actionable Optimization Suggestions** for reducing gas consumption

## Project Structure

```
app/
├── landing/
│   └── page.tsx           # Main landing page with contract input
├── home/
│   └── page.tsx           # Results page with analysis output
└── api/
    └── analyze-contract/
        └── route.ts       # API endpoint for contract analysis

lib/
├── coinstats.ts           # Integration with Coinstats API for gas pricing
```

## How It Works

### 1. Landing Page (`/landing`)
- Users paste their Solidity smart contract code
- Clean, modern UI with animated gradient background
- Submit button triggers analysis
- Contract code is stored in localStorage
- User is animated to the home page

### 2. API Analysis (`/api/analyze-contract`)
- Receives smart contract code via POST request
- Fetches current gas prices from Coinstats for 6+ chains
- Calls OpenAI GPT-4 to analyze the contract
- Generates specific optimization recommendations
- Returns analysis results with gas estimates for each chain

### 3. Home Page (`/home`)
- Displays analysis results with smooth animations
- Shows contract complexity level
- Lists estimated gas costs per blockchain
- Displays AI-generated optimization suggestions
- Option to analyze another contract

## Tech Stack

### Frontend
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **Framer Motion** - Animation library for smooth transitions
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library

### Backend
- **Next.js API Routes** - Serverless API endpoints
- **OpenAI GPT-4** - AI model for contract analysis
- **Axios** - HTTP client for API calls

### Data
- **Coinstats API** - Real-time gas price data
- **localStorage** - Client-side data persistence between pages

## Installation

### Prerequisites
- Node.js 18+ 
- npm or yarn
- OpenAI API key

### Setup Steps

1. **Clone and install dependencies:**
```bash
npm install
```

2. **Configure environment variables:**
Create a `.env.local` file:
```bash
OPENAI_API_KEY=sk_your_openai_key_here
```

Alternatively, copy from the example:
```bash
cp .env.local.example .env.local
# Then edit .env.local with your actual API key
```

3. **Run development server:**
```bash
npm run dev
```

4. **Open in browser:**
Navigate to `http://localhost:3000/landing`

## Usage

### Analyzing a Smart Contract

1. **Go to Landing Page** - Visit `/landing`
2. **Paste Contract Code** - Paste your Solidity smart contract into the text area
3. **Submit** - Click "Analyze Contract" button
4. **View Results** - Page animates to `/home` showing:
   - Contract Complexity
   - Gas costs for each chain
   - AI-generated optimization suggestions
5. **Analyze Another** - Button to return to landing page and analyze more contracts

## API Endpoint

### POST `/api/analyze-contract`

**Request:**
```json
{
  "contractCode": "pragma solidity ^0.8.0;\n\ncontract MyContract { ... }"
}
```

**Response:**
```json
{
  "success": true,
  "contractCode": "pragma solidity...",
  "complexity": "High",
  "gasEstimates": [
    {
      "chainId": "1",
      "chainName": "Ethereum",
      "gasPrice": 45,
      "tokenSymbol": "ETH",
      "estimatedGasCost": 5.2
    },
    ...
  ],
  "optimizationSuggestions": "1. Use assembly for gas-intensive operations...\n2. Minimize storage reads..."
}
```

## Supported Chains

| Chain | Gas Price (est.) | Token | Chain ID |
|-------|-----------------|-------|----------|
| Ethereum | 45 GWEI | ETH | 1 |
| Polygon | 35 GWEI | MATIC | 137 |
| BSC | 3 GWEI | BNB | 56 |
| Arbitrum | 0.3 GWEI | ETH | 42161 |
| Optimism | 0.5 GWEI | ETH | 10 |
| Avalanche | 25 GWEI | AVAX | 43114 |

## Animation Flow

1. **Landing Page**: Elements fade in and scale up as page loads
2. **Form Input**: Textarea has glowing border effect on focus
3. **Submit**: Button animates on hover/click
4. **Navigation**: Smooth fade transition when moving to home page
5. **Results**: Cards animate in with staggered delays
6. **Loading**: Rotating spinner during analysis

## Features to Enhance

- [ ] Save analysis history
- [ ] Compare contracts side-by-side
- [ ] Export analysis as PDF
- [ ] User authentication for profile management
- [ ] Community insights on popular patterns
- [ ] Real-time RPC data for actual gas prices
- [ ] Support for other EVM chains
- [ ] Contract security analysis
- [ ] Gas consumption breakdown by function

## Environment Variables

```
OPENAI_API_KEY=sk_...          # Your OpenAI API key (required)
COINSTATS_API_KEY=...          # Coinstats API key (optional)
NODE_ENV=development            # Development or production
```

## Troubleshooting

### "OpenAI API key not configured"
- Ensure `.env.local` exists in the project root
- Add your OpenAI API key to `.env.local`
- Restart the development server

### "Failed to analyze contract"
- Check that the contract code is valid Solidity
- Verify your OpenAI account has credits
- Check browser console for detailed error messages

### Animations not playing
- Ensure framer-motion is installed: `npm install framer-motion`
- Check that Tailwind CSS is properly configured
- Verify browser supports CSS animations

## License

This project is open source and available under the MIT License.

## Support

For issues, questions, or suggestions, please open an issue on the GitHub repository.
