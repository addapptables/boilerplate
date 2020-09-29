import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { expect } from "chai";
import { CraftsRepository } from "../../../../../lib/@craftsjs/core";
import { getRepositoryToken } from "../../../../../lib/@craftsjs/typeorm";
import { ApplicationModule } from "../src/app.module";
import { FullAuditedTest } from "../src/photo/full-audited.entity";
import { Photo } from "../src/photo/photo.entity";
import { v4 as uuid } from 'uuid';

describe('crafts-repository', () => {

    let app: INestApplication;

    let photoRepository: CraftsRepository<Photo>;
    let fullAuditedTestRepository: CraftsRepository<FullAuditedTest>;

    before(async () => {
        const module = await Test.createTestingModule({
            imports: [ApplicationModule],
        }).compile();

        app = module.createNestApplication();
        photoRepository = module.get(getRepositoryToken(Photo));
        fullAuditedTestRepository = module.get(getRepositoryToken(FullAuditedTest));
        await app.init();
    });

    after(async () => {
        await app.close();
    })

    it('should return photos succesFully', async () => {
        try {
            await photoRepository.findOneOrFail({ where: { id: 123456789 } });
            expect('fail').to.be.eq('Success');
        } catch (error) {
            expect(error).to.be.not.undefined;
        }
    })

    it('should return all photos', async () => {
        const photos = await photoRepository.find({});
        expect(photos).to.be.an('array');
    })

    it('should return count photos', async () => {
        const photos = await photoRepository.count({});
        expect(photos).to.be.an('number');
    })

    it('should remove array of photos', async () => {
        await photoRepository.save({ name: 'test1', isPublished: true, description: 'test', filename: 'test', views: 0 });
        await photoRepository.save({ name: 'test2', isPublished: true, description: 'test', filename: 'test', views: 0 });
        const allPhotos = await photoRepository.find({});
        await photoRepository.remove(allPhotos);
        const countPhotos = await photoRepository.count({ name: 'test1' });
        expect(countPhotos).to.be.eq(0);
    })

    it('should remove array of entity', async () => {
        await fullAuditedTestRepository.save({ id: uuid(), name: 'test1', isDeleted: false });
        await fullAuditedTestRepository.save({ id: uuid(), name: 'test2', isDeleted: false });
        const allEntities = await fullAuditedTestRepository.find({});
        await fullAuditedTestRepository.remove(allEntities);
        const countEntities = await fullAuditedTestRepository.count({ name: 'test1' });
        expect(countEntities).to.be.eq(0);
    })

    it('should return query entity', async () => {
        const count = await fullAuditedTestRepository.createQueryBuilder().getCount();
        expect(count).to.be.eq(2);
        const countWithname = await fullAuditedTestRepository.createQueryBuilder('entity').getCount();
        expect(countWithname).to.be.eq(2);
    })

    it('should return photo query entity', async () => {
        const count = await photoRepository.createQueryBuilder().getCount();
        expect(count).to.be.eq(0);
        const countPhotoWithName = await photoRepository.createQueryBuilder('photo').getCount();
        expect(countPhotoWithName).to.be.eq(0);
    })

    it('should filter by tenantId', async () => {
        fullAuditedTestRepository.sessionService.tenantId = uuid();
        const count = await fullAuditedTestRepository.createQueryBuilder().getCount();
        expect(count).to.be.eq(0);
        const countWithName = await fullAuditedTestRepository.createQueryBuilder('name').getCount();
        expect(countWithName).to.be.eq(0);
    })

})