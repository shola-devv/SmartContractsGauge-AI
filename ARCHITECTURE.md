# Smart Contract Analyzer - Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        SMART CONTRACT ANALYZER                   │
└─────────────────────────────────────────────────────────────────┘

FRONTEND LAYER
┌──────────────────────────────────────────────────────────────┐
│                      Landing Page (/landing)                  │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Contract Code Input (textarea)                        │  │
│  │  - Character counter                                   │  │
│  │  - Size warning (> 10KB)                              │  │
│  │  - Beautiful gradient border                          │  │
│  │  - Loading state with spinner                         │  │
│  └────────────────────────────────────────────────────────┘  │
│  Info Cards: Multi-Chain | Gas Estimates | AI Powered       │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ (Submit)
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                    API Layer (/api/analyze-contract)          │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  1. Receive contract code (POST request)              │  │
│  │  2. Estimate contract complexity                      │  │
│  │  3. Fetch gas prices from Coinstats API              │  │
│  │  4. Call OpenAI GPT-4 for analysis                   │  │
│  │  5. Return comprehensive analysis result             │  │
│  └────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────┘
                              │
                              │ (Save to localStorage)
                              │ (Navigate to /home)
                              ▼
┌──────────────────────────────────────────────────────────────┐
│                      Home Page (/home)                        │
│  ┌────────────────────────────────────────────────────────┐  │
│  │  Animated Results Display                             │  │
│  │  ├─ Contract Complexity Badge                        │  │
│  │  ├─ Gas Estimates Cards (6 chains)                   │  │
│  │  │  ├─ Chain Name                                    │  │
│  │  │  ├─ Gas Price (GWEI)                             │  │
│  │  │  ├─ Token Symbol                                 │  │
│  │  │  └─ Estimated Cost (USD)                         │  │
│  │  └─ AI Optimization Suggestions                      │  │
│  │     (Formatted markdown from GPT-4)                  │  │
│  └────────────────────────────────────────────────────────┘  │
│  [Analyze Another Contract Button]                          │
└──────────────────────────────────────────────────────────────┘
```

## Data Flow Diagram

```
USER INPUT
    │
    ├─► Enter Smart Contract Code
    │   (Solidity format)
    │
    ▼
LANDING PAGE
    │
    ├─► Store in localStorage:
    │   - analysisContractCode
    │   - isAnalyzing = "true"
    │
    ▼
SUBMIT BUTTON
    │
    ├─► POST /api/analyze-contract
    │   {
    │     contractCode: "pragma solidity..."
    │   }
    │
    ▼
API ANALYSIS ENDPOINT
    │
    ├─► 1. Calculate Complexity
    │   └─► Analyze code structure
    │
    ├─► 2. Fetch Gas Prices
    │   └─► Call Coinstats API
    │       └─► Get token prices
    │
    ├─► 3. Generate AI Analysis
    │   └─► Call OpenAI GPT-4
    │       └─► Get optimization suggestions
    │
    ├─► 4. Compile Results
    │   {
    │     success: true,
    │     complexity: "High",
    │     gasEstimates: [...],
    │     optimizationSuggestions: "..."
    │   }
    │
    ▼
RESPONSE HANDLER
    │
    ├─► Store result in localStorage:
    │   - analysisResult (JSON)
    │
    ├─► Navigate to /home
    │
    ▼
HOME PAGE
    │
    ├─► Load from localStorage
    │
    ├─► Display:
    │   ├─ Complexity
    │   ├─ Gas costs per chain
    │   └─ Optimization suggestions
    │
    ▼
USER VIEWS RESULTS
    │
    ├─► Option 1: Analyze Another
    │   └─► Back to /landing
    │
    └─► Option 2: View Details
        └─► Scroll through suggestions
```

## Component Hierarchy

```
App (Layout)
│
├── Landing Page
│   ├── Header (title + description)
│   ├── Form
│   │   ├── Textarea (contract input)
│   │   ├── Character counter
│   │   ├── Submit button
│   │   │   ├── Button text
│   │   │   ├── Loader (animated)
│   │   │   └── Arrow icon
│   │   └── Info cards grid
│   │       ├── Multi-Chain card
│   │       ├── Gas Estimates card
│   │       └── AI Powered card
│   └── Background effects
│       ├── Blob 1 (blue)
│       ├── Blob 2 (purple)
│       └── Blob 3 (pink)
│
└── Home Page
    ├── Header
    │   ├── Back button
    │   └── Title
    ├── Main content
    │   ├── Complexity section
    │   │   └── Badge
    │   ├── Gas Estimates section
    │   │   └── Gas cards grid
    │   │       ├── Card 1 (Ethereum)
    │   │       ├── Card 2 (Polygon)
    │   │       ├── Card 3 (BSC)
    │   │       ├── Card 4 (Arbitrum)
    │   │       ├── Card 5 (Optimism)
    │   │       └── Card 6 (Avalanche)
    │   ├── Suggestions section
    │   │   └── Formatted markdown
    │   └── Action button
    └── Background effects
