import {
  Component,
  Host,
  Input,
  OnDestroy,
  ViewEncapsulation
} from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';

import { DependencyCheckService } from '../../service/dependency-check.service';

import { Selection } from '../../model/selection.model';
import { TargetEnvironment } from '../../model/target-environment.model';
import { TargetEnvironmentService } from '../../service/target-environment.service';
import { LauncherComponent } from '../../launcher.component';
import { LauncherStep } from '../../launcher-step';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-dependencychecker-createapp-step',
  templateUrl: './dependency-editor-step.component.html',
  styleUrls: ['./dependency-editor-step.component.less']
})
export class DependencyEditorCreateappStepComponent extends LauncherStep implements OnDestroy {
  @Input() id: string;

  public github: string = '';
  public boosterInfo: any;

  private subscriptions: Subscription[] = [];
  private _targetEnvironments: TargetEnvironment[];

  constructor(@Host() public launcherComponent: LauncherComponent,
              private depCheckService: DependencyCheckService,
              public _DomSanitizer: DomSanitizer) {
    super();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  getGithubInformation(missionId: string, runtimeId: string, version: string = 'redhat'): void {
    this.depCheckService.getGithubInformation(
      missionId,
      runtimeId,
      version
    ).subscribe((result) => {
      this.github = result && result.gitRepo;
    });
  }

  ngOnInit() {
    this.launcherComponent.addStep(this);
    console.log('Inside dep editor component');
    setTimeout(() => {
      this.boosterInfo = {
        mission: {
          id: this.launcherComponent.summary.mission.id,
          name: this.launcherComponent.summary.mission.name
        },
        runtime: {
          id: this.launcherComponent.summary.runtime.id,
          name: this.launcherComponent.summary.runtime.name,
          version: this.launcherComponent.summary.runtime.version,
          projectVersion: this.launcherComponent.summary.runtime.projectVersion,
          icon: this.launcherComponent.summary.runtime.icon
        }
      };
      this.getGithubInformation(
        this.launcherComponent.summary.mission.id,
        this.launcherComponent.summary.runtime.id
      );
      this.restoreSummary();
    }, 10); // Avoids ExpressionChangedAfterItHasBeenCheckedError

    // this.subscriptions.push(this.targetEnvironmentService.getTargetEnvironments().subscribe((val) => {
    //   if (val !== undefined) {
    //     this._targetEnvironments = val;
    //   }
    // }));
  }

  // Accessors

  /**
   * Returns indicator that step is completed
   *
   * @returns {boolean} True if step is completed
   */
  get stepCompleted(): boolean {
    return (this.launcherComponent.summary.dependencyCheck !== undefined);
  }

  /**
   * Returns target environments to display
   *
   * @returns {TargetEnvironment[]} The target environments to display
   */
  get targetEnvironments(): TargetEnvironment[] {
    return this._targetEnvironments;
  }

  // Steps

  navToNextStep(): void {
    this.launcherComponent.navToNextStep();
  }

  updateTargetEnvSelection(): void {
    this.initCompleted();
  }

  // Private

  private initCompleted(): void {
    this.launcherComponent.getStep(this.id).completed = this.stepCompleted;
  }

  // Restore mission & runtime summary
  private restoreSummary(): void {
    let selection: Selection = this.launcherComponent.selectionParams;
    if (selection !== undefined) {
      this.launcherComponent.summary.targetEnvironment = selection.targetEnvironment;
    }
    this.initCompleted(); // Ensure this is called for launcherComponent.targetEnvironment input
  }
}
