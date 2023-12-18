import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Size } from './entities/size.entity';
import { ProductSize } from './entities/productSize.entity';
import { SizesService } from './services/sizes.service';
import { SizesController } from './controllers/sizes.controller';
import { ProductImage } from './entities/productImage.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Product,
      Size,
      ProductSize,
      ProductImage
    ]),
  ],
  controllers: [ProductsController, SizesController],
  providers: [ProductsService, SizesService],
})
export class ProductsModule { }
