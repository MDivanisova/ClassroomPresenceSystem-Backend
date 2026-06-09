import zod, { email } from "zod"
import { ROLE } from "./enums.js";

const loginSchema = zod.object({
    username: zod.string().min(5,"Username is too short, must be longer than 5 characters").max(20,"Username is too long, must be less than 20 characters"),
    password: zod.string().min(5,"Password is too short, must be longer than 5 characters").max(30,"Password is too long, must be less than 30 characters")
});

const userIDSchema = zod.object({
    userID: zod.hex().min(24,"user id is required and needs to be 24 characters exactly").max(24)
});

const registerSchema = zod.object({
    index: zod.string(),
    name: zod.string(),
    surname: zod.string(),
    username: zod.string().min(5,"Username is too short, must be longer than 5 characters").max(20,"Username is too long, must be less than 20 characters"),
    password: zod.string().min(5,"Password is too short, must be longer than 5 characters").max(30,"Password is too long, must be less than 30 characters"),
    email: zod.string().email(),
    role: zod.enum([ROLE.notRegularProfesor, ROLE.notRegularStuden, ROLE.regularProfesor, ROLE.regularStudent, ROLE.admin])

});

const editUserSchema = zod.object({
    userID: zod.hex().min(24,"user id is required and needs to be 24 characters exactly").max(24),
    index: zod.string(),
    name: zod.string(),
    surname: zod.string(),
    username: zod.string().min(5,"Username is too short, must be longer than 5 characters").max(20,"Username is too long, must be less than 20 characters"),
    email: zod.string().email(),
    role: zod.enum([ROLE.notRegularProfesor, ROLE.notRegularStuden, ROLE.regularProfesor, ROLE.regularStudent, ROLE.admin])

});

export {
    loginSchema,
    registerSchema,
    userIDSchema,
    editUserSchema
};