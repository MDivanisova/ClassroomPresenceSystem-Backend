import zod from "zod"

const attendanceSchema = zod.object({
    classroomID: zod.hex().min(24,"classroom id must be exactly 24 long").max(24),
    title: zod.string().min(1, "The title of the classroom is required ").max(50, "The title of the classroom cant be longer than 50 characters")
})

const attendanceIdSchema = zod.object({
    attendanceID: zod.hex().min(24,"attendance id must be exactly 24 long").max(24)
})

export {
    attendanceSchema,
    attendanceIdSchema
}