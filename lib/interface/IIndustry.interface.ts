export interface IIndustry {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string | null;
  name: string;
  sector: string;
  description: string;
}
