import { Injectable } from '@nestjs/common';

@Injectable()
export class OptionService {

    private options: OptionModel;

    constructor() {
        this.options = {
            defaultFilter: {
                applyTenant: true,
                applyIsDeleted: true
            }
        };
    }

    get getOptions() {
        return this.options;
    }

    set setOptions(options: OptionModel) {
        const newOptions = Object.assign({}, this.options, options);
        this.options = newOptions;
    }

}

export class OptionModel {
    defaultFilter?: {
        applyTenant?: boolean;
        applyIsDeleted?: boolean;
    }
}