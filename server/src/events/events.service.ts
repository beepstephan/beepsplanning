import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from '../entities/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  ) {}

  async create(eventData: CreateEventDto, userId: number) {
    const event = this.eventRepository.create({ ...eventData, user: { id: userId } });
    return this.eventRepository.save(event);
  }

  async findAll(userId: number) {
    return this.eventRepository.find({ where: { user: { id: userId } } });
  }

  async update(id: number, eventData: UpdateEventDto, userId: number) {
    const event = await this.eventRepository.findOne({ where: { id, user: { id: userId } } });
    if (!event) throw new NotFoundException('Event not found');
    Object.assign(event, eventData);
    return this.eventRepository.save(event);
  }

  async delete(id: number, userId: number) {
    const event = await this.eventRepository.findOne({ where: { id, user: { id: userId } } });
    if (!event) throw new NotFoundException('Event not found');
    await this.eventRepository.remove(event);
    return { message: 'Event deleted' };
  }
}