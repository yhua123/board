import { ChangeDetectorRef, Component, OnDestroy, OnInit } from "@angular/core";
import { UserService } from "../user-service/user-service";
import { User } from "../user";
import { editModel } from "../user-new-edit/user-new-edit.component"
import { Message } from "app/shared/message-service/message";
import { MessageService } from "app/shared/message-service/message.service";
import { Subscription } from "rxjs/Subscription";
import { BUTTON_STYLE } from "app/shared/shared.const"
import { AppInitService } from "../../app.init.service";
import { ActivatedRoute } from "@angular/router";
import { ClrDatagridSortOrder, ClrDatagridStateInterface } from "@clr/angular";

@Component({
  selector: "user-list",
  templateUrl: "./user-list.component.html",
  styleUrls: ["./user-list.component.css"]
})

export class UserList implements OnInit, OnDestroy {
  _deleteSubscription: Subscription;
  userListData: Array<User> = Array<User>();
  userListErrMsg: string = "";
  curUser: User;
  curEditModel: editModel = editModel.emNew;
  showNewUser: boolean = false;
  setUserSystemAdminWIP: boolean = false;
  isInLoading: boolean = false;
  totalRecordCount: number;
  pageIndex: number = 1;
  pageSize: number = 15;
  authMode: string = '';
  currentUserID: number;
  descSort = ClrDatagridSortOrder.DESC;
  oldStateInfo: ClrDatagridStateInterface;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private appInitService: AppInitService,
    private messageService: MessageService,
    private changeDetectorRef: ChangeDetectorRef) {
      this.authMode = this.appInitService.systemInfo['auth_mode'];
  }

  ngOnInit() {
    this._deleteSubscription = this.messageService.messageConfirmed$.subscribe(next => {
      this.userService.deleteUser(next.data)
        .then(() => {
          this.refreshData(this.oldStateInfo);
          let m: Message = new Message();
          m.message = "USER_CENTER.DELETE_USER_SUCCESS";
          this.messageService.inlineAlertMessage(m);
        })
        .catch(err => this.messageService.dispatchError(err));
    });
    this.currentUserID = this.appInitService.currentUser["user_id"];
  }

  ngOnDestroy(): void {
    if (this._deleteSubscription) {
      this._deleteSubscription.unsubscribe();
    }
  }

  refreshData(stateInfo: ClrDatagridStateInterface): void {
    if (stateInfo) {
      this.isInLoading = true;
      this.oldStateInfo = stateInfo;
      this.userService.getUserList('', this.pageIndex, this.pageSize, stateInfo.sort.by as string, stateInfo.sort.reverse)
        .then(res => {
          this.totalRecordCount = res["pagination"]["total_count"];
          this.userListData = res["user_list"];
          this.isInLoading = false;
        })
        .catch(err => {
          this.messageService.dispatchError(err, '');
          this.isInLoading = false;
        });
      this.changeDetectorRef.detectChanges();
    }
  }

  addUser() {
    this.curUser = new User();
    this.curEditModel = editModel.emNew;
    this.showNewUser = true;
  }

  editUser(user: User) {
    if (user.user_deleted != 1 && user.user_id != 1 && user.user_id != this.currentUserID) {
      this.curEditModel = editModel.emEdit;
      this.userService.getUser(user.user_id)
        .then(user => {
          this.curUser = user;
          this.showNewUser = true;
        })
        .catch(err => this.messageService.dispatchError(err));
    }
  }

  deleteUser(user: User) {
    if (user.user_deleted != 1 && user.user_id != 1 && user.user_id != this.currentUserID) {
      let m: Message = new Message();
      m.title = "USER_CENTER.DELETE_USER";
      m.buttons = BUTTON_STYLE.DELETION;
      m.data = user;
      m.params = [user.user_name];
      m.message = "USER_CENTER.CONFIRM_DELETE_USER";
      this.messageService.announceMessage(m);
    }
  }

  setUserSystemAdmin(user: User, $event:MouseEvent) {
    this.setUserSystemAdminWIP = true;
    let oldUserSystemAdmin = user.user_system_admin;
    this.userService.setUserSystemAdmin(user.user_id, oldUserSystemAdmin == 1 ? 0 : 1)
      .then(() => {
        this.setUserSystemAdminWIP = false;
        user.user_system_admin = oldUserSystemAdmin == 1 ? 0 : 1;
        let m: Message = new Message();
        if (user.user_system_admin === 1) {
          m.message = "USER_CENTER.SUCCESSFUL_SET_SYS_ADMIN";
          user.user_project_admin = 1;
        } else {
          m.message = "USER_CENTER.SUCCESSFUL_SET_NOT_SYS_ADMIN";
        }
        this.messageService.inlineAlertMessage(m);
      })
      .catch(err => {
        this.setUserSystemAdminWIP = false;
        ($event.srcElement as HTMLInputElement).checked = oldUserSystemAdmin == 1;
        this.messageService.dispatchError(err);
      })
  }
}
