import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventDto } from './dto/Event.dto';
import { EventsDto } from './dto/Events.dto';
import { Event } from './event.entity';

@Injectable()
export class EventService {
  @InjectRepository(Event)
  private readonly repository: Repository<Event>;

  async createEvent(dto: EventDto) {
      // const event = await this.repository.findOne({
      //   where: {
      //     eventName: dto.eventName,
      //   },
      // });
      // if (event) {
      //   throw new ForbiddenException(
      //     'Event already exists!',
      //   );
      // }
      try {
        const date = new Date(dto.date);
        dto.date = date;
        return {
            status: 200,
            message: "Event successfully created!",
            event: await this.repository.save(dto)
    }
      } catch (error) {
        return {
            status: 400,
            message: "Event can't be stored!"
        }
      };
  }

  async getEvent(id: any): Promise<any> {
    const event = await this.repository.findOne({
      where: {
        id: id,
      },
    });

    if (event) {
      return event;
    } 
    return {
      status: 400,
      message: `Event with id: ${id} does not exist!`
    }
  }

  async getEvents(dto: EventsDto) {
    const events = await this.repository.findAndCount({
      skip: (dto.page - 1) * 20,
      take: 20,
      order: {
          date: "ASC"
      }
  });
    if (events) {
      return events;
    }
    return {
      status: 400,
      message: `Event list is empty!`
    }
  }

  async deleteEvent(id: number) {
    const event = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!event) {
      return {
        status: 400,
        message: `Event with id: ${id} does not exist!`
      }
    }
    try {
      await this.repository.delete(id);
      return {
        status: 200,
        message: `Successfully deleted event with id: ${id}`
      }
    } catch (error) {
      return {
        status: 400,
        message: error
      }
    }
  }

  async updateEvent(dto: EventDto, id: number) {
    const event = await this.repository.findOne({
      where: {
        id: id,
      },
    });
    if (!event) {
      return {
        status: 400,
        message: `Event with id: ${id} does not exist!`
      }
    }
    event.eventName = dto.eventName;
    event.description = dto.description;
    event.photo = dto.photo;
    event.city = dto.city;
    event.address = dto.address;
    event.destinationName = dto.destinationName;
    event.date = new Date(dto.date);
    try {
      return this.repository.save(event);
    } catch (error) {
      return {
        status: 400,
        message: error
      }
    }
  }
}