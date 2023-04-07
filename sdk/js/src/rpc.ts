import {
  Connection,
  PublicKey,
  SendOptions,
  Signer,
  TransactionSignature,
} from "@solana/web3.js";
import * as transactions from "./transactions";

export async function delegateAdd({
  connection,
  account,
  delegate,
  rentPayer = account,
  feePayer = rentPayer,
  expires,
  sendOptions,
}: {
  connection: Connection;
  account: Signer;
  delegate: PublicKey;
  rentPayer?: Signer;
  feePayer?: Signer;
  expires?: number;
  sendOptions?: SendOptions;
}): Promise<TransactionSignature> {
  const blockhash = (await connection.getLatestBlockhash()).blockhash;

  const tx = transactions.delegateAdd({
    blockhash,
    account: account.publicKey,
    delegate,
    rentPayer: rentPayer.publicKey,
    expires,
  });

  tx.sign([account, rentPayer, feePayer]);

  return await connection.sendTransaction(tx, sendOptions);
}

export async function delegateRemove({
  connection,
  account,
  delegate,
  rentCollector,

  feePayer = account,
  sendOptions,
}: {
  connection: Connection;
  account: Signer;
  delegate: PublicKey;
  rentCollector: PublicKey;
  feePayer?: Signer;
  sendOptions?: SendOptions;
}): Promise<TransactionSignature> {
  const blockhash = (await connection.getLatestBlockhash()).blockhash;

  const tx = transactions.delegateRemove({
    blockhash,
    account: account.publicKey,
    delegate,
    rentCollector,
  });

  tx.sign([account, feePayer]);

  return await connection.sendTransaction(tx, sendOptions);
}
