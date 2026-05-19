import zod from 'zod'

const classroomSchema = zod.object({
    roomNumber: zod.number().min(1,"RoomNumber must be a valid number"),
    floor: zod.number().min(0, "Floor must be a valid number of floor"),
    campus: zod.number().min(1,"Campus must be a valid number of campus").max(4, "Campus number cant be higher tham 4"),
    type: zod.enum(["Предавална","Лабораторија","Амфитеатар"])
})

export {
    classroomSchema
}