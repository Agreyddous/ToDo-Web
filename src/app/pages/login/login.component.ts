import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent {
	constructor(
		private afAuth: AngularFireAuth
	) { }

	loginGoogle() {
		this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider);
	}
}