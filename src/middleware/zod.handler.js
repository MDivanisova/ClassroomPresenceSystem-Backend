import zod from "zod"

const errorHandler = (err, req, res, next)=>{
    if(err instanceof zod.ZodError){
        const formatedError = err.issues.map(error=>({
            field: error.path.join("."),
            message: error.message
        }));
        return res.status(400).json({
            "message" : "validation error",
            "error": formatedError
        })
    }
}

export {errorHandler};