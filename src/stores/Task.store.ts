import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useToast } from 'primevue/usetoast';
import Task from '../Models/Task.model'
import { ref } from 'vue'


export const useTaskStore = defineStore('tasks', () =>
{
    const toast = useToast();
    const tasks = ref<Task[]>([])


    const getTaskByListId = (id: string) =>
    {
        return tasks.value.filter((x: any) => x.listId == id)
    }


    async function addTask(task: Task)
    {
        try
        {
            const response: any = await axios.post('/tasks/addTask', task)
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
            const response: any = await axios.put(`/tasks/updateTask/${task._id}`, task)
            if (response.success)
            {
                const index = tasks.value.findIndex((x) => x._id == response.data._id)
                if (index != -1)
                {
                    tasks.value[index] = response.data
                }
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
            }
        } catch (e)
        {
            console.log(e)
        }
    }

    async function getAllTasks()
    {
        try
        {
            const response: any = await axios.get(`/tasks/getAllTasks`)
            tasks.value = [...response.data]
        } catch (e)
        {
            console.log(e)
        }
    }

    async function deleteTask(id: string)
    {
        try
        {
            const response: any = await axios.delete(`/tasks/deleteTask/${id}`)
            const index = tasks.value.findIndex((x) => x._id == response.data._id)
            if (index != -1)
            {
                tasks.value.splice(index, 1)
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
            }

        } catch (e)
        {
            console.log(e)
        }
    }

    return { addTask, UpdateTask, getAllTasks, deleteTask, tasks, getTaskByListId }
})