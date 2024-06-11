import {z} from "zod"

export const jobfilterschema = z.object({
    q: z.string().optional(),
    jobtype: z.string().optional(),
    joblocation: z.string().optional(),
})

export type JobFilterValues = z.infer<typeof jobfilterschema>;