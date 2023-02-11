import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class BackendService {
	public baseUrl = "https://localhost:5189";

	constructor(
		private httpClient: HttpClient
	) { }

	public getTodayToDoItems(authToken: string) {
		return this.requestFromBackend(authToken, 'get', 'v1/ToDoItems/Today');
	}

	public getTomorrowToDoItems(authToken: string) {
		return this.requestFromBackend(authToken, 'get', 'v1/ToDoItems/Tomorrow');
	}

	public getAllToDoItems(authToken: string) {
		return this.requestFromBackend(authToken, 'get', 'v1/ToDoItems');
	}

	public createToDoItem(
		authToken: string,
		title: string,
		description: string,
		dueDate: Date
	) {
		return this.requestFromBackend(authToken, 'post', 'v1/ToDoItems', { title, description, dueDate })
	}

	public updateToDoItem(
		authToken: string,
		id: string,
		title: string,
		description: string,
		dueDate: Date
	) {
		return this.requestFromBackend(authToken, 'put', `v1/ToDoItems/${id}`, { title, description, dueDate })
	}

	public completeToDoItem(
		authToken: string,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `v1/ToDoItems/${id}/Complete`)
	}

	public undoCompleteToDoItem(
		authToken: string,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `v1/ToDoItems/${id}/Undo`)
	}

	private requestFromBackend(
		authToken: string,
		method: string,
		uri: string,
		body: any = null
	) {
		return this.httpClient.request(method, `${this.baseUrl}/${uri}`, { body: body, headers: this.composeHeaders(authToken) })
	}

	private composeHeaders(token: string): HttpHeaders {
		let headers: HttpHeaders = new HttpHeaders();

		if (token)
			headers.set('Authorization', `Bearer: ${token}`)

		return headers;
	}
}