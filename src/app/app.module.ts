import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogListComponent } from './blogs-list/blogs-list.component';
import { BlogCreateEditComponent } from './blog-create-edit/blog-create-edit.component';
import { BlogsSearchComponent } from './blogs-search/blogs-search.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { PageComponent } from './page/page.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogListComponent,
    BlogCreateEditComponent,
    BlogsSearchComponent,
    FooterComponent,
    HeaderComponent,
    MenuComponent,
    PageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
