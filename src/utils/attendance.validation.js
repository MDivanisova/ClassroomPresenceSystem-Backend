import zod from "zod"

const attendanceSchema = zod.object({
    classroomID: zod.string().min(1, "ClassroomID must be at least 1"),
    title: zod.string().min(1, "The title of the classroom is required ").max(50, "The title of the classroom cant be longer than 30 characters")
})

export {
    attendanceSchema
}