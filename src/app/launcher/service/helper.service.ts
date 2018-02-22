import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Config } from '../../../app/service/config.component';

@Injectable()
export class HelperService  {

    private keys: any = {
        BACKEND: 'backend_url',
        STAGE_BACKEND: 'backend_stage',
        ORIGIN: 'origin'
    };

    constructor(
        private config: Config
    ) {}

    getBackendUrl(stage: boolean = false): string {
        if (this.config) {
            return stage ? this.config.get(this.keys['STAGE_BACKEND']) : this.config.get(this.keys.BACKEND);
        }
        return null;
    }

    getOrigin(): string {
        if (this.config) {
            return this.config.get(this.keys.ORIGIN);
        }
        return null;
    }

}
