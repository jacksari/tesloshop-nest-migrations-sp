import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSizeDto } from '../dto/create-size.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Size } from '../entities/size.entity';

@Injectable()
export class SizesService {

    constructor(
        @InjectRepository(Size)
        private readonly sizesRepository: Repository<Size>
    ) { }

    async create(createSizeDto: CreateSizeDto) {
       return await this.sizesRepository.save(createSizeDto);
    }

    async findBySize(size: string) {
        return await this.sizesRepository.findOne({ where: { size } });
    }

    async getAll() {
        return await this.sizesRepository.find();
    }
}
