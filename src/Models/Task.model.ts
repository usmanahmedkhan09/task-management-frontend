export default class Task
{
    _id?: string | undefined;
    title: string | undefined
    description: string | undefined
    listId: string | undefined
    subtasks: any[] = []
}