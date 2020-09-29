import { expect } from 'chai';
import { EntitiesMetadataStorage } from '../../../../../lib/@craftsjs/typeorm/entities-metadata.storage';

describe('entities-metadata.storage', () => {

    it('should storage entities successfully', () => {
        EntitiesMetadataStorage.addEntitiesByConnection('token', [{ name: 'name' } as any]);
        const entities = EntitiesMetadataStorage.getEntitiesByConnection('token');
        expect(entities.length).to.be.eq(1);
    })

    it('should storage entities successfully', () => {
        EntitiesMetadataStorage.addEntitiesByConnection({name: 'token'} as any, [{ name: 'name' } as any]);
        const entities = EntitiesMetadataStorage.getEntitiesByConnection({name: 'token'} as any);
        expect(entities.length).to.be.eq(2);
    })

})