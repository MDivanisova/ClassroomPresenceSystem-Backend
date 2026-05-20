import zod from 'zod'

const attendeeSchema = zod.object({
    attendee: zod.hex().min(24,"user id must be exactly 24 long").max(24),
    attendance: zod.hex().min(24,"attendance id must be exactly 24 long").max(24),
    enterIn: zod.string().datetime()
});

const attendeesSchema = zod.object({
    attendees: zod.array(attendeeSchema).min(1, "At least one attendee is required")
});

export {
    attendeesSchema
};