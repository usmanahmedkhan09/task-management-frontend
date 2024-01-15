import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useToast } from 'primevue/usetoast';


export const useSubTasksStore = defineStore('SubTasks', () =>
{
    const toast = useToast();

    async function deleteSubTask(id: string)
    {
        try
        {
            let response: any = await axios.delete(`/subtasks/deleteSubtask/${id}`)
            if (response.success)
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
        } catch (e)
        {
            console.log(e)
        }
    }

    return { deleteSubTask }
})