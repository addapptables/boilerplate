import { MigrationInterface, QueryRunner } from 'typeorm';

export class initialData1585086343002 implements MigrationInterface {

    name = 'initialData1585086343002';

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('INSERT INTO tenants("id", "creationTime","isDeleted", "name","subDomain","isActive", "type") VALUES(\'f1bfe9d7-9671-4b7d-90e5-080835d8e487\',now(), false,\'default\', \'default\', true, \'tenant\')');
        await queryRunner.query('INSERT INTO users("id", "creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive","isStatic","type") VALUES(\'d21a0d5f-424e-45ce-9448-5b2a38fe3c70\',now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true, true,\'user\')');
        await queryRunner.query('INSERT INTO users("id", "creationTime","isDeleted", "userName","emailAddress","name", "surname","password","isActive", "isStatic" ,"type", "tenantId") VALUES(\'31b631e6-44c2-422e-bf8a-9f287169a6e5\',now(), false,\'admin\', \'admin@crafts.com\', \'Admin\', \'Admin\', \'46f94c8de14fb36680850768ff1b7f2a\',true, true,\'user\', \'f1bfe9d7-9671-4b7d-90e5-080835d8e487\')');
        await queryRunner.query('INSERT INTO roles(\"id\", \"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\") VALUES(\'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\', now(), false,true,false, \'role\',\'admin\')');
        await queryRunner.query('INSERT INTO roles(\"id\", \"creationTime\",\"isDeleted\",\"isStatic\",\"isDefault\",\"type\",\"name\",\"tenantId\") VALUES(\'edec7b19-f0be-4b2a-a39e-33ae6b61d854\', now(), false,true,false, \'role\',\'admin\', \'f1bfe9d7-9671-4b7d-90e5-080835d8e487\')');
        await queryRunner.query('INSERT INTO user_roles(\"id\", \"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(\'bf2fb78b-393c-408c-83f2-183e24593eaf\', now(),\'d21a0d5f-424e-45ce-9448-5b2a38fe3c70\',\'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',\'role\')');
        await queryRunner.query('INSERT INTO user_roles(\"id\", \"creationTime\",\"userId\",\"roleId\",\"type\") VALUES(\'ff638c57-19dd-409c-bf51-c0aab068b5a6\', now(),\'31b631e6-44c2-422e-bf8a-9f287169a6e5\',\'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',\'role\')');
        // Create permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'55f164c2-843e-4dc0-90b8-4ce133460661\', now(),true, null,\'Page\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'67d6c433-c6e7-405c-bff8-aea8121b6bc0\', now(),true, \'55f164c2-843e-4dc0-90b8-4ce133460661\',\'Page.Administration\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'11170ea8-b30b-48bd-b1b3-3dcb67778e9b\', now(),\'55f164c2-843e-4dc0-90b8-4ce133460661\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'abf55099-c085-40f1-98d2-2dc4afc2de01\', now(),\'67d6c433-c6e7-405c-bff8-aea8121b6bc0\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');

        // User Permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'415241d2-3c02-472a-90ca-e9d38d19faad\', now(),true, \'67d6c433-c6e7-405c-bff8-aea8121b6bc0\',\'Page.Administration.User\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'0b645210-5627-4b15-a69b-b5254fcf85fc\', now(),true, \'415241d2-3c02-472a-90ca-e9d38d19faad\',\'Page.Administration.User.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'8183f405-59aa-48a5-86e3-4826bffac85c\', now(),true, \'0b645210-5627-4b15-a69b-b5254fcf85fc\',\'Page.Administration.User.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'b11fd636-f483-4d37-b931-a75a49915dbf\', now(),true, \'8183f405-59aa-48a5-86e3-4826bffac85c\',\'Page.Administration.User.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'9035b0f2-94fe-44df-b837-f3fb709a854e\', now(),true, \'b11fd636-f483-4d37-b931-a75a49915dbf\',\'Page.Administration.User.Delete\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'b1e26947-6914-4f06-94c0-f4124932bceb\', now(),\'415241d2-3c02-472a-90ca-e9d38d19faad\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'819aa2ec-8d1f-4fc8-ae2a-4fd11621b92b\', now(),\'0b645210-5627-4b15-a69b-b5254fcf85fc\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'28214a5f-a978-4517-ae08-40e31479fb71\', now(),\'8183f405-59aa-48a5-86e3-4826bffac85c\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'ea5e54d1-c4e8-49f2-b244-cff682095e87\', now(),\'b11fd636-f483-4d37-b931-a75a49915dbf\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'8ebad973-8199-478d-a2db-1893475dc477\', now(),\'9035b0f2-94fe-44df-b837-f3fb709a854e\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');


