import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateSizeDto } from '../dto/create-size.dto';
import { SizesService } from '../services/sizes.service';

@Controller('sizes')
export class SizesController {

    constructor(
        private readonly sizesService: SizesService
    ) { }

    @Post()
    async create(
        @Body() createSizeDto: CreateSizeDto
    ) {

        const existSize = await this.sizesService.findBySize(createSizeDto.size);

        if (existSize) {
            return { message: 'Size already exists' };
        }

        await this.sizesService.create(createSizeDto);
        return { message: 'Size created successfully' };
    }

    @Get()
    async getAll() {
        return await this.sizesService.getAll();
    }

    @Get('products/:size_id')
    async getAllProductsBySize(
        @Param('size_id') size_id: number
    ) {
        return await this.sizesService.getAllProductsBySize(
            size_id
        );
    }
}
