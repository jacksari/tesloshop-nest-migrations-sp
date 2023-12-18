import { Controller, Get, Post, Body, Patch, Param, Delete, NotFoundException, HttpException, Query, Res, HttpStatus, UseInterceptors } from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { GetProductsDto } from '../dto/get-products.dto';
import { Response } from 'express';
import { ResponseInterceptor } from 'src/interceptors/response.interceptor';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService
  ) { }

  @Post()

  async create(@Body() createProductDto: CreateProductDto) {

    const existProduct = await this.productsService.existTitle(createProductDto.title);

    if (existProduct) {
      throw new HttpException('Producto ya existe', 400);
    }

    const productSave = await this.productsService.create(createProductDto);
    return productSave;
  }

  @Get()
  @UseInterceptors(ResponseInterceptor)
  findAll(
    @Query() getProductsDto: GetProductsDto,
  ) {
    return this.productsService.findProducts(getProductsDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {

    const product = await this.productsService.findOne(+id);

    if (!product) {
      throw new NotFoundException('Producto no existe');
    }

    return this.productsService.remove(+id);
  }

}
