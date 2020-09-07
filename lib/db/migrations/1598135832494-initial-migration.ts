import {MigrationInterface, QueryRunner} from 'typeorm';

export class initialMigration1598135832494 implements MigrationInterface {
    name = 'initialMigration1598135832494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('CREATE TABLE "tenants" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "lastModifierUserId" character varying, "lastModificationTime" TIMESTAMP, "deleterUserId" character varying, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "name" character varying(200) NOT NULL, "subDomain" character varying(64) NOT NULL, "isActive" boolean NOT NULL, "connectionString" character varying, "subscriptionEndDate" TIMESTAMP, "isInTrialPeriod" boolean, "editionId" uuid, "type" character varying NOT NULL, CONSTRAINT "PK_53be67a04681c66b87ee27c9321" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_4844ba1239aa4270ee36240817" ON "tenants" ("type") ');
        await queryRunner.query('CREATE TABLE "role_permissions" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "permissionId" uuid NOT NULL, "roleId" uuid NOT NULL, "isGranted" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_84059017c90bfcb701b8fa42297" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_c6f7d3ccdbcfcff2de15d95491" ON "role_permissions" ("type") ');
        await queryRunner.query('CREATE TABLE "organization_unit_users" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "userId" uuid NOT NULL, "organizationUnitId" uuid NOT NULL, CONSTRAINT "PK_0f2ca0de7edb1a69803b125ac39" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "organization_units" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "lastModifierUserId" character varying, "lastModificationTime" TIMESTAMP, "deleterUserId" character varying, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" character varying, "parentId" uuid, "code" character varying(95) NOT NULL, "name" character varying(200) NOT NULL, CONSTRAINT "PK_b51ad75dc72e599989e8de6349b" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "organization_unit_roles" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "roleId" uuid NOT NULL, "organizationUnitId" uuid NOT NULL, CONSTRAINT "PK_1eb1d6e529b4ecea86059540e74" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE TABLE "roles" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "lastModifierUserId" character varying, "lastModificationTime" TIMESTAMP, "deleterUserId" character varying, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" character varying, "name" character varying(200) NOT NULL, "isStatic" boolean NOT NULL, "isDefault" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_ff503f858b61860b2b7d7a55ce" ON "roles" ("type") ');
        await queryRunner.query('CREATE TABLE "user_roles" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "userId" uuid NOT NULL, "roleId" uuid NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_8acd5cf26ebd158416f477de799" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_89d297076e5b7c048389ff0bd4" ON "user_roles" ("type") ');
        await queryRunner.query('CREATE TABLE "users" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "lastModifierUserId" character varying, "lastModificationTime" TIMESTAMP, "deleterUserId" character varying, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "tenantId" character varying, "userName" character varying(200) NOT NULL, "emailAddress" character varying(256) NOT NULL, "name" character varying(200) NOT NULL, "surname" character varying(200) NOT NULL, "password" character varying(128) NOT NULL, "emailConfirmationCode" character varying(328), "passwordResetCode" character varying(328), "lockoutEndDateUtc" TIMESTAMP, "accessFailedCount" integer, "phoneNumber" character varying(32), "isEmailConfirmed" boolean, "isActive" boolean, "isStatic" boolean NOT NULL, "lastOrganizationUnitId" uuid, "type" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8" ON "users" ("type") ');
        await queryRunner.query('CREATE TABLE "user_permissions" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "permissionId" uuid NOT NULL, "userId" uuid NOT NULL, "isGranted" boolean NOT NULL, "type" character varying NOT NULL, CONSTRAINT "PK_01f4295968ba33d73926684264f" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_1e4730fe84431e5a7ee5e26c90" ON "user_permissions" ("type") ');
        await queryRunner.query('CREATE TABLE "permissions" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "name" character varying(200) NOT NULL, "isHost" boolean NOT NULL, "parentId" uuid, "type" character varying NOT NULL, CONSTRAINT "PK_920331560282b8bd21bb02290df" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_f268ae606aacf1dc940820323c" ON "permissions" ("type") ');
        await queryRunner.query('CREATE TYPE "editions_editiontype_enum" AS ENUM(\'1\', \'2\', \'3\')');
        await queryRunner.query('CREATE TABLE "editions" ("id" uuid NOT NULL, "creatorUserId" character varying, "creationTime" TIMESTAMP, "lastModifierUserId" character varying, "lastModificationTime" TIMESTAMP, "deleterUserId" character varying, "deletionTime" TIMESTAMP, "isDeleted" boolean NOT NULL, "name" character varying(200) NOT NULL, "isFree" boolean NOT NULL, "price" numeric, "numberOfUsers" integer, "trialDayCount" integer, "editionType" "editions_editiontype_enum", "type" character varying NOT NULL, CONSTRAINT "PK_a04f035dd7a1c3f344481cb6a2e" PRIMARY KEY ("id"))');
        await queryRunner.query('CREATE INDEX "IDX_d716a4c5fd1384cf0ef5c22642" ON "editions" ("type") ');
        await queryRunner.query('ALTER TABLE "tenants" ADD CONSTRAINT "FK_f124cd58c0c3dcbbc64bfb6e788" FOREIGN KEY ("editionId") REFERENCES "editions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "role_permissions" ADD CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization_unit_users" ADD CONSTRAINT "FK_b295eaba7e06b204ad945081d21" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization_unit_users" ADD CONSTRAINT "FK_276c0352106bfa38ee12b7be74a" FOREIGN KEY ("organizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization_units" ADD CONSTRAINT "FK_7c07c24083017b57dfe953aa770" FOREIGN KEY ("parentId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization_unit_roles" ADD CONSTRAINT "FK_ae1d1371d9d65fe08fd5d0dc763" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "organization_unit_roles" ADD CONSTRAINT "FK_645daf26bbe2971f2ce7144802d" FOREIGN KEY ("organizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_roles" ADD CONSTRAINT "FK_86033897c009fcca8b6505d6be2" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_roles" ADD CONSTRAINT "FK_472b25323af01488f1f66a06b67" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "FK_e618f929b3c2178dd4b45521a5f" FOREIGN KEY ("lastOrganizationUnitId") REFERENCES "organization_units"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2" FOREIGN KEY ("permissionId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "user_permissions" ADD CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
        await queryRunner.query('ALTER TABLE "permissions" ADD CONSTRAINT "FK_3ddb4a6abeb322e7350ef11acc2" FOREIGN KEY ("parentId") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "permissions" DROP CONSTRAINT "FK_3ddb4a6abeb322e7350ef11acc2"');
        await queryRunner.query('ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_f05ccc7935f14874d7f89ba030f"');
        await queryRunner.query('ALTER TABLE "user_permissions" DROP CONSTRAINT "FK_cf38f85e52ee274ba9a01901ed2"');
        await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_e618f929b3c2178dd4b45521a5f"');
        await queryRunner.query('ALTER TABLE "user_roles" DROP CONSTRAINT "FK_472b25323af01488f1f66a06b67"');
        await queryRunner.query('ALTER TABLE "user_roles" DROP CONSTRAINT "FK_86033897c009fcca8b6505d6be2"');
        await queryRunner.query('ALTER TABLE "organization_unit_roles" DROP CONSTRAINT "FK_645daf26bbe2971f2ce7144802d"');
        await queryRunner.query('ALTER TABLE "organization_unit_roles" DROP CONSTRAINT "FK_ae1d1371d9d65fe08fd5d0dc763"');
        await queryRunner.query('ALTER TABLE "organization_units" DROP CONSTRAINT "FK_7c07c24083017b57dfe953aa770"');
        await queryRunner.query('ALTER TABLE "organization_unit_users" DROP CONSTRAINT "FK_276c0352106bfa38ee12b7be74a"');
        await queryRunner.query('ALTER TABLE "organization_unit_users" DROP CONSTRAINT "FK_b295eaba7e06b204ad945081d21"');
        await queryRunner.query('ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_b4599f8b8f548d35850afa2d12c"');
        await queryRunner.query('ALTER TABLE "role_permissions" DROP CONSTRAINT "FK_06792d0c62ce6b0203c03643cdd"');
        await queryRunner.query('ALTER TABLE "tenants" DROP CONSTRAINT "FK_f124cd58c0c3dcbbc64bfb6e788"');
        await queryRunner.query('DROP INDEX "IDX_d716a4c5fd1384cf0ef5c22642"');
        await queryRunner.query('DROP TABLE "editions"');
        await queryRunner.query('DROP TYPE "editions_editiontype_enum"');
        await queryRunner.query('DROP INDEX "IDX_f268ae606aacf1dc940820323c"');
        await queryRunner.query('DROP TABLE "permissions"');
        await queryRunner.query('DROP INDEX "IDX_1e4730fe84431e5a7ee5e26c90"');
        await queryRunner.query('DROP TABLE "user_permissions"');
        await queryRunner.query('DROP INDEX "IDX_94e2000b5f7ee1f9c491f0f8a8"');
        await queryRunner.query('DROP TABLE "users"');
        await queryRunner.query('DROP INDEX "IDX_89d297076e5b7c048389ff0bd4"');
        await queryRunner.query('DROP TABLE "user_roles"');
        await queryRunner.query('DROP INDEX "IDX_ff503f858b61860b2b7d7a55ce"');
        await queryRunner.query('DROP TABLE "roles"');
        await queryRunner.query('DROP TABLE "organization_unit_roles"');
        await queryRunner.query('DROP TABLE "organization_units"');
        await queryRunner.query('DROP TABLE "organization_unit_users"');
        await queryRunner.query('DROP INDEX "IDX_c6f7d3ccdbcfcff2de15d95491"');
        await queryRunner.query('DROP TABLE "role_permissions"');
        await queryRunner.query('DROP INDEX "IDX_4844ba1239aa4270ee36240817"');
        await queryRunner.query('DROP TABLE "tenants"');
    }

}
