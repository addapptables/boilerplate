import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1584291483894 implements MigrationInterface {
    name = 'initialMigration1584291483894'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tenants" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "lastModifierUserId" integer, "lastModificationTime" TIMESTAMP, "deleterUserId" integer, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "name" character varying(200) NOT NULL, "subDomain" character varying(64) NOT NULL, "isActive" boolean NOT NULL, "connectionString" character varying, "subscriptionEndDate" TIMESTAMP, "isInTrialPeriod" boolean, "editionId" integer, "type" character varying NOT NULL, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_4844ba1239aa4270ee36240817" ON "tenants" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "organization_units" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "lastModifierUserId" integer, "lastModificationTime" TIMESTAMP, "deleterUserId" integer, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" integer, "parentId" integer, "code" character varying(95) NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "PK_b51ad75dc72e599989e8de6349b" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_organization_units" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "userId" integer NOT NULL, "organizationUnitId" integer NOT NULL, CONSTRAINT "PK_aeb0fe08c596da31eb2f5a08cf2" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "lastModifierUserId" integer, "lastModificationTime" TIMESTAMP, "deleterUserId" integer, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" integer, "userName" character varying(200) NOT NULL, "emailAddress" character varying(256) NOT NULL, "name" character varying(200) NOT NULL, "surname" character varying(200) NOT NULL, "password" character varying(128) NOT NULL, "emailConfirmationCode" character varying(328), "passwordResetCode" character varying(328), "lockoutEndDateUtc" TIMESTAMP, "accessFailedCount" integer, "phoneNumber" character varying(32), "isEmailConfirmed" boolean, "isActive" boolean, "isStatic" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8" ON "users" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "userId" integer NOT NULL, "roleId" integer NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_89d297076e5b7c048389ff0bd4" ON "user_roles" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "lastModifierUserId" integer, "lastModificationTime" TIMESTAMP, "deleterUserId" integer, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" integer, "name" character varying(200) NOT NULL, "isStatic" boolean NOT NULL, "isDefault" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ff503f858b61860b2b7d7a55ce" ON "roles" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "role_permissions" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "permissionId" integer NOT NULL, "roleId" integer NOT NULL, "isGranted" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_c6f7d3ccdbcfcff2de15d95491" ON "role_permissions" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "permissions" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "name" character varying(200) NOT NULL, "isHost" boolean NOT NULL, "parentId" integer, "type" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f268ae606aacf1dc940820323c" ON "permissions" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "user_permissions" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "permissionId" integer NOT NULL, "userId" integer NOT NULL, "isGranted" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_01f4295968ba33d73926684264f" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_1e4730fe84431e5a7ee5e26c90" ON "user_permissions" ("type") `, undefined);
        await queryRunner.query(`CREATE TABLE "role_organization_units" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "tenantId" integer, "roleId" integer NOT NULL, "organizationUnitId" integer NOT NULL, CONSTRAINT "PK_a7243f69e4f1a7729231c2d9116" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TYPE "editions_editiontype_enum" AS ENUM('1', '2', '3')`, undefined);
        await queryRunner.query(`CREATE TABLE "editions" ("id" SERIAL NOT NULL, "creatorUserId" integer, "creationTime" TIMESTAMP, "lastModifierUserId" integer, "lastModificationTime" TIMESTAMP, "deleterUserId" integer, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "name" character varying(200) NOT NULL, "isFree" boolean NOT NULL, "price" numeric, "numberOfUsers" integer, "trialDayCount" integer, "editionType" "editions_editiontype_enum", "type" character varying NOT NULL, CONSTRAINT "PK_a04f035dd7a1c3f344481cb6a2e" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_d716a4c5fd1384cf0ef5c22642" ON "editions" ("type") `, undefined);
        await queryRunner.query(`ALTER TABLE "tenants" ADD CONSTRAINT "FK_f124cd58c0c3dcbbc64bfb6e788" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_units" ADD CONSTRAINT "FK_7c07c24083017b57dfe953aa770" FOREIGN KEY ("parentId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_organization_units" ADD CONSTRAINT "FK_3cc307d46db955c0ddf2c220130" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_organization_units" ADD CONSTRAINT "FK_2348c14dd1930fa9e323bfd2569" FOREIGN KEY ("organizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions" ADD CONSTRAINT "FK_3ddb4a6abeb322e7350ef11acc2" FOREIGN KEY ("parentId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_organization_units" ADD CONSTRAINT "FK_6476970bec717e405e7d6d52317" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "role_organization_units" ADD CONSTRAINT "FK_258759ab099be8fe5f29c7a9b00" FOREIGN KEY ("organizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "role_organization_units" DROP CONSTRAINT "FK_258759ab099be8fe5f29c7a9b00"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_organization_units" DROP CONSTRAINT "FK_6476970bec717e405e7d6d52317"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2"`, undefined);
        await queryRunner.query(`ALTER TABLE "permissions" DROP CONSTRAINT "FK_3ddb4a6abeb322e7350ef11acc2"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"`, undefined);
        await queryRunner.query(`ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_organization_units" DROP CONSTRAINT "FK_2348c14dd1930fa9e323bfd2569"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_organization_units" DROP CONSTRAINT "FK_3cc307d46db955c0ddf2c220130"`, undefined);
        await queryRunner.query(`ALTER TABLE "organization_units" DROP CONSTRAINT "FK_7c07c24083017b57dfe953aa770"`, undefined);
        await queryRunner.query(`ALTER TABLE "tenants" DROP CONSTRAINT "FK_f124cd58c0c3dcbbc64bfb6e788"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_d716a4c5fd1384cf0ef5c22642"`, undefined);
        await queryRunner.query(`DROP TABLE "editions"`, undefined);
        await queryRunner.query(`DROP TYPE "editions_editiontype_enum"`, undefined);
        await queryRunner.query(`DROP TABLE "role_organization_units"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_1e4730fe84431e5a7ee5e26c90"`, undefined);
        await queryRunner.query(`DROP TABLE "user_permissions"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f268ae606aacf1dc940820323c"`, undefined);
        await queryRunner.query(`DROP TABLE "permissions"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_c6f7d3ccdbcfcff2de15d95491"`, undefined);
        await queryRunner.query(`DROP TABLE "role_permissions"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ff503f858b61860b2b7d7a55ce"`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_89d297076e5b7c048389ff0bd4"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`DROP TABLE "user_organization_units"`, undefined);
        await queryRunner.query(`DROP TABLE "organization_units"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_4844ba1239aa4270ee36240817"`, undefined);
        await queryRunner.query(`DROP TABLE "tenants"`, undefined);
    }

}