```

## API Request/Response Flow

```
REQUEST
┌─────────────────────────────────────────┐
│ POST /api/analyze-contract              │
├─────────────────────────────────────────┤
│ Headers:                                 │
│   Content-Type: application/json         │
├─────────────────────────────────────────┤
│ Body:                                    │
│ {                                        │
│   "contractCode":                        │
│   "pragma solidity ^0.8.0;\n             │
│    contract MyToken { ... }"             │
│ }                                        │
└─────────────────────────────────────────┘
           │
           ▼
PROCESSING
┌─────────────────────────────────────────┐
│ 1. Parse request body                    │
│ 2. Validate contract code exists         │
│ 3. Estimate complexity                   │
│ 4. Fetch gas prices (Coinstats)          │
│ 5. Call OpenAI GPT-4 API                 │
│ 6. Compile results                       │
└─────────────────────────────────────────┘
           │
           ▼
RESPONSE
┌──────────────────────────────────────────────────────┐
│ 200 OK (Application/JSON)                            │
├──────────────────────────────────────────────────────┤
│ {                                                     │
│   "success": true,                                    │
│   "contractCode": "pragma solidity...",              │
│   "complexity": "High",                              │
│   "gasEstimates": [                                  │
│     {                                                │
│       "chainId": "1",                                │
│       "chainName": "Ethereum",                       │
│       "gasPrice": 45,                                │
│       "tokenSymbol": "ETH",                          │
│       "estimatedGasCost": 5.2                        │
│     },                                               │
│     ... (5 more chains)                              │
│   ],                                                 │
│   "optimizationSuggestions":                         │
│   "1. Use assembly for critical paths\n             │
│    2. Minimize storage reads..."                     │
│ }                                                     │
└──────────────────────────────────────────────────────┘
```

## Animation Timeline

```
Landing Page Load (0-800ms)
├─ 0ms: Page mounts
├─ 200ms: Title fades in
├─ 400ms: Description fades in
├─ 600ms: Form scales up
├─ 800ms: All elements at full opacity

Form Submission (Click → Home)
├─ 0ms: Submit button disabled, spinner starts
├─ 100ms: Button changes color
├─ 200ms: localStorage updated
├─ 300ms: Modal animation starts
├─ 500ms: Navigate to /home

Home Page Results (Staggered)
├─ 200ms: Complexity card fades in + slides
├─ 300ms: Gas cards start appearing
│  ├─ 300ms: Card 1 scales in
│  ├─ 350ms: Card 2 scales in
│  ├─ 400ms: Card 3 scales in
│  ├─ 450ms: Card 4 scales in
│  ├─ 500ms: Card 5 scales in
│  └─ 550ms: Card 6 scales in
├─ 400ms: Suggestions section fades in
├─ 500ms: Action button appears
└─ 800ms: All animations complete
```

## Technology Stack

```
┌─────────────────────────────────────────────────────────┐
│                  Frontend Technologies                   │
├─────────────────────────────────────────────────────────┤
│ • Next.js 16         - React framework & routing        │
│ • React 19           - UI library                       │
│ • TypeScript          - Type safety                     │
│ • Tailwind CSS        - Styling                         │
│ • Framer Motion      - Animations                       │
│ • Lucide React       - Icons                            │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                  Backend Technologies                    │
├─────────────────────────────────────────────────────────┤
│ • Next.js API Routes - Serverless endpoints            │
│ • OpenAI SDK         - GPT-4 integration               │
│ • Axios              - HTTP client                     │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   External APIs                          │
├─────────────────────────────────────────────────────────┤
│ • OpenAI GPT-4       - Smart contract analysis         │
│ • Coinstats          - Real-time gas pricing           │
└─────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   Data Storage                           │
├─────────────────────────────────────────────────────────┤
│ • localStorage       - Client-side data persistence    │
│ • Environment Vars   - API keys & config               │
└─────────────────────────────────────────────────────────┘
```

## File Organization

```
smartgauge/
├── app/
│   ├── layout.tsx                  # Root layout
│   ├── globals.css                 # Global styles
│   │
│   ├── landing/
│   │   └── page.tsx               # Landing page component
│   │
│   ├── home/
│   │   └── page.tsx               # Results display page
│   │
│   └── api/
│       └── analyze-contract/
│           └── route.ts           # Analysis API endpoint
│
├── lib/
│   └── coinstats.ts              # Gas pricing utilities
│
├── public/                         # Static assets
│
├── package.json                    # Dependencies
├── tsconfig.json                   # TypeScript config
├── next.config.ts                  # Next.js config
├── .env.local                      # Environment variables
│
└── README & Guides
    ├── SMART_CONTRACT_ANALYZER_README.md
    ├── QUICK_START.md
    └── PROJECT_COMPLETE.md
```

## State Management

```
Landing Page State:
├── contractCode: string (textarea value)
├── isLoading: boolean (during submission)
├── isSubmitting: boolean (form submission state)

Home Page State:
├── analysisResult: AnalysisResult | null (from API)
├── contractCode: string (from localStorage)
├── isLoading: boolean (initial load state)
├── showInput: boolean (UI state)

localStorage State:
├── analysisContractCode: string
├── analysisResult: string (JSON)
├── isAnalyzing: boolean
```

This architecture provides:
✅ Clean separation of concerns
✅ Responsive & animated UI
✅ Real-time data from multiple APIs
✅ Type-safe TypeScript implementation
✅ Scalable structure for future features
