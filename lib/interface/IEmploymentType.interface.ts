export interface IEmploymentType {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string | null;
  name: string;
  description: string;
}
