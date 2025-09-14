import { prisma } from "../../prisma.js"
import asyncHandler from "express-async-handler"

export const updateCompleteWorkoutLog = asyncHandler(async (req, res) => {
    const logId = +req.params.id


    try {
    const workoutLog = await prisma.workoutLog.update({
        where: {
            id: logId
        }, 
        data: {
            isCompleted: true
        },
    })

    res.json(workoutLogTime)
} catch(error) {
    res.status(404)
    throw new Error('Workout log not found!')
    
}

})

// export const completeWorkoutLog = asyncHandler(async (req, res) => {

//     const {isCompleted} = req.body


//      try {
//         const workoutLog = await prisma.workoutLog.update({
//             where: {
//                 id: +req.params.id
//             },
//             data: {
//                 isCompleted
//             },
//             include: { workout: true, workoutLog: true}
//         })

//         res.json(workoutLog)
//      } catch(error) {
//         res.status(404)
//         throw new Error('Workout log not found!')
//      }
// })