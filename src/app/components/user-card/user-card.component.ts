import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-user-card',
	templateUrl: './user-card.component.html',
	styleUrls: ['./user-card.component.css']
})
export class UserCardComponent {
	public user: any = { name: "", picture: "" };

	constructor(
		private afAuth: AngularFireAuth
	) {
		this.afAuth.user.subscribe((userData) => {
			if (userData) {
				this.user.name = userData?.displayName;
				this.user.picture = userData?.photoURL;
			}
		});
	}

	logout() {
		this.afAuth.signOut();
	}
}