import {AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ModalComponent} from "../shared/modal/modal.component";
import {IToDo} from "../shared/interface";
import {TodoListService} from "./todo-list.service";
import {ZXingScannerComponent} from "@zxing/ngx-scanner";
import {TodoItemComponent} from "./todo-item/todo-item.component";

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})

export class TodoListComponent implements OnInit, AfterViewInit{
  @ViewChild(ZXingScannerComponent) scanner: ZXingScannerComponent;
  @ViewChildren(TodoItemComponent) items: QueryList<TodoItemComponent>;

  public arr: IToDo[] = [
    {
      id: 1,
      text: 'asdasdasdasd',
      isCheck: true
    },
    {
      id: 1,
      text: 'asdasdasdasd',
      isCheck: true
    },
    {
      id: 1,
      text: 'asdasdasdasd',
      isCheck: true
    }
  ];

  constructor(public dialog: MatDialog, private toDoListService: TodoListService) {
  }

  ngOnInit(): void {
    this.getAndSetStorageItems();
  }

  ngAfterViewInit() {
    console.dir(this.items.toArray());
  }

  public getAndSetStorageItems(): void {
    this.arr = this.toDoListService.getItems();
  }

  public openDialog(method: 'edit' | 'add', dataToEdit?: any): void {
    console.log('1');
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        method: method,
        initialValue:
          {
            text: ''
          },
        initialTypes: {text: 'text'},
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAndSetStorageItems();
    });
  }

  public scanSuccessHandler(event: any): void {

    let obj = JSON.parse(event);
    this.scanner.scanStop();
    console.log(obj);
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        method: 'edit',
        initialValue:
          {
            text: obj.text

          },
        initialTypes: {text: 'text'},
        itemId: obj.id,
        isCheck: obj.isCheck
      }
    });

    dialogRef.afterClosed().subscribe(result => {

      console.log('closed modal result: ' + result);
      this.scanner.scanStart();
      this.getAndSetStorageItems();

    });
  }


  formatObj(obj: any): string {
    return JSON.stringify(obj);
  }
}
