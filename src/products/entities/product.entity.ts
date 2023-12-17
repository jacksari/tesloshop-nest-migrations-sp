import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Size } from "./size.entity";
import { ProductSize } from "./productSize.entity";

export enum GenderProduct {
    HOMBRE = 'HOMBRE',
    MUJER = 'MUJER',
    UNISEX = 'UNISEX',
}

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', {
        unique: true,
    })
    title: string;

    @Column('decimal', {
        precision: 5,
        scale: 2,
        default: 0,
    })
    price: number;

    @Column('text', {
        nullable: true,
    })
    description: string;

    @Column('varchar', {
        nullable: true,
        unique: true,
    })
    slug: string;

    @Column('int', {
        default: 0,
    })
    stock: number;

    @Column({
        type: 'enum',
        enum: GenderProduct,
        default: GenderProduct.UNISEX,
    })
    gender: GenderProduct;

    @OneToMany(() => ProductSize, (productSize) => productSize.product)
    productSizes: ProductSize[];

}
