import { Room } from "../models/room.model";
import { RoomRepository } from "../repositories/room.repository";

export class RoomService {
	private roomRepository: RoomRepository;

  constructor() {
    this.roomRepository = new RoomRepository();
  }

  getAllRooms(): Promise<Room[]> {
    return this.roomRepository.getAll();
  }
}