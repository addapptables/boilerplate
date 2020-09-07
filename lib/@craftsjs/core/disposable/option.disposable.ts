import { Injectable } from '@nestjs/common';
import { Disposable } from 'using-statement';
import { OptionService, OptionModel } from './option.service';

@Injectable()
export class OptionDisposableService implements Disposable {

    constructor(private readonly optionService: OptionService) { }

    newOptions(options: OptionModel) {
        this.optionService.setOptions = options;
    }

    dispose(): void {
        this.optionService.setOptions = {
            defaultFilter: {
                applyTenant: true,
                applyIsDeleted: true
            }
        }
    }

}