import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  courses: any[] = [];
  totalCourses = 0;
  completedCourses = 0;
  inProgressCourses = 0;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses()
      .subscribe(data => {
        this.courses = data;
        this.calculateStats();
      });
  }

  calculateStats() {
    this.totalCourses = this.courses.length;

    this.completedCourses = this.courses.filter(c => c.progress === 100).length;

    this.inProgressCourses = this.courses.filter(c => c.progress > 0 && c.progress < 100).length;
  }
}