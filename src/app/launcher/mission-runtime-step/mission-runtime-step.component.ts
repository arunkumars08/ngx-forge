import {
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DomSanitizer } from '@angular/platform-browser';

import { Mission } from '../model/mission.model';
import { Runtime } from '../model/runtime.model';
import { Selection } from '../model/selection.model';
import { MissionRuntimeService } from '../service/mission-runtime.service';
import { WizardComponent } from '../wizard.component';
import { WizardStep } from '../wizard-step';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'f8launcher-missionruntime-step',
  templateUrl: './mission-runtime-step.component.html',
  styleUrls: ['./mission-runtime-step.component.less']
})
export class MissionRuntimeStepComponent extends WizardStep implements OnInit, OnDestroy {
  private _missions: Mission[];
  private _runtimes: Runtime[];

  public selectedRuntime: Runtime;
  public selectedMission: Mission;

  private missionId: string;
  private runtimeId: string;
  private subscriptions: Subscription[] = [];

  constructor(@Host() public wizardComponent: WizardComponent,
              private missionRuntimeService: MissionRuntimeService,
              public _DomSanitizer: DomSanitizer
            ) {
    super();
  }

  ngOnInit() {
    this.wizardComponent.addStep(this);
    let missionSubscription = this.missionRuntimeService.getMissions().subscribe((result) => {
      this._missions = result;
    });
    let runtimeSubscription = this.missionRuntimeService.getRuntimes().subscribe((result) => {
      result.forEach(item => {
        //TODO: needs to be removed , curently picking unique version out of missions as runtime version is not clear
        item.versions = [];
        item.missions.forEach(mission => {
          mission.versions.forEach(version => {
            if(item.versions.indexOf(version.name)== -1){
              item.versions.push(version.name);
            }
          });
        });
      });
      this._runtimes = result;
    });
    this.subscriptions.push(missionSubscription);
    this.subscriptions.push(runtimeSubscription);

    this.restoreSummary();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  // Accessors

  /**
   * Returns a list of missions to display
   *
   * @returns {Mission[]} The missions to display
   */
  get missions(): Mission[] {
    return this._missions;
  }

  /**
   * Returns a list of runtimes to display
   *
   * @returns {Runtime[]} The runtimes to display
   */
  get runtimes(): Runtime[] {
    return this._runtimes;
  }

  /**
   * Returns indicator for at least one selection has been made
   *
   * @returns {boolean} True at least one selection has been made
   */
  get selectionAvailable(): boolean {
    return (this.wizardComponent.summary.mission !== undefined
      || this.wizardComponent.summary.runtime !== undefined);
  }

  /**
   * Returns indicator that step is completed
   *
   * @returns {boolean} True if step is completed
   */
  get stepCompleted(): boolean {
    return (this.wizardComponent.summary.mission !== undefined
      && this.wizardComponent.summary.runtime !== undefined
      && this.wizardComponent.summary.runtime !== undefined
      && this.wizardComponent.summary.runtime.projectVersion !== undefined);
  }

  // Steps

  /**
   * Navigate to next step
   */
  navToNextStep(): void {
    this.wizardComponent.getStep(this.id).completed = this.stepCompleted;
    this.wizardComponent.navToNextStep();
  }

  resetSelections(): void {
    this.missionId = undefined;
    this.runtimeId = undefined;
    this.wizardComponent.summary.mission = undefined;
    this.wizardComponent.summary.runtime = undefined;
    this.initCompleted();

    // Resetting the disabled things
    this.selectedMission =  null;
    this.selectedRuntime = null;
  }

  // Private

  private initCompleted(): void {
    this.wizardComponent.getStep(this.id).completed = this.stepCompleted;
  }

  // Restore mission & runtime summary
  private restoreSummary(): void {
    let selection: Selection = this.wizardComponent.selectionParams;
    if (selection === undefined) {
      return;
    }
    this.missionId = selection.missionId;
    this.runtimeId = selection.runtimeId;

    this.missions.forEach((val) => {
      if (this.missionId === val.id) {
        this.updateMissionSelection(val);
      }
    });
    this.runtimes.forEach((val) => {
      if (this.runtimeId === val.id) {
        this.updateRuntimeSelection(val);
        this.updateVersionSelection(val, selection.runtimeVersion);
      }
    });
    this.initCompleted();
  }

  private updateMissionSelection(val: Mission): void {
    this.selectedMission = val;
    this.wizardComponent.summary.mission = val;
    this.initCompleted();
  }

  private updateRuntimeSelection(val: Runtime): void {
    this.selectedRuntime = val;
    this.wizardComponent.summary.runtime = val;
    this.wizardComponent.summary.runtime.version = (val.version !== undefined) ? val.version : val.versions[0];
    this.initCompleted();
  }

  private updateVersionSelection(val: Runtime, version: string): void {
    val.projectVersion = version; // Don't update summary, just store selection
  }
}
