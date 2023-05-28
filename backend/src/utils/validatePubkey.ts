import * as anchor from '@coral-xyz/anchor';

export const validatePubkey = (pubkey: string): boolean => {
  try {
    const key = new anchor.web3.PublicKey(pubkey);
    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};
