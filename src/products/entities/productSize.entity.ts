import { Entity, ManyToOne, PrimaryGeneratedColumn, JoinColumn, Column } from "typeorm";
import { Product } from "./product.entity";
import { Size } from "./size.entity";

@Entity({
    name: "product_sizes",
})
export class ProductSize {
    @PrimaryGeneratedColumn()
    id: number;

    // Otros campos que quieras agregar a la tabla pivot

    // Relación con la entidad Product
    @ManyToOne(() => Product, (product) => product.productSizes, {
        onDelete: 'CASCADE',
    })
    @JoinColumn({ name: "product_id" })
    product: Product;

    // Relación con la entidad Size
    @ManyToOne(() => Size, (size) => size.productSizes)
    @JoinColumn({ name: "size_id" })
    size: Size;

    @Column('datetime', {
        default: () => 'CURRENT_TIMESTAMP',
    })
    createdAt: Date;

    @Column('datetime', {
        default: () => 'CURRENT_TIMESTAMP',
        onUpdate: 'CURRENT_TIMESTAMP',
    })
    updatedAt: Date;
}