import { HttpException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { DataSource, In, Repository } from 'typeorm';
import { ProductSize } from '../entities/productSize.entity';
import { PaginatedData, pagination } from 'src/helpers/paginate.helper';
import { GetProductsDto } from '../dto/get-products.dto';
import { ProductImage } from '../entities/productImage.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productsRepository: Repository<Product>,
    @InjectRepository(ProductSize)
    private readonly productSizesRepository: Repository<ProductSize>,
    @InjectRepository(ProductImage)
    private readonly productImagesRepository: Repository<ProductImage>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createProductDto: CreateProductDto) {


    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const { images = [], ...productDetails } = createProductDto;
      // save product
      const product = this.productsRepository.create({
        ...productDetails,
        images: createProductDto.images?.map(url => this.productImagesRepository.create({ url })),
        // productSizes: createProductDto.sizes.map(id => this.productSizesRepository.create({ size: {id} }))
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
        message: 'Producto creado correctamente',
        ok: true
      }

    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw new HttpException('Error al crear el producto', 500);
    }
  }

  async findProducts(
    getProductsDto: GetProductsDto
  ): Promise<PaginatedData<Product>> {
    const { page, perpage, search } = getProductsDto;

    const query = 'call sp_get_products(?, ?, ?)';
    const params = [page, perpage, search];

    const [data] = await this.dataSource.query(query, params);

    return pagination(
      data,
      page,
      perpage
    );
  }

  findOne(id: number) {
    return this.productsRepository.findOneBy({ id });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    const product = await this.findOne(id);
    await this.productsRepository.remove(product);
    return {
      message: 'Producto eliminado correctamente',
      ok: true
    }
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
