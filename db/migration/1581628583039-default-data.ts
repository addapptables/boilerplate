import { MigrationInterface, QueryRunner } from 'typeorm';

export class defaultData1581628583039 implements MigrationInterface {

    name = 'defaultData1581628583039';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO tenants("creationTime","isDeleted", "name","subDomain","isActive", "type") VALUES(now(), false,\'default\', \'default\', true, \'tenant\')');
        await queryRunner.query('INSERT INTO users("creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive","type") VALUES(now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true,\'user\')');
        await queryRunner.query('INSERT INTO users("creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive","type", "tenantId") VALUES(now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true,\'user\', 1)');
        await queryRunner.query('INSERT INTO roles(\"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\") VALUES(now(), false,true,false, \'role\',\'admin\')');
        await queryRunner.query('INSERT INTO roles(\"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\",\"tenantId\") VALUES(now(), false,true,false, \'role\',\'admin\', 1)');
        await queryRunner.query('INSERT INTO user_roles(\"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(now(),1,1,\'role\')');
        await queryRunner.query('INSERT INTO user_roles(\"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(now(),2,2,\'role\')');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
    }

}
