
interface dataList {
    name:string;
    quantity: string;
}
interface Listrequest {
    listName: string;
    data:Array<dataList>
}
interface List extends Listrequest {
    id: number;
}
type ListrequestKeys = "listName" | "data"

type ItemRequestKeys = "name" | "quantity"

export {Listrequest,List,ListrequestKeys,ItemRequestKeys }