import { MigrationInterface, QueryRunner } from 'typeorm';

export class defaultData1584291567024 implements MigrationInterface {

    name = 'defaultData1584291567024';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO tenants("creationTime","isDeleted", "name","subDomain","isActive", "type") VALUES(now(), false,\'default\', \'default\', true, \'tenant\')');
        await queryRunner.query('INSERT INTO users("creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive","isStatic","type") VALUES(now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true, true,\'user\')');
        await queryRunner.query('INSERT INTO users("creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive", "isStatic" ,"type", "tenantId") VALUES(now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true, true,\'user\', 1)');
        await queryRunner.query('INSERT INTO roles(\"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\") VALUES(now(), false,true,false, \'role\',\'admin\')');
        await queryRunner.query('INSERT INTO roles(\"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\",\"tenantId\") VALUES(now(), false,true,false, \'role\',\'admin\', 1)');
        await queryRunner.query('INSERT INTO user_roles(\"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(now(),1,1,\'role\')');
        await queryRunner.query('INSERT INTO user_roles(\"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(now(),2,2,\'role\')');
        // Create permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, null,\'Page\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 1,\'Page.Administration\',\'Permission\')');
        // User Permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 2,\'Page.Administration.User\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 3,\'Page.Administration.User.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 4,\'Page.Administration.User.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 5,\'Page.Administration.User.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 6,\'Page.Administration.User.Delete\',\'Permission\')');
        // Role Permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 7,\'Page.Administration.Role\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 8,\'Page.Administration.Role.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 9,\'Page.Administration.Role.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 10,\'Page.Administration.Role.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 11,\'Page.Administration.Role.Delete\',\'Permission\')');
        // Edition Permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 12,\'Page.Administration.Edition\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 13,\'Page.Administration.Edition.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 14,\'Page.Administration.Edition.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 15,\'Page.Administration.Edition.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),true, 16,\'Page.Administration.Edition.Delete\',\'Permission\')');
        // Create permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, null,\'Page\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 18,\'Page.Administration\',\'Permission\')');
        // User Permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 19,\'Page.Administration.User\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 20,\'Page.Administration.User.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 21,\'Page.Administration.User.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 22,\'Page.Administration.User.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 23,\'Page.Administration.User.Delete\',\'Permission\')');
        // Role Permissions
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 24,\'Page.Administration.Role\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 25,\'Page.Administration.Role.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 26,\'Page.Administration.Role.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 27,\'Page.Administration.Role.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 28,\'Page.Administration.Role.Delete\',\'Permission\')');
        // OrganizationUnit
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 29,\'Page.Administration.OrganizationUnit\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 30,\'Page.Administration.OrganizationUnit.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 31,\'Page.Administration.OrganizationUnit.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 32,\'Page.Administration.OrganizationUnit.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 33,\'Page.Administration.OrganizationUnit.Delete\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 34,\'Page.Administration.OrganizationUnit.AddUsers\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(now(),false, 35,\'Page.Administration.OrganizationUnit.AddRoles\',\'Permission\')');
        // Role permissions host
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),1, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),2, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),3, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),4, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),5, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),6, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),7, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),8, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),9, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),10, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),11, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),12, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),13, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),14, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),15, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),16, 1,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),17, 1,true,\'Permission\')');
        // Role permissions tenant
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),18, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),19, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),20, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),21, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),22, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),23, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),24, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),25, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),26, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),27,2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),28, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),29, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),30, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),31, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),32, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),33, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),34, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),35, 2,true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(now(),36, 2,true,\'Permission\')');
    }

    public async down(_: QueryRunner): Promise<any> {
    }

}
