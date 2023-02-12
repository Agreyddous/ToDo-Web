import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from 'src/app/services/backend.service';

@Component({
	selector: 'app-today',
	templateUrl: './today.component.html',
	styleUrls: ['./today.component.css']
})
export class TodayComponent {
	public toDos: any[] | null = null;

	constructor(
		private backend: BackendService,
		private afAuth: AngularFireAuth
	) { }

	ngOnInit(): void {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.getTodayToDoItems(authToken)
				.subscribe((data: any) => this.toDos = data));
	}
}