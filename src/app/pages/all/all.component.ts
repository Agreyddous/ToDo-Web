import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from 'src/app/services/backend.service';

@Component({
	selector: 'app-all',
	templateUrl: './all.component.html',
	styleUrls: ['./all.component.css']
})
export class AllComponent {
	public toDos: any[] | null = null;

	constructor(
		private backend: BackendService,
		private afAuth: AngularFireAuth
	) { }

	ngOnInit(): void {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.getAllToDoItems(authToken)
				.subscribe((data: any) => this.toDos = data));
	}
}