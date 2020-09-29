import { Module, Global } from '@nestjs/common';
import { OptionService } from './option.service';
import { OptionDisposableService } from './option.disposable';

@Global()
@Module({
    providers: [
        OptionService,
        OptionDisposableService
    ],
    exports: [
        OptionService,
        OptionDisposableService
    ]
})
export class DisposableOptionModule {}