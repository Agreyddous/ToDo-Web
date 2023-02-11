import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
	userName = "Agreyddous";

	constructor(
		private afAuth: AngularFireAuth
	) { }

	logout() {
		this.afAuth.signOut();
	}
}