import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Today', null, { 'isComplete': false });
	}

	public getTomorrowToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Tomorrow', null, { 'isComplete': false });
	}

	public getAllToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems');
	}

	public getAllAvailableToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Available');
	}

	public getAllHiddenToDoItems(authToken: string | null) {
		return this.requestFromBackend(authToken, 'get', 'ToDoItems/Hidden');
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

	public hideToDoItem(
		authToken: string | null,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `ToDoItems/${id}/Hide`)
	}

	public showToDoItem(
		authToken: string | null,
		id: string
	) {
		return this.requestFromBackend(authToken, 'post', `ToDoItems/${id}/Show`)
	}

	private requestFromBackend(
		authToken: string | null,
		method: string,
		uri: string,
		body: any = null,
		params: HttpParams | { [param: string]: string | number | boolean | readonly (string | number | boolean)[]; } | undefined = undefined
	) {
		return this.httpClient.request(method, `${this.baseUrl}/${this.version}/${uri}`, { body: body, headers: this.composeHeaders(authToken), params: params })
	}

	private composeHeaders(token: string | null): HttpHeaders {
		let headers: HttpHeaders = new HttpHeaders();

		if (token)
			headers = headers.set('Authorization', `Bearer ${token}`)

		return headers;
	}
}