import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	private baseUrl: string;
	private version: string;

	constructor(
		private httpClient: HttpClient
	) {
		this.baseUrl = environment.backend.baseUrl;
		this.version = environment.backend.version;
	}

	public getTodayToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Today');
	}

	public getTomorrowToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Tomorrow');
	}

	public getAllToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems');
	}

	public createToDoItem(
		authToken: string | null,
		title: string,
		description: string,
		dueDate: Date
	) {
		return this.requestFromBackend(authToken, 'post', 'ToDoItems', { title, description, dueDate })
	}

	public updateToDoItem(
		authToken: string | null,
		id: string,
		title: string,
		description: string,
		dueDate: Date
	) {
		return this.requestFromBackend(authToken, 'put', `ToDoItems/${id}`, { title, description, dueDate })
	}

	public completeToDoItem(
		authToken: string | null,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `ToDoItems/${id}/Complete`)
	}

	public undoCompleteToDoItem(
		authToken: string | null,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `ToDoItems/${id}/Undo`)
	}

	private requestFromBackend(
		authToken: string | null,
		method: string,
		uri: string,
		body: any = null
	) {
		return this.httpClient.request(method, `${this.baseUrl}/${this.version}/${uri}`, { body: body, headers: this.composeHeaders(authToken) })
	}

	private composeHeaders(token: string | null): HttpHeaders {
		let headers: HttpHeaders = new HttpHeaders();

		if (token)
			headers = headers.set('Authorization', `Bearer ${token}`)

		return headers;
	}
}