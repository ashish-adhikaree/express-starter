import z from 'zod';

export const GenerateSASBodySchema =z.object( {
  filename: z.string().min(1),
});

export type GenerateSASBody =  z.infer<typeof GenerateSASBodySchema>;