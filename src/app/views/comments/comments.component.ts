import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Comments } from 'src/app/shared/interface/comments.interface';
import { LoggedInUser } from 'src/app/shared/interface/logged-in-user.interface';
import { CommentsService } from 'src/app/shared/service/comments/comments.service';
import { CreationPopup } from './components/creation-popup/creation-popup.component';
import { DeletedPopup } from './components/deleted-popup/deleted-popup.component';
import { EditionPopup } from './components/edition-popup/edition-popup.component';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit {
  loggedInUser: LoggedInUser;
  displayedColumns: string[] = ['id', 'created_at', 'title', 'description', 'actions'];
  data!: MatTableDataSource<Comments>;

  @ViewChild(MatTable)
  table!: MatTable<Comments>;
  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  constructor(private commentsService: CommentsService, private dialog: MatDialog) {
    this.loggedInUser = JSON.parse(localStorage['loggedInUser']);
  }

  ngOnInit(): void {
    this.commentsService.get(this.loggedInUser).subscribe({
      next: (_comments: Comments[]) => {
        this.data = new MatTableDataSource(_comments);
        this.data.paginator = this.paginator;
      },
    });
  }

  openCreationPopUp() {
    const dialogRef = this.dialog.open(CreationPopup);

    dialogRef.afterClosed().subscribe(newComment => {
      if (newComment) {
        newComment = { ...newComment, createdAt: new Date().toUTCString(), userId: this.loggedInUser.user.id };
        this.commentsService.post(newComment).subscribe({
          next: (_newComment: Comments) => {
            this.data.data.push(_newComment);
            this.data.filter = '';
          },
        });
      }
    });
  }

  openEditionPopUp(editedComment: Comments) {
    const dialogRef = this.dialog.open(EditionPopup, { data: { editedComment: editedComment } });

    dialogRef.afterClosed().subscribe((formValue: Comments) => {
      if (formValue) {
        editedComment.title = formValue.title;
        editedComment.description = formValue.description;
        this.commentsService.put(editedComment).subscribe({
          next: (_editedComment: Comments) => {
            const tmp_data = this.data.data.filter((comment: Comments) => {
              if (comment.id == _editedComment.id) {
                comment.title = _editedComment.title;
                comment.description = _editedComment.description;
              }
              return true;
            });
            this.data.data = [];
            this.data.data = tmp_data;
          },
        });
      }
    });
  }

  openDeletedPopUp(deletedComment: Comments) {
    const dialogRef = this.dialog.open(DeletedPopup, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.commentsService.delete(deletedComment).subscribe({
          next: result => {
            const tmp_data = this.data.data.filter(comment => comment.id !== deletedComment.id);
            this.data.data = [];
            this.data.data = tmp_data;
          },
        });
      }
    });
  }
}
