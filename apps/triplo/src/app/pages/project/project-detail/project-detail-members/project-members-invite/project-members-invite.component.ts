import {Component, OnInit} from "@angular/core";
import {AuthHttpService} from "../../../../../services/authentication/auth-http.service";
import {UserInterface} from "@triplo/models";
import {debounceTime, distinctUntilChanged, Observable} from "rxjs";
import {UserHttpService} from "../../../../../services/user/user-http.service";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'triplo-project-detail-members',
  templateUrl: './project-members-invite.component.html',
})
export class ProjectMembersInviteComponent implements OnInit {
  userId: string | null;
  owner: UserInterface;
  users$: Observable<UserInterface[]>;
  usersToInvite: Set<UserInterface>
  inviteForm: FormGroup;

  constructor(
    private authService: AuthHttpService,
    private userService: UserHttpService,
  ) {
  }

  ngOnInit(): void {
    this.userId = this.authService.getUser()
    this.users$ = this.userService.findAllUsers()
    this.usersToInvite = new Set<UserInterface>();
    this.inviteForm = new FormGroup({
      username: new FormControl("")
    })
    this.inviteForm.valueChanges.pipe(debounceTime(250), distinctUntilChanged()).subscribe(search => this.searchUsers(search.username))
  }

  searchUsers(search: string) {
    this.users$ = this.userService.findAllUsers(search)
  }

  onSelected(user: UserInterface): void {
    this.usersToInvite.add(user)
    this.inviteForm.patchValue({username: ""})
  }

  inviteMembers() {
    this.usersToInvite.forEach(user => {
      this.sendInviteToMember(user)
      this.usersToInvite.delete(user)
    })
  }

  sendInviteToMember(user: UserInterface) {

  }

}
