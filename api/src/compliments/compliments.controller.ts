import { Controller, Get, Post, Patch, Param, Body } from '@nestjs/common';
import { ComplimentsService } from './compliments.service';
import {
  CreateComplimentDto,
  CreateComplimentsDto,
} from './dto/create-compliment.dto';

@Controller('compliments')
export class ComplimentsController {
  constructor(private readonly complimentsService: ComplimentsService) {}

  @Get('topic/:topicId')
  findUnusedByTopicId(@Param('topicId') topicId: string) {
    return this.complimentsService.findUnusedByTopicId(topicId);
  }

  @Post()
  create(@Body() createComplimentDto: CreateComplimentDto) {
    return this.complimentsService.create(createComplimentDto);
  }

  @Post('batch')
  createMany(@Body() createComplimentsDto: CreateComplimentsDto) {
    return this.complimentsService.createMany(createComplimentsDto);
  }

  @Patch(':id/used')
  markAsUsed(@Param('id') id: string) {
    return this.complimentsService.markAsUsed(id);
  }
}