        // Role Permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'c7bff22f-a0b5-41c1-9d43-96df3b718d8b\', now(),true, \'9035b0f2-94fe-44df-b837-f3fb709a854e\',\'Page.Administration.Role\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'a1a75f01-12ce-4c94-8105-97cc882c7b92\', now(),true, \'c7bff22f-a0b5-41c1-9d43-96df3b718d8b\',\'Page.Administration.Role.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'3679a4a2-e85f-4136-9501-f4803a8dc98e\', now(),true, \'a1a75f01-12ce-4c94-8105-97cc882c7b92\',\'Page.Administration.Role.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'f2088975-3859-4794-98bc-c656723ec074\', now(),true, \'3679a4a2-e85f-4136-9501-f4803a8dc98e\',\'Page.Administration.Role.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'2a9f7ac2-6c59-4079-885c-5c4de11ab9dc\', now(),true, \'f2088975-3859-4794-98bc-c656723ec074\',\'Page.Administration.Role.Delete\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'16a03a95-68d3-48a3-9b9d-5ceefa68043f\', now(),\'c7bff22f-a0b5-41c1-9d43-96df3b718d8b\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'2c8f12f6-0e78-45c9-b868-705b543540a6\', now(),\'a1a75f01-12ce-4c94-8105-97cc882c7b92\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'d14d1071-13c3-4f8f-8b0c-a50571e39ef2\', now(),\'3679a4a2-e85f-4136-9501-f4803a8dc98e\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'65ad0472-a0d8-4041-9b84-4d16682c542f\', now(),\'f2088975-3859-4794-98bc-c656723ec074\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'ae66d884-217d-4587-b4ea-5007ae54de31\', now(),\'2a9f7ac2-6c59-4079-885c-5c4de11ab9dc\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');

        // Edition Permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'204eb470-d623-4748-9169-0f6e72251af9\', now(),true, \'2a9f7ac2-6c59-4079-885c-5c4de11ab9dc\',\'Page.Administration.Edition\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'e5cee91a-0e9e-4a7f-a911-030b681e219e\', now(),true, \'204eb470-d623-4748-9169-0f6e72251af9\',\'Page.Administration.Edition.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'d7cac9d2-d703-4dbb-94d8-881275f7118e\', now(),true, \'e5cee91a-0e9e-4a7f-a911-030b681e219e\',\'Page.Administration.Edition.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'97b25ea2-41bd-40af-85b3-124ad78e312b\', now(),true, \'d7cac9d2-d703-4dbb-94d8-881275f7118e\',\'Page.Administration.Edition.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'44b8cacb-4c3f-485d-9e13-86fb2851a36a\', now(),true, \'97b25ea2-41bd-40af-85b3-124ad78e312b\',\'Page.Administration.Edition.Delete\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'d19a84a0-4f26-40a2-aaa1-8d3542be93b6\', now(),\'204eb470-d623-4748-9169-0f6e72251af9\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'9a5b7be4-dae6-4737-b9f0-d3ba8a56645f\', now(),\'e5cee91a-0e9e-4a7f-a911-030b681e219e\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'45c5ef97-43aa-4163-8cdf-0e33aa412817\', now(),\'d7cac9d2-d703-4dbb-94d8-881275f7118e\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'add522a4-3680-406b-9cad-4f6dcc6692e0\', now(),\'97b25ea2-41bd-40af-85b3-124ad78e312b\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'aefe87ac-a7aa-44e6-82ea-0b8d09b5ddaf\', now(),\'44b8cacb-4c3f-485d-9e13-86fb2851a36a\', \'6fc3d212-6edd-48d8-9dd9-90f8ffa71e7f\',true,\'Permission\')');

