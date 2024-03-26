import { Component } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrl: './add-course.component.css'
})
export class AddCourseComponent {
  course:Course ={
    title:'',
    description:'',
    published:false
  };

  submitted = false;

  constructor(private courseService:CourseService){}

  saveCourse():void{
    const data = {
      title: this.course.title,
      description:this.course.description
    };

    this.courseService.create(data).subscribe({
      next: (res) =>{
        console.log(res);
        this.submitted = true;
      },
      error:(e) =>console.error(e)
    });

  }

  newCourse():void{
    this.submitted = false;
    this.course = {
      title:'',
      description:'',
      published:false
    };
  }

}
