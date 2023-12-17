import { MigrationInterface, QueryRunner } from 'typeorm';

export class sp_get_products1702805855970 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí tus operaciones de migración
        await queryRunner.query(`
            create procedure sp_get_products()
            begin
                select
                p.id,
                p.title,
                p.price,
                p.gender,
                p.slug,
                p.stock,
                si.sizes
            from product p
            left join (
                select
                    json_arrayagg(json_object(
                        'size_id', s.id,
                        'size_name', s.size
                    )) sizes,
                    ps.product_id
                from product_sizes ps
                join sizes s on s.id = ps.size_id
                group by ps.product_id
            ) si on si.product_id = p.id;
            end
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí las operaciones para revertir la migración
        await queryRunner.query('DROP PROCEDURE IF EXISTS sp_get_products');
    }
}
