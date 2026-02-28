import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CourseService {
  
  private apiUrl = 'https://edusync-backend-x316.onrender.com/api/courses';
  // private apiUrl = 'https://localhost:7002/api/courses';

  constructor(private http: HttpClient) { }

  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  createCourse(course: any) {
    return this.http.post(this.apiUrl, course);
  }

  createLesson(lesson: any) {
    return this.http.post(`${this.apiUrl}/lessons`, lesson);
  }

  updateCourse(id: string, course: any) {
    return this.http.put(`${this.apiUrl}/${id}`, course);
  }

  deleteCourse(id: string) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  updateLesson(id: string, lesson: any) {
    return this.http.put(`${this.apiUrl}/lessons/${id}`, lesson);
  }

  deleteLesson(id: string) {
    return this.http.delete(`${this.apiUrl}/lessons/${id}`);
  }

  uploadLessonFile(lessonId: string, file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(
      `${this.apiUrl}/${lessonId}/upload`,
      formData,
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }

  downloadCertificate(courseId: string) {
    return this.http.get(
      `${this.apiUrl}/${courseId}/certificate`,
      { responseType: 'blob' }
    );
  }

  deleteLessonFile(lessonId: string) {
    return this.http.delete(
      `${this.apiUrl}/${lessonId}/file`
    );
  }
}


