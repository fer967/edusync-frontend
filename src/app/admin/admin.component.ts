import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CourseService } from '../services/course.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatExpansionModule,
    MatDividerModule,
    MatIconModule
  ],
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

  dragActive = false;
  selectedFileName: string | null = null;

  uploadProgress = 0;

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
    const file = event.target.files[0];
    if (file) {
      this.selectedFileName = file.name;
      this.selectedLessonId = lessonId;
      this.selectedFile = file;
    }
  }

  uploadFile(lessonId: string) {
    if (!this.selectedFile) return;
    this.courseService
      .uploadLessonFile(lessonId, this.selectedFile)
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round(
            (100 * event.loaded) / event.total
          );
        }
        if (event.type === HttpEventType.Response) {
          this.uploadProgress = 100;
          this.selectedFileName = null;
          this.selectedFile = null;
          this.loadCourses();
        }
      });
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragActive = true;
  }

  onDragLeave() {
    this.dragActive = false;
  }

  onDrop(event: DragEvent, lessonId: string) {
    event.preventDefault();
    this.dragActive = false;
    if (event.dataTransfer?.files.length) {
      const file = event.dataTransfer.files[0];
      this.selectedFile = file;
      this.selectedFileName = file.name;
    }
  }

  deleteFile(lessonId: string) {
    if (!confirm('¿Eliminar archivo?')) return;

    this.courseService.deleteLessonFile(lessonId)
      .subscribe(() => {
        this.loadCourses();
      });
  }

}


