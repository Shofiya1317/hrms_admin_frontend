export interface IWorkShift {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string | null;
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  working_hours: number;
  start_time_24hr: string;
  end_time_24hr: string;
}
