import { z } from 'zod';

export const issueSchema = z.object({
  issue_title: z.string().min(1, "Title is required.").max(255),
  issue_desc: z.string().min(1, "Description is required.")
});