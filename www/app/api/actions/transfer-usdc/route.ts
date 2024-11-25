/**
 * Solana Actions for USDC Transfer
 */

import {
  ActionPostResponse,
  createPostResponse,
  ActionGetResponse,
  ActionPostRequest,
  createActionHeaders,
  ActionError,
} from "@solana/actions";
import {
  clusterApiUrl,
  Connection,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import { DEFAULT_USDC_ADDRESS, DEFAULT_USDC_AMOUNT } from "./const";

// Create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/transfer-usdc?to=${toPubkey.toBase58()}`,
      requestUrl.origin,
    ).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "Actions - Transfer USD Coin",
      icon: new URL("https://ucarecdn.com/ee18c01a-d01d-4ad6-adb6-cac9a5539d2c/usdc.png", requestUrl.origin).toString(),
      description: "Transfer USDC to another Solana wallet",
      label: "Transfer", // This value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: "Send 10 USDC",
            href: `${baseHref}&amount=10`,
          },
          {
            label: "Send 15 USDC",
            href: `${baseHref}&amount=15`,
          },
          {
            label: "Send 25 USDC",
            href: `${baseHref}&amount=25`,
          },
          {
            label: "Send USDC",
            href: `${baseHref}&amount={amount}`, // This href will have a text input
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of USDC to send",
                required: true,
              },
            ],
          },
        ],
      },
    };

    return Response.json(payload, { headers });
  } catch (err) {
    console.error("Error in GET request:", err);
    const actionError: ActionError = { 
      message: typeof err === "string" ? err : "An unknown error occurred" 
    };
    return Response.json(actionError, { status: 400, headers });
  }
};

// Ensure CORS works for BLINKS
export const OPTIONS = async () => Response.json(null, { headers });

export const POST = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { amount, toPubkey } = validatedQueryParams(requestUrl);

    const body: ActionPostRequest = await req.json();

    // Validate the client provided input
    let account: PublicKey;
    try {
      account = new PublicKey(body.account);
    } catch (err) {
      throw 'Invalid "account" provided';
    }

    const connection = new Connection(
      process.env.SOLANA_RPC || clusterApiUrl("mainnet"),
    );

    // Ensure the receiving account will be rent exempt
    const minimumBalance = await connection.getMinimumBalanceForRentExemption(0);
    if (amount * LAMPORTS_PER_SOL < minimumBalance) {
      throw `Account may not be rent exempt: ${toPubkey.toBase58()}`;
    }

    // Create an instruction to transfer USDC from one wallet to another
    const transferUsdcInstruction = SystemProgram.transfer({
      fromPubkey: account,
      toPubkey: toPubkey,
      lamports: amount * LAMPORTS_PER_SOL,
    });

    // Get the latest blockhash and block height
    const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();

    // Create a legacy transaction
    const transaction = new Transaction({
      feePayer: account,
      blockhash,
      lastValidBlockHeight,
    }).add(transferUsdcInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} USDC to ${toPubkey.toBase58()}`,
      },
    });

    return Response.json(payload, { headers });
  } catch (err) {
    console.error("Error in POST request:", err);
    const actionError: ActionError = { 
      message: typeof err === "string" ? err : "An unknown error occurred" 
    };
    return Response.json(actionError, { status: 400, headers });
  }
};

function validatedQueryParams(requestUrl: URL) {
  let toPubkey: PublicKey = DEFAULT_USDC_ADDRESS;
  let amount: number = DEFAULT_USDC_AMOUNT;

  try {
    if (requestUrl.searchParams.get("to")) {
      toPubkey = new PublicKey(requestUrl.searchParams.get("to")!);
    }
  } catch (err) {
    throw "Invalid input query parameter: to";
  }

  try {
    if (requestUrl.searchParams.get("amount")) {
      amount = parseFloat(requestUrl.searchParams.get("amount")!);
    }

    if (amount <= 0) throw "Amount is too small";
  } catch (err) {
    throw "Invalid input query parameter: amount";
  }

  return {
    amount,
    toPubkey,
  };
}