        // Create permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'f92e22a8-c2fb-4e1e-84cc-ed7ecd4c7fad\', now(),false, null,\'Page\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'8df43dd1-7edb-49a4-be8a-ecb3c13495aa\', now(),false, \'f92e22a8-c2fb-4e1e-84cc-ed7ecd4c7fad\',\'Page.Administration\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'7f43faa9-e670-46b4-b9a4-0d5685aabf0a\', now(),\'f92e22a8-c2fb-4e1e-84cc-ed7ecd4c7fad\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'7b05fe07-f2fc-498b-881e-de93340b50a6\', now(),\'8df43dd1-7edb-49a4-be8a-ecb3c13495aa\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');

        // User Permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'b3fa5fc5-42c2-43b5-885f-68b12146c5bd\', now(),false, \'8df43dd1-7edb-49a4-be8a-ecb3c13495aa\',\'Page.Administration.User\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'4dd8c4bd-6274-42de-9888-2f30d9f0637e\', now(),false, \'b3fa5fc5-42c2-43b5-885f-68b12146c5bd\',\'Page.Administration.User.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'1531ec65-fb2c-4285-8c0c-60fe89c7dd89\', now(),false, \'4dd8c4bd-6274-42de-9888-2f30d9f0637e\',\'Page.Administration.User.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'72c95029-484a-4d46-a4a6-764b46a8c1ae\', now(),false, \'1531ec65-fb2c-4285-8c0c-60fe89c7dd89\',\'Page.Administration.User.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'7913ab1d-9246-40fd-9c8f-1d26805810ca\', now(),false, \'72c95029-484a-4d46-a4a6-764b46a8c1ae\',\'Page.Administration.User.Delete\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'8dcf17df-87f5-4963-8968-11eefd4a02c8\', now(),\'b3fa5fc5-42c2-43b5-885f-68b12146c5bd\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'0b2669a5-8af5-47b2-965e-f0c9880381aa\', now(),\'4dd8c4bd-6274-42de-9888-2f30d9f0637e\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'6e2d6ad5-6ff2-43d8-934c-d72a168151d2\', now(),\'1531ec65-fb2c-4285-8c0c-60fe89c7dd89\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'9767e4bb-3aee-4e2b-8766-0df71b7cb7ad\', now(),\'72c95029-484a-4d46-a4a6-764b46a8c1ae\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'d5c8d67b-5f27-4421-8d9d-53e20aef0000\', now(),\'7913ab1d-9246-40fd-9c8f-1d26805810ca\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');

