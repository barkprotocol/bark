/**
 * Solana Actions for BARK Token Transfer
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
import { DEFAULT_BARK_ADDRESS, DEFAULT_BARK_AMOUNT } from "./const";

// Create the standard headers for this route (including CORS)
const headers = createActionHeaders();

export const GET = async (req: Request) => {
  try {
    const requestUrl = new URL(req.url);
    const { toPubkey } = validatedQueryParams(requestUrl);

    const baseHref = new URL(
      `/api/actions/transfer-bark?to=${toPubkey.toBase58()}`,
      requestUrl.origin,
    ).toString();

    const payload: ActionGetResponse = {
      type: "action",
      title: "Actions - Transfer BARK",
      icon: new URL("https://ucarecdn.com/c18275e5-d6ca-42d3-9075-676952548776/barkicon.png", requestUrl.origin).toString(),
      description: "Transfer BARK to another Solana wallet",
      label: "Transfer", // This value will be ignored since `links.actions` exists
      links: {
        actions: [
          {
            label: "Send 10000 BARK",
            href: `${baseHref}&amount=10000`,
          },
          {
            label: "Send 15000 BARK",
            href: `${baseHref}&amount=15000`,
          },
          {
            label: "Send 100000 BARK",
            href: `${baseHref}&amount=100000`,
          },
          {
            label: "Send BARK",
            href: `${baseHref}&amount={amount}`, // This href will have a text input
            parameters: [
              {
                name: "amount",
                label: "Enter the amount of BARK to send",
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

    // Create an instruction to transfer BARK token from one wallet to another
    const transferBarkInstruction = SystemProgram.transfer({
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
    }).add(transferBarkInstruction);

    const payload: ActionPostResponse = await createPostResponse({
      fields: {
        transaction,
        message: `Send ${amount} BARK to ${toPubkey.toBase58()}`,
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
  let toPubkey: PublicKey = DEFAULT_BARK_ADDRESS;
  let amount: number = DEFAULT_BARK_AMOUNT;

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