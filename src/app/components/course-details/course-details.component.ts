import { Component, Input, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-course-details',
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css'
})
export class CourseDetailsComponent implements OnInit {
  @Input() viewMode = false;

  @Input() currentCourse:Course= {
    title:'',
    description:'',
    published:false
  };

  message = '';
  constructor(private courseServide:CourseService, private route:ActivatedRoute, private router:Router){

  }

  ngOnInit():void{
    
    if(!this.viewMode){
      this.message ='';
      this.getCourse(this.route.snapshot.params['id']);
    }
  }
  getCourse(id:string):void{
    this.courseServide.get(id).subscribe({
      next:(data)=>{
        this.currentCourse = data;
        console.log(data);
      },
      error:(e) => console.error(e)
    });

    
  }

  updatePublished(status:boolean):void{
    const data = {
      title:this.currentCourse.title,
      description:this.currentCourse.description,
      published: status
    };
    this.message = "";

    this.courseServide.update(this.currentCourse.id, data).subscribe({
      next: (res) => {
        console.log(res);
        this.currentCourse.published = status;
        this.message = res.message
          ? res.message
          : 'The status was updated successfully!';
      },
      error: (e) => console.error(e)
    });
  }
updateCourse():void{
  this.message = '';
  this.courseServide.update(this.currentCourse.id, this.currentCourse).subscribe({
    next:(res) =>{
      console.log(res);
      this.message = res.message ? res.message : "This tutorial was updated successfully!";
    },
    error: (e) => console.error(e)
  });
}

deleteCourse() : void{
  this.courseServide.delete(this.currentCourse.id).subscribe({
    next:(res) =>{
      console.log(res);
      this.router.navigate(['/courses']);
    },
    error: (e) => console.error(e)
  });
}

}
