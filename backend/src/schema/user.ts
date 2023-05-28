import { z } from 'zod';

export const UserSchema = z.object({
  signature: z
    .string({
      required_error: 'Signature is required',
    })
    .nonempty(),

  github: z
    .string({
      required_error: 'Github is required',
    })
    .nonempty(),
  publicKey: z
    .string({
      required_error: 'Public key is required',
    })
    .nonempty(),
});
