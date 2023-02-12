import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from 'src/app/services/backend.service';

@Component({
	selector: 'app-hidden',
	templateUrl: './hidden.component.html',
	styleUrls: ['./hidden.component.css']
})
export class HiddenComponent {
	public toDos: any[] | null = null;

	constructor(
		private backend: BackendService,
		private afAuth: AngularFireAuth
	) { }

	ngOnInit(): void {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.getAllHiddenToDoItems(authToken)
				.subscribe((data: any) => this.toDos = data));
	}
}