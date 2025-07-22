# StateViz

Interactive playground for blockchain data structures.

## Features

- **MPT (Merkle Patricia Trie)** visualization
- Creative, modern UI with unique color schemes  
- Easy to add new algorithms
- Built with TypeScript + Next.js + Chakra UI v2

## Quick Start

```bash
# Install dependencies
yarn install

# Start dev server
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
src/
├── app/           # Next.js app router
├── components/    # React components  
├── styles/        # Theme and styles
└── types/         # TypeScript definitions
```

## Tech Stack

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Chakra UI v2** - Component library
- **React Icons** - Icon library
- **Framer Motion** - Animations

## Adding New Algorithms

1. Add algorithm to `src/components/Sidebar.tsx`
2. Create visualization component
3. Add types to `src/types/index.ts`

Built for exploring blockchain data structures.