import { Controller, Get, Post, Put, Delete, Body, Param, Request, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('events')
@UseGuards(JwtAuthGuard)
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() body: CreateEventDto, @Request() req) {
    return this.eventsService.create(body, req.user.id);
  }

  @Get()
  findAll(@Request() req) {
    return this.eventsService.findAll(req.user.id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() body: UpdateEventDto, @Request() req) {
    return this.eventsService.update(+id, body, req.user.id);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.eventsService.delete(+id, req.user.id);
  }
}