export interface ILeaveType {
  id: string;
  createdAt: string;
  updatedAt: string;
  is_deleted: boolean;
  deleted_at: string | null;
  code: string;
  name: string;
  description: string;
  is_paid: boolean;
  is_encashable: boolean;
  requires_document: boolean;
  applicable_gender: string | null;
  is_system_type: boolean;
  max_consecutive_days: number | null;
  notice_days_required: number | null;
  is_active: boolean;
}
