import { Request, Response } from "express";
import { RoomService } from "../services/room.service";

export class RoomController {
	private roomService: RoomService;

	constructor() {
    this.roomService = new RoomService();
  }

	async getAllRooms(req: Request, res: Response): Promise<void> {
		try {
      const rooms = await this.roomService.getAllRooms();
      res.json(rooms);
    } catch (err) {
      res.status(500).json({ error: 'Failed to retrieve rooms' });
    }
	}
}