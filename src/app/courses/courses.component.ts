import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CourseService } from '../services/course.service';
import { SyncService } from '../services/sync.service';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './courses.component.html'
})

export class CoursesComponent implements OnInit {

  courses: any[] = [];

  constructor(
    private courseService: CourseService,
    private syncService: SyncService
  ) { }

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses()
      .subscribe(data => {
        this.courses = [];
        this.courses = data;
      });
  }

  calculateProgress(course: any): number {
    if (!course.lessons || course.lessons.length === 0) return 0;

    const completed = course.lessons.filter((l: any) => l.isCompleted).length;
    return Math.round((completed / course.lessons.length) * 100);
  }


  markCompleted(course: any) {
    course.completed = true;
    course.updatedAt = new Date().toISOString();
  }

  sync() {
  this.syncService.sync(this.courses)
    .subscribe(() => {
      this.loadCourses(); // 🔥 recalcula progreso
      alert('Sincronización completada');
    });
}

}





