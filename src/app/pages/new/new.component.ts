import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from 'src/app/services/backend.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
	selector: 'app-new',
	templateUrl: './new.component.html',
	styleUrls: ['./new.component.css']
})
export class NewComponent {
	public form: FormGroup;

	constructor(
		private formBuilder: FormBuilder,
		private backend: BackendService,
		private router: Router,
		private afAuth: AngularFireAuth
	) {
		this.form = this.formBuilder.group({
			title: ['', Validators.compose([
				Validators.minLength(3),
				Validators.maxLength(60),
				Validators.required
			])],
			description: ['', Validators.compose([
				Validators.minLength(3),
				Validators.required
			])],
			dueDate: [new Date().toJSON().substring(0, 10), Validators.required]
		});
	}

	submit() {
		let formResult = this.form.value;

		this.afAuth.idToken.subscribe(authToken =>
			this.backend.createToDoItem(authToken, formResult.title, formResult.description, formResult.dueDate)
				.subscribe(() => this.router.navigateByUrl("/")));
	}
}