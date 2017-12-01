import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './src/app/components/input/input.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { ForgeErrorsComponent } from './src/app/components/forge-errors/forge-errors.component';
import { ForgeExceptionComponent } from './src/app/components/forge-exception/forge-exception.component';

// import { SpinnerComponent } from './src/app/components/spinner/spinner.component';
import { ProjectSelect } from './src/app/components/project-select/project-select.component';
import { Config } from './src/app/service/config.component';
import { ForgeService } from './src/app/service/forge.service';
import { History } from './src/app/service/history.component';
import { AsciidocIndex } from './src/app/components/asciidoc/asciidoc.index';
import { AsciidocService } from './src/app/components/asciidoc/asciidoc.service';

// import { SingleSelectionDropDownComponent } from './src/app/comp
// onents/single-selection-dropdown/single-selection-dropdown.component';
import { MultipleSelectionListComponent } from './src/app/components/multiple-selection-list/multiple-selection-list.component';



const classes = [
  ForgeErrorsComponent,
  ForgeExceptionComponent,
  InputComponent,
  ProjectSelect,
  MultipleSelectionListComponent
];

@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MultiselectDropdownModule],
  declarations: classes,
  exports: classes,
  providers: [
    ForgeService,
    AsciidocIndex,
    AsciidocService,
    History,
    Config
  ],
  schemas: []
})
export class NgxForgeModule {
}

