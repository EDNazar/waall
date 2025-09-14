import { useMemo } from "react"
import WorkoutService from "../../../services/workout/workout.service"
import { useForm } from "react-hook-form"
import { useMutation } from "@tanstack/react-query"


export const useNewWorkout = () => {
           const {
            register,
            handleSubmit,
            formState: { errors },
            control,
            reset
        } = useForm({
            mode: 'onChange'
        })

    const {isSuccess, error, isLoading, mutate} = useMutation({mutationKey: ['create workout'], mutationFn: (body) => WorkoutService.create(body), 
        onSuccess: () => {
            reset({
                name: '',
                exerciseIds: []
            })
        }
    })

	const onSubmit = data => {
		mutate({
            name: data.name,
            exerciseIds: data.exerciseIds.map(ex => ex.value)
        })
	}

    return useMemo(() => ({
            register,
            handleSubmit,
            errors,
            control,
            isSuccess,
            error,
            isLoading,
            onSubmit
    }), [errors,
         isSuccess,
         error,
         isLoading
    ])
}