import List from './List.model'
export default class Board
{
    _id?: string | undefined
    name: string | undefined;
    description: string | undefined;
    lists: List[] = []
}