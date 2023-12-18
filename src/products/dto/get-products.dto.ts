import { Type } from "class-transformer";
import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class GetProductsDto {
    
    @IsPositive()
    @Type(() => Number)
    page: number;

    @IsPositive()
    @Type(() => Number)
    @IsNumber()
    perpage: number;

    @IsOptional()
    @IsString()
    search: string;
}