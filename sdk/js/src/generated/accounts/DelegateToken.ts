/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as web3 from '@solana/web3.js'
import * as beetSolana from '@metaplex-foundation/beet-solana'
import * as beet from '@metaplex-foundation/beet'

/**
 * Arguments used to create {@link DelegateToken}
 * @category Accounts
 * @category generated
 */
export type DelegateTokenArgs = {
  account: web3.PublicKey
  delegate: web3.PublicKey
  expires: number
  bump: number
}

export const delegateTokenDiscriminator = [154, 179, 63, 13, 91, 194, 129, 34]
/**
 * Holds the data for the {@link DelegateToken} Account and provides de/serialization
 * functionality for that data
 *
 * @category Accounts
 * @category generated
 */
export class DelegateToken implements DelegateTokenArgs {
  private constructor(
    readonly account: web3.PublicKey,
    readonly delegate: web3.PublicKey,
    readonly expires: number,
    readonly bump: number
  ) {}

  /**
   * Creates a {@link DelegateToken} instance from the provided args.
   */
  static fromArgs(args: DelegateTokenArgs) {
    return new DelegateToken(
      args.account,
      args.delegate,
      args.expires,
      args.bump
    )
  }

  /**
   * Deserializes the {@link DelegateToken} from the data of the provided {@link web3.AccountInfo}.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static fromAccountInfo(
    accountInfo: web3.AccountInfo<Buffer>,
    offset = 0
  ): [DelegateToken, number] {
    return DelegateToken.deserialize(accountInfo.data, offset)
  }

  /**
   * Retrieves the account info from the provided address and deserializes
   * the {@link DelegateToken} from its data.
   *
   * @throws Error if no account info is found at the address or if deserialization fails
   */
  static async fromAccountAddress(
    connection: web3.Connection,
    address: web3.PublicKey,
    commitmentOrConfig?: web3.Commitment | web3.GetAccountInfoConfig
  ): Promise<DelegateToken> {
    const accountInfo = await connection.getAccountInfo(
      address,
      commitmentOrConfig
    )
    if (accountInfo == null) {
      throw new Error(`Unable to find DelegateToken account at ${address}`)
    }
    return DelegateToken.fromAccountInfo(accountInfo, 0)[0]
  }

  /**
   * Provides a {@link web3.Connection.getProgramAccounts} config builder,
   * to fetch accounts matching filters that can be specified via that builder.
   *
   * @param programId - the program that owns the accounts we are filtering
   */
  static gpaBuilder(
    programId: web3.PublicKey = new web3.PublicKey(
      'oCDofJsKeaWoyXWCtEY6vXgxvAdkmUdbXBRsedvUWkx'
    )
  ) {
    return beetSolana.GpaBuilder.fromStruct(programId, delegateTokenBeet)
  }

  /**
   * Deserializes the {@link DelegateToken} from the provided data Buffer.
   * @returns a tuple of the account data and the offset up to which the buffer was read to obtain it.
   */
  static deserialize(buf: Buffer, offset = 0): [DelegateToken, number] {
    return delegateTokenBeet.deserialize(buf, offset)
  }

  /**
   * Serializes the {@link DelegateToken} into a Buffer.
   * @returns a tuple of the created Buffer and the offset up to which the buffer was written to store it.
   */
  serialize(): [Buffer, number] {
    return delegateTokenBeet.serialize({
      accountDiscriminator: delegateTokenDiscriminator,
      ...this,
    })
  }

  /**
   * Returns the byteSize of a {@link Buffer} holding the serialized data of
   * {@link DelegateToken}
   */
  static get byteSize() {
    return delegateTokenBeet.byteSize
  }

  /**
   * Fetches the minimum balance needed to exempt an account holding
   * {@link DelegateToken} data from rent
   *
   * @param connection used to retrieve the rent exemption information
   */
  static async getMinimumBalanceForRentExemption(
    connection: web3.Connection,
    commitment?: web3.Commitment
  ): Promise<number> {
    return connection.getMinimumBalanceForRentExemption(
      DelegateToken.byteSize,
      commitment
    )
  }

  /**
   * Determines if the provided {@link Buffer} has the correct byte size to
   * hold {@link DelegateToken} data.
   */
  static hasCorrectByteSize(buf: Buffer, offset = 0) {
    return buf.byteLength - offset === DelegateToken.byteSize
  }

  /**
   * Returns a readable version of {@link DelegateToken} properties
   * and can be used to convert to JSON and/or logging
   */
  pretty() {
    return {
      account: this.account.toBase58(),
      delegate: this.delegate.toBase58(),
      expires: this.expires,
      bump: this.bump,
    }
  }
}

/**
 * @category Accounts
 * @category generated
 */
export const delegateTokenBeet = new beet.BeetStruct<
  DelegateToken,
  DelegateTokenArgs & {
    accountDiscriminator: number[] /* size: 8 */
  }
>(
  [
    ['accountDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)],
    ['account', beetSolana.publicKey],
    ['delegate', beetSolana.publicKey],
    ['expires', beet.u32],
    ['bump', beet.u8],
  ],
  DelegateToken.fromArgs,
  'DelegateToken'
)
