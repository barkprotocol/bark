# BARK | Web UI/UX

BARK Protocol is a web3 application for managing and claiming exclusive BARK and Solana SPL tokens through various DEXs. Built with Next.js, TypeScript, and optimized for performance, this app leverages Solana's blockchain technology to facilitate easy token management and user interactions.

For more information about the BARK Protocol, visit the official [BARK Protocol Website](https://www.barkprotocol.net).

## Features
- **Wallet & Payments Integration:** Supports Solana wallet connections, including Phantom, Solflare, and Backpack wallets.
- **Rewards Campaigns:** Claim BARK and Solana SPL tokens from active campaigns.
- **Staking & NFT Marketplace:** Stake NFTs and earn rewards.
- **Solana Blockchain & Blinks Integration:** Fast and secure on-chain and blinks interactions using Solana's network.
- **Crowdfunding Campaigns:** Manage and configure airdrop campaigns via the dashboard.

## Technologies Used
- **Next.js:** A React framework for server-side rendering and static site generation.
- **TypeScript:** For strongly typed JavaScript code.
- **Solana Blockchain:** For fast and secure token transactions.
- **Tailwind CSS:** A utility-first CSS framework for building responsive and customizable user interfaces.
- **Mantine:** A React component library for modern UI components.
- **Supabase:** For database management and authentication.
- **Turbopack:** A new bundler optimized for React and Next.js.
- **Vercel:** For deployment.

## Setup and Installation

To get started with the project locally, follow the steps below.

### Prerequisites

Make sure you have the following installed:
- Node.js (>= 16.x)
- npm or yarn

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/bark-protocol/bark-protocol-prod.git
   ```

2. Install dependencies:

   If you're using npm:
   ```bash
   npm install
   ```

   Or, if you're using yarn:
   ```bash
   yarn install
   ```

3. Set up environment variables:

   - Copy the `.env.template` file to `.env.local` in the root directory.

     ```bash
     cp .env.template .env.local
     ```

   - Edit the `.env.local` file with the required values.

     Example `.env.local`:

     ```bash
     NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
     NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
     NEXT_PUBLIC_SOLANA_NETWORK=devnet
     NEXT_PUBLIC_SOLANA_RPC_URL=https://api.devnet.solana.com
     NEXT_PUBLIC_MINT_API_URL=https://api.actions.barkprotocol.net/mint
     TOKEN_PROGRAM_ID=TokenkegQfeZyiNwAJbNbGKPFXkQd5J8X8wnF8MPzYx
     NFT_PROGRAM_ID=
     DEFAULT_WALLET_ADDRESS=
     METADATA_SERVICE_URL=
     SECRET_KEY=your-secret-key-here
     JWT_SECRET=your-jwt-secret-key-here
     NODE_ENV=development
     ```

4. Run the application:

   For development:
   ```bash
   npm run dev
   ```

   Or, if you're using yarn:
   ```bash
   yarn dev
   ```

   The app will now be running at `http://localhost:3000`.

### Vercel Deployment

To deploy your project to Vercel, follow these steps:

1. Push your changes to GitHub.
2. Go to [Vercel](https://vercel.com/) and sign in with your GitHub account.
3. Click "New Project" and import the repository.
4. Vercel will automatically detect the correct configuration and deploy your app.

### Environment Variables on Vercel

Make sure to add the environment variables to your Vercel project under **Project Settings > Environment Variables**.

## Contributing

We welcome contributions! If you have suggestions or improvements, feel free to open an issue or a pull request.

### Steps for Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature/your-feature`).
5. Create a pull request from your fork.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [Solana](https://solana.com/) for fast and decentralized blockchain technology.
- [Next.js](https://nextjs.org/) for easy React application development with server-side rendering.
- [Tailwind CSS](https://tailwindcss.com/) for modern CSS utility classes.
- [Shadcn/ui](https://ui.shadcn.com/docs/) for UI components.
- [Supabase](https://supabase.com/) for the backend as a service.
```