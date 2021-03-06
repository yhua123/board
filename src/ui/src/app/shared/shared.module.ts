import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
import { CsSearchInputComponent } from './cs-components-library/cs-search-input/cs-search-input.component';
import { EnvironmentValueComponent } from './environment-value/environment-value.component';
import { SizePipe } from './pipes/size-pipe';
import { CsGuideComponent } from './cs-components-library/cs-guide/cs-guide.component';
import { CsProgressComponent } from './cs-components-library/cs-progress/cs-progress.component';
import { SafePipe } from './pipes/safe-pipe';
import { CreateProjectComponent } from './create-project/create-project/create-project.component';
import { MemberComponent } from './create-project/member/member.component';
import { CsHighlightComponent } from './cs-components-library/cs-highlight/cs-highlight.component';
import {
  AppMenuItemUrlDirective,
  CsVerticalNavComponent
} from './cs-components-library/cs-vertical-nav/cs-vertical-nav.component';
import { CsModalViewContainerSelectorDirective } from './cs-modal-base/cs-modal-child-base';
import { CreatePvcComponent } from './create-pvc/create-pvc.component';
import { CoreModule } from '../core/core.module';
import { LibCheckPatternExDirective } from './lib-directives/input-check-pattern.directive';
import { LibCheckExistingExDirective } from './lib-directives/input-check-existing.directive';
import { CustomHttpProvider } from './ui-model/model-http-client';
import 'inspurprism';

@NgModule({
  imports: [CoreModule],
  exports: [
    HeaderComponent,
    LibCheckPatternExDirective,
    LibCheckExistingExDirective,
    EnvironmentValueComponent,
    CsSearchInputComponent,
    CsModalViewContainerSelectorDirective,
    CsGuideComponent,
    CsProgressComponent,
    CsHighlightComponent,
    CsVerticalNavComponent,
    AppMenuItemUrlDirective,
    SizePipe,
    SafePipe
  ],
  declarations: [
    LibCheckPatternExDirective,
    LibCheckExistingExDirective,
    CsSearchInputComponent,
    CsProgressComponent,
    CsModalViewContainerSelectorDirective,
    SizePipe,
    SafePipe,
    CsGuideComponent,
    CreateProjectComponent,
    CsHighlightComponent,
    CsVerticalNavComponent,
    AppMenuItemUrlDirective,
    AccountSettingComponent,
    EnvironmentValueComponent,
    MemberComponent,
    CreatePvcComponent,
    ChangePasswordComponent,
    HeaderComponent,
  ],
  entryComponents: [
    CreateProjectComponent,
    MemberComponent,
    CreatePvcComponent
  ],
  providers: [
    CustomHttpProvider
  ]
})
export class SharedModule {
}
