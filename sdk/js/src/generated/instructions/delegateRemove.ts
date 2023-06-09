/**
 * This code was GENERATED using the solita package.
 * Please DO NOT EDIT THIS FILE, instead rerun solita to update it or write a wrapper to add functionality.
 *
 * See: https://github.com/metaplex-foundation/solita
 */

import * as beet from '@metaplex-foundation/beet'
import * as web3 from '@solana/web3.js'

/**
 * @category Instructions
 * @category DelegateRemove
 * @category generated
 */
export const delegateRemoveStruct = new beet.BeetArgsStruct<{
  instructionDiscriminator: number[] /* size: 8 */
}>(
  [['instructionDiscriminator', beet.uniformFixedSizeArray(beet.u8, 8)]],
  'DelegateRemoveInstructionArgs'
)
/**
 * Accounts required by the _delegateRemove_ instruction
 *
 * @property [**signer**] account
 * @property [] delegate
 * @property [_writable_] rentCollector
 * @property [_writable_] delegateToken
 * @category Instructions
 * @category DelegateRemove
 * @category generated
 */
export type DelegateRemoveInstructionAccounts = {
  account: web3.PublicKey
  delegate: web3.PublicKey
  rentCollector: web3.PublicKey
  delegateToken: web3.PublicKey
  systemProgram?: web3.PublicKey
  anchorRemainingAccounts?: web3.AccountMeta[]
}

export const delegateRemoveInstructionDiscriminator = [
  255, 43, 23, 184, 224, 7, 79, 228,
]

/**
 * Creates a _DelegateRemove_ instruction.
 *
 * @param accounts that will be accessed while the instruction is processed
 * @category Instructions
 * @category DelegateRemove
 * @category generated
 */
export function createDelegateRemoveInstruction(
  accounts: DelegateRemoveInstructionAccounts,
  programId = new web3.PublicKey('oCDofJsKeaWoyXWCtEY6vXgxvAdkmUdbXBRsedvUWkx')
) {
  const [data] = delegateRemoveStruct.serialize({
    instructionDiscriminator: delegateRemoveInstructionDiscriminator,
  })
  const keys: web3.AccountMeta[] = [
    {
      pubkey: accounts.account,
      isWritable: false,
      isSigner: true,
    },
    {
      pubkey: accounts.delegate,
      isWritable: false,
      isSigner: false,
    },
    {
      pubkey: accounts.rentCollector,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.delegateToken,
      isWritable: true,
      isSigner: false,
    },
    {
      pubkey: accounts.systemProgram ?? web3.SystemProgram.programId,
      isWritable: false,
      isSigner: false,
    },
  ]

  if (accounts.anchorRemainingAccounts != null) {
    for (const acc of accounts.anchorRemainingAccounts) {
      keys.push(acc)
    }
  }

  const ix = new web3.TransactionInstruction({
    programId,
    keys,
    data,
  })
  return ix
}
