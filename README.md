# Off-Chain Delegate Program

This program manages off-chain delegate tokens.

The `DelegateToken` account serves as a "marker" that authorizes the `delegate` to perform any off-chain operations on behalf of the `account`.
Typically, the `delegate` is a Keypair account, but this is not guaranteed by the program.
The `DelegateToken` is necessary for situations that require signing a message with the `account`'s private key to be verified off chain,
thereby proving control over the `account`'s address, such as in the "Sign In with X" flow. 
Dapps can easily verify if a `delegate` is authorized by the `account` by checking
if a `DelegateToken` account with seeds `["delegate_token", account, delegate]` exists and is not expired.

Users might want to create a delegate token for different reasons, such as:

- When the `account` is a PDA. PDAs don't have private keys, so they cannot sign messages themselves, necessitating a `delegate` that can.
- When a user wants to be able to sign into dapps with the same account using multiple private keys.

## Trust Model:
- Both the creation and removal instructions of the `DelegateToken` must be signed by the `account`, so dapps can trust this token.
- This account serves only as a marker and should not be given any more trust by dapps.
- It should not be used in any on-chain logic in any programs except this one. Furthermore, the `delegate` should never be accepted as a replacement for the `account` in any on-chain programs.
