import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {

  private apiUrl = 'https://localhost:7002/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCourse(course: any) {
    return this.http.post('https://localhost:7002/api/courses', course);
  }

  createLesson(lesson: any) {
    return this.http.post('https://localhost:7002/api/lessons', lesson);
  }

  updateCourse(id: string, course: any) {
    return this.http.put(`https://localhost:7002/api/courses/${id}`, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`https://localhost:7002/api/courses/${id}`);
  }

  updateLesson(id: string, lesson: any) {
    return this.http.put(`https://localhost:7002/api/lessons/${id}`, lesson);
  }

  deleteLesson(id: string) {
    return this.http.delete(`https://localhost:7002/api/lessons/${id}`);
  }

  uploadLessonFile(lessonId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `https://localhost:7002/api/lessons/${lessonId}/upload`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  downloadCertificate(courseId: string) {
    return this.http.get(
      `https://localhost:7002/api/courses/${courseId}/certificate`,
      { responseType: 'blob' }
    );
  }

  deleteLessonFile(lessonId: string) {
    return this.http.delete(
      `https://localhost:7002/api/lessons/${lessonId}/file`
    );
  }
}


