export class Meeting {
  id?: number;
  title!: string;
  name!: string;
  startDate!: Date;
  endDate!: Date;
  status!: string;
  priority!: string;
  notes?: string;
  roomId!: number;
}
