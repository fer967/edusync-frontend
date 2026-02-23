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

  selectedFile: File | null = null;
  selectedLessonId: string | null = null;

  constructor(private courseService: CourseService) { }

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

  deleteLesson(lessonId: string) {
    if (!confirm('¿Eliminar lección?')) return;

    this.courseService.deleteLesson(lessonId)
      .subscribe(() => {
        this.loadCourses();
      });
  }

  editCourse(course: any) {
    this.title = course.title;
    this.description = course.description;
    this.selectedCourseId = course.id;
  }

  updateCourse() {
    const updated = {
      title: this.title,
      description: this.description
    };

    this.courseService.updateCourse(this.selectedCourseId!, updated)
      .subscribe(() => {
        this.loadCourses();
        this.title = '';
        this.description = '';
      });
  }

  deleteCourse(id: string) {
    if (!confirm('¿Eliminar curso?')) return;

    this.courseService.deleteCourse(id)
      .subscribe(() => this.loadCourses());
  }

  onFileSelected(event: any, lessonId: string) {
    this.selectedFile = event.target.files[0];
    this.selectedLessonId = lessonId;
  }

  uploadFile() {
    if (!this.selectedFile || !this.selectedLessonId) return;

    this.courseService
      .uploadLessonFile(this.selectedLessonId, this.selectedFile)
      .subscribe(() => {
        this.selectedFile = null;
        this.selectedLessonId = null;
        this.loadCourses();
      });
  }

}


