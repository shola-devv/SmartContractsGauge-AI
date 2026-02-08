# Quick Start Guide - Smart Contract Analyzer

## Setup (5 minutes)

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Add OpenAI API Key
Create `.env.local` in the project root:
```
OPENAI_API_KEY=sk_your_key_here
```

Get your key from: https://platform.openai.com/api-keys

### Step 3: Run Development Server
```bash
npm run dev
```

### Step 4: Open in Browser
Navigate to: http://localhost:3000/landing

## Using the App

1. **Paste a smart contract** (Solidity code) into the text area
2. **Click "Analyze Contract"** button
3. **Wait for analysis** - Shows "Analyzing..." while processing
4. **View results** - Shows:
   - Contract complexity level
   - Gas costs for each blockchain
   - AI recommendations for optimization
5. **Analyze another** contract or go back

## File Structure

```
📁 smartgauge/
├── 📄 package.json              # Dependencies
├── 📄 .env.local               # Your API keys (create this)
├── 📁 app/
│   ├── 📁 landing/
│   │   └── page.tsx            # Input page
│   ├── 📁 home/
│   │   └── page.tsx            # Results page
│   └── 📁 api/
│       └── 📁 analyze-contract/
│           └── route.ts        # Analysis API
└── 📁 lib/
    └── coinstats.ts            # Gas price data
```

## Key API Endpoints

### Analyze Contract
```
POST /api/analyze-contract
Content-Type: application/json

{
  "contractCode": "pragma solidity ^0.8.0;\n..."
}
```

## Features

✅ AI-powered contract analysis using GPT-4
✅ Multi-chain gas estimation (6+ blockchains)
✅ Smooth animated transitions
✅ Real-time gas pricing from Coinstats
✅ Contract complexity assessment
✅ Actionable optimization recommendations

## Troubleshooting

**Error: "OpenAI API key not configured"**
- Make sure `.env.local` exists with your key
- Restart development server

**Error: "Cannot find module 'framer-motion'"**
- Run: `npm install framer-motion`

**Empty analysis results**
- Check browser console (F12) for errors
- Verify OpenAI account has API credits

## Next Steps

- Add more optimization suggestions
- Implement user authentication
- Save analysis history
- Add security analysis
- Support more blockchain networks

## Support

For issues, check the main README.md or open an issue on GitHub.
