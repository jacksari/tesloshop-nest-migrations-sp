import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, In, Repository } from 'typeorm';
import { ProductSize } from '../entities/productSize.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductSize)
    private readonly productSizesRepository: Repository<ProductSize>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createProductDto: CreateProductDto) {


    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      // save product
      const product = this.productsRepository.create({
        ...createProductDto,
        slug: this.getSlugByTitle(createProductDto.title),
      });
      await queryRunner.manager.save(product);

      // save product sizes
      const productSizes = this.productSizesRepository.create(
        createProductDto.sizes.map(id => ({
          size: { id },
          product: product,
        })) as ProductSize[]
      );
      await queryRunner.manager.save(productSizes);

      // commit transaction
      await queryRunner.commitTransaction();
      return {
        message: 'Product created successfully',
        ok: true
      }

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error al crear el producto', 500);
    }
  }

  findAll() {
    return this.productsRepository.find({
      relations: {
        productSizes: {
          size: true,
        }
      }
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} product`;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }

  async existTitle(title: string) {
    const product = await this.productsRepository.findOne({
      where: {
        slug: this.getSlugByTitle(title)
      }
    });
    return !!product;
  }

  getSlugByTitle(title: string) {
    return title.toLowerCase().replace(/ /g, '-');
  }
}
