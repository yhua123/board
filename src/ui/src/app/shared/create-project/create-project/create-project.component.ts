import { Component } from '@angular/core';
import { CreateProject, Project } from "../../../project/project";
import { SharedService } from "../../shared.service";
import { MessageService } from "../../message-service/message.service";
import { HttpErrorResponse } from "@angular/common/http";
import { CsModalChildBase } from "../../cs-modal-base/cs-modal-child-base";
import { Observable } from "rxjs";

@Component({
  selector: 'create-project',
  styleUrls: [ './create-project.component.css' ],
  templateUrl: './create-project.component.html'
})
export class CreateProjectComponent extends CsModalChildBase {
  createProject: CreateProject;
  isCreateProjectWIP: boolean = false;
  projectNamePattern: string = '^[a-z0-9]+(?:[-][a-z0-9]+)*$';
  constructor(private sharedService: SharedService,
              private messageService: MessageService) {
    super();
    this.createProject = new CreateProject();
  }

  openCreateProjectModal(): Observable<string> {
    this.modalOpened = true;
    return this.closeNotification.asObservable();
  }

  confirm(): void {
    if (this.verifyInputValid()) {
      this.isCreateProjectWIP = true;
      let project = new Project();
      project.project_name = this.createProject.projectName;
      project.project_public = this.createProject.publicity ? 1 : 0;
      project.project_comment = this.createProject.comment;
      this.sharedService.createProject(project).subscribe(
        () => this.messageService.showAlert('PROJECT.SUCCESSFUL_CREATED_PROJECT'),
        (err: HttpErrorResponse) => {
          this.isCreateProjectWIP = false;
          if (err.status == 409) {
            this.messageService.showAlert('PROJECT.PROJECT_NAME_ALREADY_EXISTS', {alertType: 'alert-danger', view: this.alertView})
          } else if (err.status == 400) {
            this.messageService.showAlert('PROJECT.PROJECT_NAME_IS_ILLEGAL', {alertType: 'alert-danger', view: this.alertView})
          }
        },
        () => {
          this.closeNotification.next(project.project_name);
          this.modalOpened = false;
        }
      );
    }
  }
}
