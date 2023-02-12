import { Component, Input } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from 'src/app/services/backend.service';

@Component({
	selector: 'app-todo-list',
	templateUrl: './todo-list.component.html',
	styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent {
	@Input() toDos: any[] | null = null;

	constructor(
		private backend: BackendService,
		private afAuth: AngularFireAuth
	) { }

	complete(toDo: any) {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.completeToDoItem(authToken, toDo.id).subscribe(() => toDo.isComplete = true))
	}

	undo(toDo: any) {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.undoCompleteToDoItem(authToken, toDo.id).subscribe(() => toDo.isComplete = false))
	}
}