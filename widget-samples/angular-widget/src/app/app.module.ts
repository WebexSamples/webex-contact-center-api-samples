import { Injector, NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MyCustomComponent } from './my-custom-component/my-custom-component.component';
import { createCustomElement } from '@angular/elements';

//Material
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDividerModule } from '@angular/material/divider';

@NgModule({
  declarations: [AppComponent, MyCustomComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDividerModule,
  ],
  providers: [],
  entryComponents: [MyCustomComponent],
  // allows custom elements to be used inside angular projects
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const injector = this.injector;
    // Convert 'MyCustomComponent' to a custom element
    const customElement = createCustomElement(MyCustomComponent, {
      injector,
    });
    // Register the custom element with the browser
    customElements.define('sa-angular-widget', customElement);
  }
}
