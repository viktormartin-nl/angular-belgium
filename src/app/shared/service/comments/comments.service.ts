import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { url } from 'src/environments/environment';
import { Comments } from '../../interface/comments.interface';
import { LoggedInUser } from '../../interface/logged-in-user.interface';
import { User } from '../../interface/user.interface';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  commentsUrl: string = `${url}/644/comments`;

  constructor(private http: HttpClient) {}

  get(loggedInUser: LoggedInUser): Observable<Comments[]> {
    return this.http
      .get<Comments[]>(this.commentsUrl)
      .pipe(map(comments => comments.filter(comment => comment.userId == loggedInUser.user.id)));
  }

  post(newComment: Comments): Observable<Comments> {
    return this.http.post<Comments>(this.commentsUrl, newComment);
  }

  put(editedComment: Comments): Observable<Comments> {
    return this.http.put<Comments>(`${this.commentsUrl}/${editedComment.id}`, editedComment);
  }

  delete(deletedComment: Comments): Observable<Comments> {
    return this.http.delete<Comments>(`${this.commentsUrl}/${deletedComment.id}`);
  }
}
