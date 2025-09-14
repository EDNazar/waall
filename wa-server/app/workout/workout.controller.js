// @desc  Get user profile
// @route GET /api/users/profile
import asyncHandler from "express-async-handler"
import { prisma } from "../prisma.js"
import { UserFields } from "../utils/user.utils.js"
import { calculateMinute } from "./calculate-minute.js"

// @access Private

export const getWorkouts = asyncHandler(async (req, res) => {

    const workouts = await prisma.workout.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        include: {
            exercises: true
        }
    })

    res.json(workouts)
})

export const getWorkout = asyncHandler(async (req, res) => {
    const workout = await prisma.workout.findUnique({
        where: { id: +req.params.id },
        include: {
            exercises: true
        }
    })

    if(!workout) {
        res.status(404)
        throw new Error('Workout not found!')
    }

    const minutes = calculateMinute(workout.exercises.length)

    res.json({...workout, minutes })
})

export const createNewWorkout = asyncHandler(async (req, res) => {
    const { name, exerciseIds } = req.body 

    const workout = await prisma.workout.create({
        data: {
            name,
            exercises: {
                connect: exerciseIds.map((id) => ({ id: +id }))
            }
        }
    })

    res.json(workout)
})


export const updateWorkout = asyncHandler(async (req, res) => {
    const { name, exerciseIds } = req.body 

    try {
    const workout = await prisma.workout.update({
        where: {
            id: +req.params.id
        },
        data: {
            name,
            exercises: {
                set: exerciseIds.map((id) => ({ id: +id }))
            }
        }
    })

    res.json(workout)

   } catch(error) {
     res.status(404)
     throw new Error('Exercise not found!')
   }


})

export const deleteWorkout = asyncHandler(async (req, res) => {

    try {
    const workout = await prisma.workout.delete({
        where: {
            id: +req.params.id
        },
    })

    res.json({message: 'Workout deleted!'})

   } catch(error) {
     res.status(404)
     throw new Error('Workout not found!')
   }


})


