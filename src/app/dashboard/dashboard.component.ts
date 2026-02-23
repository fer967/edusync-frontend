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
        // 🔥 Calculamos progreso para cada curso
        this.courses = data.map(course => {
          return {
            ...course,
            progress: this.calculateProgress(course)
          };
        });
        this.calculateStats();
      });
  }

  calculateProgress(course: any): number {
    if (!course.lessons || course.lessons.length === 0) {
      return 0;
    }
    const completedLessons = course.lessons.filter(
      (lesson: any) => lesson.isCompleted === true
    ).length;
    return Math.round(
      (completedLessons / course.lessons.length) * 100
    );
  }

  calculateStats() {
    this.totalCourses = this.courses.length;
    this.completedCourses = this.courses.filter(
      c => c.progress === 100
    ).length;
    this.inProgressCourses = this.courses.filter(
      c => c.progress > 0 && c.progress < 100
    ).length;
  }

  downloadCertificate(courseId: string) {
  this.courseService.downloadCertificate(courseId)
    .subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'certificado.pdf';
      a.click();
      window.URL.revokeObjectURL(url);
    });
}
}



