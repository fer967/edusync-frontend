import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { SyncService } from '../services/sync.service';

@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './course-detail.component.html'
})
export class CourseDetailComponent implements OnInit {

  lessons: any[] = [];
  courseId!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private syncService: SyncService
  ) { }

  get completedCount() {
    return this.lessons.filter(l => l.completed).length;
  }

  get progressPercentage() {
    if (this.lessons.length === 0) return 0;
    return Math.round((this.completedCount / this.lessons.length) * 100);
  }

  loadProgress() {
    this.http.get<any[]>(`https://edusync-backend-x316.onrender.com/api/studentprogress/course/${this.courseId}`)
      .subscribe(progress => {
        this.lessons.forEach(lesson => {
          const found = progress.find(p => p.lessonId === lesson.id);
          lesson.completed = found?.isCompleted || false;
          // 🔥 forzar actualización visual
          this.lessons = [...this.lessons];
        });
      });
  }

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
    this.http.get<any>(`https://edusync-backend-x316.onrender.com/api/courses/${this.courseId}`)
      .subscribe(data => {
        this.lessons = data.lessons;
        // cargar progreso UNA sola vez
        this.loadProgress();
        // intentar sincronizar pendientes
        this.retryPending();
      });
  }


  retryPending() {
    const pending = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    if (pending.length === 0) return;
    this.syncService.sync(pending).subscribe({
      next: () => {
        console.log('Pendientes sincronizados');
        localStorage.removeItem('pendingSync');
        // 🔥 volver a cargar progreso real
        this.loadProgress();
      }
    });
  }

  savePending(item: any) {
    const pending = JSON.parse(localStorage.getItem('pendingSync') || '[]');
    pending.push(item);
    localStorage.setItem('pendingSync', JSON.stringify(pending));
  }


  markLessonCompleted(lesson: any) {
    lesson.completed = true;
    const payload = {
      lessonId: lesson.id,
      isCompleted: true,
      updatedAt: new Date().toISOString()
    };

    this.syncService.sync([payload]).subscribe({
      next: () => console.log('Sync OK'),
      error: () => {
        console.log('Offline, guardando pendiente...');
        this.savePending(payload);
      }
    });
  }

}






