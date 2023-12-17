import { IsArray, IsDecimal, IsEnum, IsNumber, IsString, Validate } from "class-validator";
import { GenderProduct } from "../entities/product.entity";
import { ProductSize } from "../entities/productSize.entity";
import { Type } from "class-transformer";
import { Size } from "../entities/size.entity";

export class CreateProductDto {
    @IsString()
    title: string;

    @IsNumber()
    price: number;

    @IsString()
    description: string;

    @IsNumber()
    stock: number;

    @IsEnum(GenderProduct)
    gender: GenderProduct;

    @IsArray()
    sizes: number[];
}
