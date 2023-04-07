import {
  PublicKey,
  TransactionMessage,
  VersionedTransaction,
} from "@solana/web3.js";
import * as instructions from "./instructions";

export function delegateAdd({
  blockhash,
  account,
  delegate,
  rentPayer,
  feePayer = rentPayer,
  expires,
}: {
  blockhash: string;
  feePayer?: PublicKey;
  account: PublicKey;
  delegate: PublicKey;
  rentPayer: PublicKey;
  expires?: number;
}): VersionedTransaction {
  const ix = instructions.delegateAdd({
    account,
    delegate,
    rentPayer,
    expires,
  });

  const message = new TransactionMessage({
    payerKey: feePayer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message();

  return new VersionedTransaction(message);
}

export function delegateRemove({
  blockhash,
  account,
  delegate,
  rentCollector,
  feePayer = account,
}: {
  blockhash: string;
  feePayer?: PublicKey;
  account: PublicKey;
  delegate: PublicKey;
  rentCollector: PublicKey;
}): VersionedTransaction {
  const ix = instructions.delegateRemove({
    account,
    delegate,
    rentCollector,
  });

  const message = new TransactionMessage({
    payerKey: feePayer,
    recentBlockhash: blockhash,
    instructions: [ix],
  }).compileToV0Message();

  return new VersionedTransaction(message);
}
