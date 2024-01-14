import * as yup from 'yup';


export function useValidators()
{
    const boardSchema = yup.object({
        name: yup.string().required(),
    });

    const taskSchema = yup.object({
        _id: yup.string(),
        title: yup.string().required(),
    })
    return { boardSchema, taskSchema }
}