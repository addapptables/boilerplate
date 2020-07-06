import {MigrationInterface, QueryRunner} from "typeorm";

export class addedFieldLastOrganizationUnitToUser1593811156175 implements MigrationInterface {
    name = 'addedFieldLastOrganizationUnitToUser1593811156175'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "lastOrganizationUnitId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD "organizationUnitId" uuid`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "deleterUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "organization_units" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "organization_units" ADD "deleterUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deleterUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleterUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "editions" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "editions" ADD "deleterUserId" character varying`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_7f40032c59e6c6a495834b60b78" FOREIGN KEY ("organizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_7f40032c59e6c6a495834b60b78"`);
        await queryRunner.query(`ALTER TABLE "editions" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "editions" ADD "deleterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "deleterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "roles" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "roles" ADD "deleterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "organization_units" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "organization_units" ADD "deleterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "tenants" DROP COLUMN "deleterUserId"`);
        await queryRunner.query(`ALTER TABLE "tenants" ADD "deleterUserId" integer`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "organizationUnitId"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastOrganizationUnitId"`);
    }

}
