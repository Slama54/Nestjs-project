/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Patch, Param,  ParseIntPipe, Post,  UsePipes, Delete, Query } from '@nestjs/common';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { ParseIdPipe } from './pipes/parseIdppipe';
import { ZodValidationPipe } from './pipes/zodValidationPipe';
import { createPropertySchema } from './dto/createPropertyZod.dto';

import { PropertyService } from './property.service';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PaginationDTO } from './dto/pagination.dto';



@Controller('property')
export class PropertyController {
    
    constructor(private propertyService : PropertyService){


        //this.propertyService =new PropertyService()
        // this.propertyService = propertyService
    }


    @Get()
    findAll(@Query() paginationDTO : PaginationDTO){
       return this.propertyService.findAll(paginationDTO);
    }
    @Get(":id")
    findOne(@Param("id",ParseIntPipe) id ) {
        
        
        return this.propertyService.findOne(id);
    }
    @Post()
    @UsePipes(new ZodValidationPipe(createPropertySchema))
    create(
        @Body() 
            dto :CreatePropertyDto){
                return this.propertyService.create(dto);
    }
    @Patch(":id")  
    update(
    @Param("id",ParseIdPipe)  id,
    @Body() 
        body : UpdatePropertyDto,
        )
    {
        return this.propertyService.update(id, body);
    }
    @Delete(":id")
    delete( @Param("id",ParseIdPipe)  id,){
        return this.propertyService.delete(id);
        
    }
}


