//! This program manages offchain delegate tokens.
//!
//! [`DelegateToken`] account serves as a "marker" that authorizes the [`delegate`][DelegateToken::delegate]
//! to perform any off-chain operations on behalf of the [`account`][DelegateToken::account].
//! Typically, the [`delegate`][DelegateToken::delegate] is a Keypair account, but this is not guaranteed by the program.
//! The [`DelegateToken`] is necessary for situations that require signing a message with the [`account`][DelegateToken::account]'s private key
//! to be verified off chain, thereby proving control over the [`account`][DelegateToken::account]'s address, such as in the "Sign In with X" flow.
//! Dapps can easily verify if a [`delegate`][DelegateToken::delegate] is authorized by the [`account`][DelegateToken::account]
//! by checking if a [`DelegateToken`] account with seeds `["delegate_token", account, delegate]` exists ans is not expired.
//!
//!
//! Users might want to create a delegate token for different reasons, such as:
//! - When account is a PDA. PDAs don't have private keys, so they cannot sign messages themselves, necessitating a [`delegate`][DelegateToken::delegate] that can.
//! - When a user wants to be able to sign into dapps with the same account using multiple private keys.
//!
//! ## Trust Model:
//! - Both the creation and removal instructions of the DelegateToken must be signed by the [`account`][DelegateToken::account], so dapps can trust this token.
//! - This account serves only as a marker and should not be given any more trust by dapps.
//! - It should not be used in any on-chain logic in any programs except this one. Furthermore, the [`delegate`][DelegateToken::delegate] should never be accepted as a replacement for the [`account`][DelegateToken::account] in any on-chain programs.
//!
use anchor_lang::prelude::*;

pub use state::*;

mod state;

declare_id!("oCDofJsKeaWoyXWCtEY6vXgxvAdkmUdbXBRsedvUWkx");

const SEED_DELEGATE_TOKEN: &[u8] = b"delegate_token";

#[program]
pub mod offchain_delegate {
    use super::*;

    pub fn delegate_add(ctx: Context<DelegateAdd>, expires: Option<u32>) -> Result<()> {
        let delegate_token = &mut ctx.accounts.delegate_token;

        delegate_token.account = ctx.accounts.account.key();
        delegate_token.delegate = ctx.accounts.delegate.key();
        delegate_token.expires = expires.unwrap_or(u32::MAX);
        delegate_token.bump = *ctx.bumps.get("delegate_token").unwrap();

        Ok(())
    }

    pub fn delegate_remove(_ctx: Context<DelegateRemove>) -> Result<()> {
        Ok(())
    }
}

#[derive(Accounts)]
pub struct DelegateAdd<'info> {
    pub account: Signer<'info>,

    /// CHECK: This can be pretty much any account, this program has no assumptions about it.
    pub delegate: AccountInfo<'info>,

    /// This can be the `account` itself, but it doesn't have to be.
    /// CHECK: We allow passing any account here for more flexibility.
    #[account(mut)]
    pub rent_payer: Signer<'info>,

    #[account(
        init,
        payer = rent_payer,
        space = 8 + DelegateToken::INIT_SPACE,
        seeds = [SEED_DELEGATE_TOKEN, account.key().as_ref(), delegate.key().as_ref()],
        bump
    )]
    pub delegate_token: Account<'info, DelegateToken>,

    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DelegateRemove<'info> {
    pub account: Signer<'info>,

    /// CHECK: This can be pretty much any account, this program has no assumptions about it.
    pub delegate: AccountInfo<'info>,

    /// This can be the `account` itself, but it doesn't have to be.
    /// CHECK: We allow passing any account here for more flexibility.
    #[account(mut)]
    pub rent_collector: AccountInfo<'info>,

    #[account(
        mut,
        close = rent_collector,
        seeds = [SEED_DELEGATE_TOKEN, account.key().as_ref(), delegate.key().as_ref()],
        bump
    )]
    pub delegate_token: Account<'info, DelegateToken>,

    pub system_program: Program<'info, System>,
}
