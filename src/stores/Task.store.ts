import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useToast } from 'primevue/usetoast';
import Task from '../Models/Task.model'
import { ref } from 'vue'


export const useTaskStore = defineStore('tasks', () =>
{
    const toast = useToast();
    const tasks = ref<Task[]>([])


    async function addTask(task: Task)
    {
        try
        {
            let response: any = await axios.post('/tasks/addTask', task)
            if (response.success)
            {
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
                tasks.value.push(response.data)
            }
        } catch (e)
        {
            console.log(e)
        }
    }

    async function UpdateTask(task: Task)
    {
        try
        {
            let response: any = await axios.put(`/tasks/updateTask/${task._id}`, task)
            if (response.success)
            {
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
                console.log(response.data)
                // boards.value.push(response.data)
            }
        } catch (e)
        {
            console.log(e)
        }
    }

    async function getAllTasks(id: string)
    {
        try
        {
            let response: any = await axios.get(`/tasks/getTaskByList/${id}`)
            return response
        } catch (e)
        {
            console.log(e)
        }
    }

    return { addTask, UpdateTask, getAllTasks }
})