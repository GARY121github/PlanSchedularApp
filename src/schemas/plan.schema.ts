import zod from 'zod';

export const priorityEnum = zod.enum(["LOW", "MEDIUM", "HIGH"]);

export const statusEnum = zod.enum(["TODO", "IN_PROGRESS", "DONE"]);

const planSchema = zod.object({
    id : zod.string().uuid().optional(),
    name : zod
    .string()
    .min(2 , "Name should be atleast 2 characters long")
    .max(100 , "Name should be atmost 100 characters long"),
    description : zod
    .string()
    .max(500 , "Description should be atmost 500 characters long")
    .optional(),
    priority : priorityEnum,
    status : statusEnum.optional(),
});

export type Plan = zod.infer<typeof planSchema>;
export type Status = zod.infer<typeof statusEnum>;
export type Proprity = zod.infer<typeof priorityEnum>;

export default planSchema;