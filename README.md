
#  SmartGauge AI

SmartGauge AI analyzes smart contract complexity, estimates gas costs across major EVM chains, and delivers AI-generated, actionable optimization suggestions to help developers ship more efficient contracts.

##  What It Does

Paste in a Solidity smart contract and SmartGauge will:

- 📊 Estimate **deployment & interaction gas costs**
- 🧠 Assign a **complexity score** (Simple → Very High)
- 🤖 Generate **AI-powered optimization suggestions**
- 🌍 Compare costs across multiple EVM chains

Supported chains:
- Ethereum  
- Polygon  
- Arbitrum  
- Optimism  
- Binance Smart Chain  
- Avalanche  

The goal is simple: give you clarity **before deployment** — so you’re not going into testnet blind.

---

## 🧠 How It Works

When you submit a contract, three processes run **in parallel**:

### 1. Complexity Analysis
- Runs locally (no API calls)
- Regex-based scanning:
  - Functions
  - State variables
  - Loops
  - Storage patterns
- Outputs a **complexity score**

### 2. Gas Estimation
- Fetches live gas data via Etherscan Gas Oracle
- Applies **chain-specific multipliers**
- Handles failures gracefully (fallback-safe)

### 3. AI Optimization
- Uses LLM (default: Groq llama-3.3-70b-versatile)
- Combines:
  - Contract code
  - Live gas data
- Produces:
  - Cost estimates per chain
  - Specific optimization suggestions
  - Validation if input isn’t Solidity

---

##  Tech Stack

**Frontend**
- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS

**Backend**
- Node.js API routes
- Parallel execution with `Promise.all`

**AI Providers (pluggable)**
- Groq (default)
- OpenAI
- Gemini
- Anthropic

---

## ✨ Features

-  Bring-your-own API key (encrypted storage)  
-  Markdown-rendered AI responses  
-  Dark mode UI  
-  Copy-to-clipboard for results  
-  Typing indicator during analysis  
-  Live gas price sidebar  

---

##  Important Note

SmartGauge is **not a replacement for proper testing or auditing**.

It’s a **pre-deployment tool** to:
- Spot inefficiencies early  
- Estimate costs  
- Improve contract design before deeper testing  

---


---

## 🌐 Use the Live App

👉 [Try SmartGauge AI](smart-contracts-gauge-ai.vercel.app)

---

---



## 📝 Article

I wrote a full breakdown of how SmartGauge AI was built, including architecture decisions, debugging challenges, and lessons learned.

👉 [Read the full article here](https://medium.com/@olusholaemmanuelfayinminu/smartgauge-i-built-an-ai-app-that-understands-solidity-smart-contracts-their-gas-usage-and-gas-3a5e31954db1)

---



---

## License

MIT

## Author
- Shola Emmanuel

  sholaemmanuel.dev


