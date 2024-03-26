import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseDetailsComponent } from './components/course-details/course-details.component';
import { AddCourseComponent } from './components/add-course/add-course.component';

const routes: Routes = [
  {path:'', redirectTo:'courses', pathMatch:'full'},
  {path:'courses',component:CourseListComponent},
  {path:'courses/:id',component:CourseDetailsComponent},
  {path:'add',component:AddCourseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
