export interface Meeting {
  id?: number;
  title: string;
  name: string;
  startDate: Date;
  endDate: Date;
  status: Status;
  priority: Priority;
  notes: string;
  roomId: number;
  room?: Room;
}

export interface Room {
  id: number;
  name: string;
  capacity: number;
  type: string;
}

export enum Status {
  Scheduled = 'Scheduled',
  Ongoing = 'Ongoing',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

export enum Priority {
  High = 'High',
  Medium = 'Medium',
  Low = 'Low'
}

