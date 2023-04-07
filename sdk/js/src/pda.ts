import { PublicKey } from "@solana/web3.js";
import { PROGRAM_ID } from "./generated";
import { utf8 } from "./dataUtils";

export function getDelegateTokenPda({
  account,
  delegate,
  programId = PROGRAM_ID,
}: {
  account: PublicKey;
  delegate: PublicKey;
  programId?: PublicKey;
}) {
  return PublicKey.findProgramAddressSync(
    [utf8.encode("delegate_token"), account.toBytes(), delegate.toBytes()],
    programId
  );
}
