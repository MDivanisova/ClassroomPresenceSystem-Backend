import zod from "zod"

const loginSchema = zod.object({
    username: zod.string().min(5,"Username is too short, must be longer than 5 characters").max(50,"Username is too long, must be less than 20 characters"),
    password: zod.string().min(7,"Password is too short, must be longer than 7 characters").max(30,"Password is too long, must be less than 30 characters")
});

export {
    loginSchema
};