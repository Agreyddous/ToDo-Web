import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BackendService } from 'src/app/services/backend.service';

@Component({
	selector: 'app-tomorrow',
	templateUrl: './tomorrow.component.html',
	styleUrls: ['./tomorrow.component.css']
})
export class TomorrowComponent {
	public toDos: any[] | null = null;

	constructor(
		private backend: BackendService,
		private afAuth: AngularFireAuth
	) { }

	ngOnInit(): void {
		this.afAuth.idToken.subscribe(authToken =>
			this.backend.getTomorrowToDoItems(authToken)
				.subscribe((data: any) => this.toDos = data));
	}
}