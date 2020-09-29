import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@craftsjs/typeorm';
import { UserRepository } from '@craftsjs/user/infrastructure/database/repositories/user.repository';
import seedConfiguration from '../static';

@Injectable()
export class UserSeedService {

    constructor(
        @InjectRepository(UserRepository)
        private readonly userRepository: UserRepository
    ) { }

    async seed() {
        await this.createUserHost();
        await this.createUserTenant();
    }

    private async createUserHost() {
        const user = await this.userRepository.findOne({
            where: { id: seedConfiguration.user.hostId }
        });
        if(!user){
            await this.userRepository.insert({
                id: seedConfiguration.user.hostId,
                userName: seedConfiguration.user.userName,
                emailAddress: seedConfiguration.user.email,
                name: seedConfiguration.user.name,
                surname: seedConfiguration.user.name,
                password: '46f94c8de14fb36680850768ff1b7f2a',
                isActive: true,
                isStatic: true
            });
        }
    }

    private async createUserTenant() {
        const user = await this.userRepository.findOne({
            where: { id: seedConfiguration.user.tenantId }
        });
        if(!user){
            await this.userRepository.insert({
                id: seedConfiguration.user.tenantId,
                userName: seedConfiguration.user.userName,
                emailAddress: seedConfiguration.user.email,
                name: seedConfiguration.user.name,
                surname: seedConfiguration.user.name,
                password: '46f94c8de14fb36680850768ff1b7f2a',
                isActive: true,
                isStatic: true,
                tenantId: seedConfiguration.tenantId
            });
        }
    }

}