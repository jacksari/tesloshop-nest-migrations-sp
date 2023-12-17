import { Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';
import { ProductSize } from './productSize.entity';

@Entity('sizes')
export class Size {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('varchar', { length: 5, unique: true })
    size: string;

    @OneToMany(() => ProductSize, (productSize) => productSize.size)
    productSizes: ProductSize[];
}