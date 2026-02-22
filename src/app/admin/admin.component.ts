import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin.component.html'
})

export class AdminComponent implements OnInit {

  title = '';
  description = '';
  courses: any[] = [];
  message = '';

  selectedCourseId: string | null = null;
  lessonTitle = '';
  lessonContent = '';

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getCourses()
      .subscribe(data => this.courses = data);
  }

  createCourse() {
    const course = {
      title: this.title,
      description: this.description
    };

    this.courseService.createCourse(course)
      .subscribe({
        next: () => {
          this.message = 'Curso creado';
          this.title = '';
          this.description = '';
          this.loadCourses();
        },
        error: () => {
          this.message = 'Error al crear curso';
        }
      });
  }

  // 👇 VA ACÁ (mismo nivel que createCourse)

  selectCourse(courseId: string) {
    this.selectedCourseId = courseId;
  }

  createLesson() {

    if (!this.selectedCourseId) return;

    const lesson = {
      courseId: this.selectedCourseId,
      title: this.lessonTitle,
      content: this.lessonContent
    };

    this.courseService.createLesson(lesson)
      .subscribe({
        next: () => {
          this.lessonTitle = '';
          this.lessonContent = '';
          this.loadCourses();
        },
        error: () => {
          this.message = 'Error al crear lección';
        }
      });
  }

}


