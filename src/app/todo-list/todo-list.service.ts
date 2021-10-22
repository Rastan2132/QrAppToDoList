import { Injectable } from '@angular/core';
import {IToDo} from "../shared/interface";

@Injectable({
  providedIn: 'root'
})
export class TodoListService {

  constructor() {
  }

  public getItems(): IToDo[] {
    let todolist:IToDo[] = JSON.parse(localStorage.getItem('todolist') || "[]");
    if(todolist.length == 0)
    {
      console.log('sdfhsfh');
    }
    return todolist;
  }

  public getItem(id: number): IToDo
  {
    let items = this.getItems();
    for (let i of items)
    {
      if(i.id == id)
      {
        return i;
      }
    }
    return null;
  }

  public changeItem(newItem: IToDo)
  {
    let items = this.getItems();
    for (let i in items)
    {
      if(items[i].id == newItem.id)
      {
        items[i] = newItem;
      }
    }
    this.saveItems(items);
  }

  public addItem(item: IToDo)
  {
    let items = this.getItems();
    if(localStorage.getItem('increaseId') == '')
    {
      localStorage.setItem('increaseId', '1');
    }
    else
    {
      let newId = parseInt(localStorage.getItem('increaseId') || '0') + 1;
      item.id = newId;
      localStorage.setItem('increaseId', JSON.stringify(newId));
    }
    items.push(item);
    this.saveItems(items);
  }

  public saveItems(todolist: IToDo[]) {
    console.log(todolist)
    return localStorage.setItem('todolist', JSON.stringify(todolist));
  }

  public editItem(id: number, attr: any) {

    let todoitem =
    {
      id: id,
      text: attr.text,
      isCheck: attr.isCheck
    }
    this.changeItem(todoitem);
  }

  public removeItem(id: number) {
    let item = this.getItem(id);
    let items = this.getItems();
    items.slice(items.indexOf(item), 1);

  }

}
