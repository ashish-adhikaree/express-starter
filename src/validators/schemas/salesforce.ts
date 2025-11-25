import z from 'zod';

export const UpdateMediaItemUrlBodySchema = z.object({
  url: z.url(),
});

type UpdateMediaItemUrlBody = z.infer<typeof UpdateMediaItemUrlBodySchema>;