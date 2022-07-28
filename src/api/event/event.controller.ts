import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { EventDto } from './dto/Event.dto';
import { EventsDto } from './dto/Events.dto';
import { EventService } from './event.service';


@Controller('event')
export class EventsController {
  @Inject(EventService)
  private readonly service: EventService;

  @Get()
  public getEvents(@Body() dto: EventsDto) {
    return this.service.getEvents(dto);
  }

  @Get(':id')
  public getEvent(@Param('id', ParseIntPipe) id: number) {
    return this.service.getEvent(id);
  }

  @Post('update/:id')
  @UseGuards(AuthGuard('jwt'))
  public updateEvent(@Body() dto: EventDto, @Param('id', ParseIntPipe) id: number) {
    return this.service.updateEvent(dto, id);
  }

  @Post('create')
  @UseGuards(AuthGuard('jwt'))
  public createEvent(@Body() dto: EventDto) {
    return this.service.createEvent(dto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  public deleteEvent(@Param('id', ParseIntPipe) id: number) {
    return this.service.deleteEvent(id);
  }
}