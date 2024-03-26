import { AfterContentInit, AfterViewInit, Component, OnChanges, OnInit } from '@angular/core';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrl: './course-list.component.css'
})
export class CourseListComponent implements OnInit,OnChanges,AfterContentInit,AfterViewInit {
  courses?:Course[];
  currentCourse: Course = {};
  currentIndex = -1;
  title = '';
 
  constructor(private courseService:CourseService){
    console.log("constructor")
  }

  ngOnChanges(){
    console.log("ng on change")
  }
  ngOnInit(): void {
    console.log("ng on init")
    this.retrieveCourse();
  }
  ngAfterContentInit(): void {
    console.log("content");
  }
  ngAfterViewInit(): void {
    console.log("view");
  }


  retrieveCourse():void{
    this.courseService.getAll().subscribe({
      next:(data) =>{
        this.courses = data;
        console.log(data);
        console.log("retrieve all");
      },
      error:(e) =>console.error(e),
      complete:() =>console.log("complete")
    });
  }

  refreshList():void{
    this.retrieveCourse();
    this.currentCourse = {};
    this.currentIndex = -1;
  }

  setActiveCourse(course:Course, index:number):void{
    this.currentCourse = course;
    this.currentIndex = index;
  }
  
  removeAllCourse():void{
    this.courseService.deleteAll().subscribe({
      next:(res) =>{
        console.log(res);
        this.refreshList();
      },
      error : (e) => console.error(e)
    });
  }

  searchTitle():void{
    this.currentCourse = {};
    this.currentIndex = -1;
    this.courseService.findByTitle(this.title).subscribe({
      next:(data) =>{
        this.courses =data;
        console.log(data);
      },
      error:(e) =>console.error(e)
    });
  }


}