        // Role Permissions
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'06faf5aa-c2ff-4f08-a22a-d13a438f1875\', now(),false, \'7913ab1d-9246-40fd-9c8f-1d26805810ca\',\'Page.Administration.Role\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'a063eb72-bb1e-42c0-bd90-71754e2df5eb\', now(),false, \'06faf5aa-c2ff-4f08-a22a-d13a438f1875\',\'Page.Administration.Role.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'e915bc0b-a3bf-4882-86a8-e0159bbf0ccc\', now(),false, \'a063eb72-bb1e-42c0-bd90-71754e2df5eb\',\'Page.Administration.Role.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'71fde129-e0f4-4618-b246-b94994986320\', now(),false, \'e915bc0b-a3bf-4882-86a8-e0159bbf0ccc\',\'Page.Administration.Role.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'7af005ac-0404-4812-a10f-c5b985b1d4a2\', now(),false, \'71fde129-e0f4-4618-b246-b94994986320\',\'Page.Administration.Role.Delete\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'943bc7ab-5886-4abd-93eb-60bdd6eada3b\', now(),\'06faf5aa-c2ff-4f08-a22a-d13a438f1875\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'1c31e132-f552-4a02-a67e-20448a27adbb\', now(),\'a063eb72-bb1e-42c0-bd90-71754e2df5eb\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'6a018bd1-89f4-4dbd-b960-7fa301c0d4dc\', now(),\'e915bc0b-a3bf-4882-86a8-e0159bbf0ccc\',\'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'67b54b3b-ba8d-48c1-9d88-78c1cf11bc33\', now(),\'71fde129-e0f4-4618-b246-b94994986320\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'349c59bc-822e-4629-bea1-a283daebb6c1\', now(),\'7af005ac-0404-4812-a10f-c5b985b1d4a2\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');

        // OrganizationUnit
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'51019385-d919-4cee-9172-f4988b4f8fbf\', now(),false, \'7af005ac-0404-4812-a10f-c5b985b1d4a2\',\'Page.Administration.OrganizationUnit\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'1e343263-123a-4f08-9ba8-d4e39c8f4914\', now(),false, \'51019385-d919-4cee-9172-f4988b4f8fbf\',\'Page.Administration.OrganizationUnit.Create\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'9b6da458-5b7d-4de5-afcc-382f48f22451\', now(),false, \'1e343263-123a-4f08-9ba8-d4e39c8f4914\',\'Page.Administration.OrganizationUnit.Update\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'73800f91-b548-4edc-b1e3-4f4205ff4130\', now(),false, \'9b6da458-5b7d-4de5-afcc-382f48f22451\',\'Page.Administration.OrganizationUnit.GetAll\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'0f19062b-7983-41e8-ba26-13e4707f08cc\', now(),false, \'73800f91-b548-4edc-b1e3-4f4205ff4130\',\'Page.Administration.OrganizationUnit.Delete\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'4ae6843c-ddb6-410b-95c1-f4c231c7c1d0\', now(),false, \'0f19062b-7983-41e8-ba26-13e4707f08cc\',\'Page.Administration.OrganizationUnit.AddUsers\',\'Permission\')');
        await queryRunner.query('INSERT INTO permissions(\"id\", \"creationTime\",\"isHost\",\"parentId\",\"name\",\"type\") VALUES(\'a33c692a-09c4-4efa-b875-29293258ca28\', now(),false, \'4ae6843c-ddb6-410b-95c1-f4c231c7c1d0\',\'Page.Administration.OrganizationUnit.AddRoles\',\'Permission\')');

        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'1be74ad0-611d-4b08-a971-a664b440d6f0\', now(),\'51019385-d919-4cee-9172-f4988b4f8fbf\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'2df578d7-703c-4230-83fb-ff943eb76acd\', now(),\'1e343263-123a-4f08-9ba8-d4e39c8f4914\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'3a359cce-0f01-4a5f-9ebb-8dab5328f2fb\', now(),\'9b6da458-5b7d-4de5-afcc-382f48f22451\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'279b45e2-1c53-4867-9bae-6d497a775c47\', now(),\'73800f91-b548-4edc-b1e3-4f4205ff4130\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'5c5aadef-1b34-4121-a803-5d2836841bb3\', now(),\'0f19062b-7983-41e8-ba26-13e4707f08cc\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'d20ea582-3ff1-4278-89e3-bf4dfeb45571\', now(),\'4ae6843c-ddb6-410b-95c1-f4c231c7c1d0\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
        await queryRunner.query('INSERT INTO role_permissions(\"id\", \"creationTime\",\"permissionId\",\"roleId\",\"isGranted\",\"type\") VALUES(\'aca712eb-38f7-4afd-9412-b70dce8b7e9e\', now(),\'a33c692a-09c4-4efa-b875-29293258ca28\', \'edec7b19-f0be-4b2a-a39e-33ae6b61d854\',true,\'Permission\')');
    }

    public async down(_: QueryRunner): Promise<any> {
    }

}
