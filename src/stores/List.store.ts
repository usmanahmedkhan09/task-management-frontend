import { defineStore } from 'pinia'
import axios from '@/axios/axios'
import { useToast } from 'primevue/usetoast';
import { ref } from 'vue'


export const useListStore = defineStore('lists', () =>
{
    const toast = useToast();
    const lists = ref<any[]>([])


    async function getBoardLists(boardId: string | undefined)
    {
        try
        {
            let response: any = await axios.get(`/lists/getBoardLists/${boardId}`,)
            if (response.success)
                lists.value = [...response.data]
            else lists.value = []

        } catch (e)
        {
            console.log(e)
        }
    }

    async function deleteListById(listId: string)
    {
        try
        {
            let response: any = await axios.delete(`/lists/deleteList/${listId}`,)
            if (response.success)
                return true

        } catch (e)
        {
            console.log(e)
        }
    }


    return { getBoardLists, lists, deleteListById }
})