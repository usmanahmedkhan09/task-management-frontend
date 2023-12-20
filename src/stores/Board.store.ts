import { defineStore } from 'pinia'
import Board from '@/Models/Board.model'
import { ref } from 'vue'
import axios from '@/axios/axios'
import { useToast } from 'primevue/usetoast';

export const useBoardStore = defineStore('boards', () =>
{
    const toast = useToast();
    const board = ref(new Board())
    const boards = ref<Board[]>([])
    const showBoard = ref(false)
    const isEdit = ref<boolean>(false)

    const toggleBoard = (edit: boolean = false) =>
    {
        showBoard.value = !showBoard.value
        isEdit.value = edit
    }

    const selectedBoard = (id: string | undefined) =>
        board.value = boards.value.find((x: any) => x._id == id) as Board


    async function addBoard(board: Board)
    {
        try
        {
            let response: any = await axios.post('/boards/addBoard', board)
            if (response.success)
            {
                toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
                boards.value.push(response.data)
                showBoard.value = false
            }
        } catch (e)
        {
            console.log(e)
        }
    }

    async function getAllBoards()
    {
        try
        {
            let response: any = await axios.get('/boards',)
            if (response.success)
            {
                boards.value = [...response.data]
                board.value = boards.value[0]
                showBoard.value = false
            }
        } catch (e)
        {
            // toast.add({ severity: 'success', summary: 'Success Message', detail: response.message, life: 3000 });
            console.log('e', e)
        }
    }

    async function UpdateBoard(board: Board)
    {
        try
        {
            let response: any = await axios.put(`/boards/updateBoard/${board._id}`, board)
            if (response.success)
            {
                toast.add({ severity: 'success', summary: 'Board successfully updated.', detail: response.message, life: 3000 });
                let index = boards.value.findIndex((board) => board._id == response.data._id)
                if (index != -1)
                    boards.value[index] = response.data
                console.log(response.data)
                // boards.value.push(response.data)
            }
        } catch (e)
        {

        }
    }

    return { addBoard, getAllBoards, toggleBoard, boards, showBoard, board, selectedBoard, isEdit, UpdateBoard }
})
