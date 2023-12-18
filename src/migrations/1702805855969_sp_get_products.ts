import { MigrationInterface, QueryRunner } from 'typeorm';

export class sp_get_products1702805855984 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí tus operaciones de migración
        await queryRunner.query('DROP PROCEDURE IF EXISTS sp_get_products');
        await queryRunner.query(`
            create procedure sp_get_products(
                in _page int,
                in _perpage int,
                in _search varchar(255)
            )
            begin

                declare _offset int default 0;
                declare _total int default 0;
                declare _totalpages int default 0;
                
                select count(*) into _total from product
                where if(_search is not null, title like concat('%', _search, '%'), 1);

                set _offset = (_page - 1) * _perpage;

                select
                    p.id,
                    p.title,
                    si.sizes,
                    p.tags,
                    _total total
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
                ) si on si.product_id = p.id
                where if(_search is not null, p.title like concat('%', _search, '%'), 1)
                order by p.id desc
                limit _perpage offset _offset;
            end
        `);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Agrega aquí las operaciones para revertir la migración
        await queryRunner.query('DROP PROCEDURE IF EXISTS sp_get_products');
    }
}
