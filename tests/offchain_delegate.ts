import * as assert from "assert";
import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { OffchainDelegate } from "../target/types/offchain_delegate";

describe("offchain_delegate", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace
    .OffchainDelegate as Program<OffchainDelegate>;

  const account = anchor.web3.Keypair.generate();
  const delegate = anchor.web3.Keypair.generate();

  const [delegateToken, bump] = anchor.web3.PublicKey.findProgramAddressSync(
    [
      new TextEncoder().encode("delegate_token"),
      account.publicKey.toBytes(),
      delegate.publicKey.toBytes(),
    ],
    program.programId
  );

  describe("add_delegate", () => {
    it("should create DelegateToken account", async () => {
      // Expire in 1 sec
      const expires = Math.floor(Date.now() / 1000) + 1;

      const tx = await program.methods
        .addDelegate(expires)
        .accounts({
          account: account.publicKey,
          delegate: delegate.publicKey,
          rentPayer: program.provider.publicKey,
          delegateToken,
        })
        .signers([account])
        .rpc();

      const delegateTokenData = await program.account.delegateToken.fetch(
        delegateToken
      );

      assert.strictEqual(
        delegateTokenData.account.toBase58(),
        account.publicKey.toBase58()
      );
      assert.strictEqual(
        delegateTokenData.delegate.toBase58(),
        delegate.publicKey.toBase58()
      );
      assert.strictEqual(delegateTokenData.expires, expires);
      assert.strictEqual(delegateTokenData.bump, bump);
    });
  });

  describe("remove_delegate", () => {
    it("should delete DelegateToken account", async () => {
      const rentCollector = anchor.web3.Keypair.generate();

      const tx = await program.methods
        .removeDelegate()
        .accounts({
          account: account.publicKey,
          delegate: delegate.publicKey,
          rentCollector: rentCollector.publicKey,
          delegateToken,
        })
        .signers([account])
        .rpc();

      const delegateTokenData =
        await program.account.delegateToken.fetchNullable(delegateToken);

      // DelegateToken is deleted.
      assert.strictEqual(delegateTokenData, null);

      // `rentCollector` collected the rent.
      const rent =
        await program.provider.connection.getMinimumBalanceForRentExemption(
          program.account.delegateToken.size
        );
      const rentCollectorBalance = await program.provider.connection.getBalance(
        rentCollector.publicKey
      );
      assert.strictEqual(rentCollectorBalance, rent);
    });
  });
});
