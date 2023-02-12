import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CardComponent } from './components/card/card.component';
import { ButtonComponent } from './components/button/button.component';
import { LoginComponent } from './pages/login/login.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { TodoListComponent } from './components/todo-list/todo-list.component';
import { AllComponent } from './pages/all/all.component';
import { TodayComponent } from './pages/today/today.component';
import { TomorrowComponent } from './pages/tomorrow/tomorrow.component';
import { NewComponent } from './pages/new/new.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';

import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { HiddenComponent } from './pages/hidden/hidden.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		CardComponent,
		ButtonComponent,
		LoginComponent,
		UserCardComponent,
		TabsComponent,
		TodoListComponent,
		AllComponent,
		TodayComponent,
		TomorrowComponent,
		NewComponent,
		HiddenComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		ReactiveFormsModule,
		provideFirebaseApp(() => initializeApp(environment.firebase)),
		provideAuth(() => getAuth())
	],
	providers: [
		{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }