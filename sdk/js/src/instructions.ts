import { PublicKey, TransactionInstruction } from "@solana/web3.js";
import {
  createDelegateAddInstruction,
  createDelegateRemoveInstruction,
} from "./generated";
import { getDelegateTokenPda } from "./pda";
import { U32_MAX } from "./dataUtils";

export function delegateAdd({
  account,
  delegate,
  rentPayer,
  expires = U32_MAX,
}: {
  account: PublicKey;
  delegate: PublicKey;
  rentPayer: PublicKey;
  expires?: number;
}): TransactionInstruction {
  const [delegateToken] = getDelegateTokenPda({ account, delegate });

  return createDelegateAddInstruction(
    {
      account,
      delegate,
      rentPayer,
      delegateToken,
    },
    {
      expires,
    }
  );
}

export function delegateRemove({
  account,
  delegate,
  rentCollector,
}: {
  account: PublicKey;
  delegate: PublicKey;
  rentCollector: PublicKey;
}): TransactionInstruction {
  const [delegateToken] = getDelegateTokenPda({ account, delegate });

  return createDelegateRemoveInstruction({
    account,
    delegate,
    rentCollector,
    delegateToken,
  });
}
