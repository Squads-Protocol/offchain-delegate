use anchor_lang::prelude::*;

/// PDA seeds:
/// ["delegate_token", account, delegate]
#[account]
#[derive(InitSpace)]
pub struct DelegateToken {
    /// The public key of the delegating account.
    pub account: Pubkey,

    /// The public key authorized to perform off-chain operations on behalf of the `account`.
    pub delegate: Pubkey,

    /// The Unix time (in seconds since the Unix epoch) when the token should expire.
    pub expires: u32,

    /// The PDA bump.
    pub bump: u8,
}
