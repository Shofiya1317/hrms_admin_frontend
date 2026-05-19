/* eslint-disable @typescript-eslint/no-explicit-any */

import Badge from '@/components/Badge/Badge';
import Filter from '@/components/Filter/Filter';
import InviteButton from '@/components/InviteButton/InviteButton';
import MasterFilter from '@/components/MasterList/MasterFilter/MasterFilter';
import DepartmentActionDropDown from '@/components/MasterList/Departments/DepartmentActionDropDown';
import DepartmentList from '@/components/MasterList/Departments/DepartmentList';
import DepartmentWrapper from '@/components/MasterList/Departments/DepartmentWrapper';
import IndustryActionDropDown from '@/components/MasterList/Industry/IndustryActionDropDown';
import IndustryList from '@/components/MasterList/Industry/IndustryList';
import IndustryWrapper from '@/components/MasterList/Industry/IndustryWrapper';
import EmployeeTypeActionDropDown from '@/components/MasterList/EmployeeType/EmployeeTypeActionDropDown';
import EmployeeTypeList from '@/components/MasterList/EmployeeType/EmployeeTypeList';
import EmployeeTypeWrapper from '@/components/MasterList/EmployeeType/EmployeeTypeWrapper';
import LeaveTypeActionDropDown from '@/components/MasterList/LeaveType/LeaveTypeActionDropDown';
import LeaveTypeList from '@/components/MasterList/LeaveType/LeaveTypeList';
import LeaveTypeWrapper from '@/components/MasterList/LeaveType/LeaveTypeWrapper';
import WorkShiftActionDropDown from '@/components/MasterList/WorkShift/WorkShiftActionDropDown';
import WorkShiftList from '@/components/MasterList/WorkShift/WorkShiftList';
import WorkShiftWrapper from '@/components/MasterList/WorkShift/WorkShiftWrapper';
import WorkScheduleActionDropDown from '@/components/MasterList/workSchedule/WorkScheduleActionDropDown';
import WorkScheduleList from '@/components/MasterList/workSchedule/WorkScheduleList';
import WorkScheduleWrapper from '@/components/MasterList/workSchedule/WorkScheduleWrapper';
import PageNotFound from '@/components/PageNotFound/PageNotFound';
import PageWrapper from '@/components/NavBarMenu/PageWrapper/PageWrapper';
import Pagination from '@/components/Pagination/Pagination';
import Search from '@/components/Search/Search';
import Sort from '@/components/Sort/Sort';
import SubNav from '@/components/SubNav/SubNav';
import { auth } from '@/lib/auth';
import { IDepartment } from '@/lib/interface/IDepartment.interface';
import { IEmploymentType } from '@/lib/interface/IEmploymentType.interface';
import { ILeaveType } from '@/lib/interface/ILeaveType.interface';
import { IWorkShift } from '@/lib/interface/IWorkShift.interface';
import { IWorkSchedule } from '@/lib/interface/IWorkSchedule.interface';
import { IMeta } from '@/lib/interface/IMeta.interface';
import {
  DepartmentService,
  EmploymentTypeService,
  IndustryService,
  LeaveTypeService,
  WorkShiftService,
  WorkScheduleService,
} from '@/lib/service';
import { convertToPascalCase, formatDateList, getStatusColor, Params } from '@/lib/utils';
import { IIndustry } from '@/lib/interface/IIndustry.interface';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  const session = await auth();
  const token = (session?.user as { accessToken: string })?.accessToken;

  const filterParams = {
    page: searchParams?.page || '1',
    limit: searchParams?.limit || '100',
    search: searchParams?.search || '',
    status: searchParams?.status || '',
    sort: searchParams?.sort || '-createdAt',
  };

  let metaList: IMeta = {
    currentCount: 0,
    currentPage: '1',
    currentLimit: '100',
    totalCount: 0,
  };

  async function RenderComponents() {
    switch (params?.slug) {
      case 'industry': {
        const res = await IndustryService.getAll(filterParams, token);
        const industries = (res?.data?.data || []) as IIndustry[];
        const meta = res?.data?.meta;
        if (meta) metaList = {
          totalCount: meta.totalCount ?? 0,
          currentCount: meta.currentCount ?? 0,
          currentPage: String(meta.currentPage ?? 1),
          currentLimit: String(meta.limit ?? meta.currentLimit ?? 100),
        };
        return (
          <>
            <IndustryWrapper>
              {industries.map((item) => (
                <tr key={item.id} className="tableHover">
                  <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                  <td>{item.sector || '-'}</td>
                  <td>{item.description || '-'}</td>
                  <td>{formatDateList(item.updatedAt)}</td>
                  <td>
                    <Badge
                      bg={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                      className={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', false)}
                    >
                      {item.is_deleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <IndustryActionDropDown theme={item} />
                  </td>
                </tr>
              ))}
            </IndustryWrapper>
            <IndustryList industries={industries} />
          </>
        );
      }
      case 'departments': {
        const res = await DepartmentService.getAll(filterParams, token);
        const departments = (res?.data?.data || []) as IDepartment[];
        const meta = res?.data?.meta;
        if (meta) metaList = {
          totalCount: meta.totalCount ?? 0,
          currentCount: meta.currentCount ?? 0,
          currentPage: String(meta.currentPage ?? 1),
          currentLimit: String(meta.limit ?? meta.currentLimit ?? 100),
        };
        return (
          <>
            <DepartmentWrapper>
              {departments.map((item) => (
                <tr key={item.id} className="tableHover">
                  <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                  <td>{formatDateList(item.updatedAt)}</td>
                  <td>
                    <Badge
                      bg={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                      className={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', false)}
                    >
                      {item.is_deleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <DepartmentActionDropDown theme={item as any} />
                  </td>
                </tr>
              ))}
            </DepartmentWrapper>
            <DepartmentList modules={departments as any} />
          </>
        );
      }
      case 'employee_type': {
        const res = await EmploymentTypeService.getAll(filterParams, token);
        const employmentTypes = (res?.data?.data || []) as IEmploymentType[];
        const meta = res?.data?.meta;
        if (meta) metaList = {
          totalCount: meta.totalCount ?? 0,
          currentCount: meta.currentCount ?? 0,
          currentPage: String(meta.currentPage ?? 1),
          currentLimit: String(meta.limit ?? meta.currentLimit ?? 100),
        };
        return (
          <>
            <EmployeeTypeWrapper>
              {employmentTypes.map((item) => (
                <tr key={item.id} className="tableHover">
                  <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                  <td>{item.description || '-'}</td>
                  <td>{formatDateList(item.updatedAt)}</td>
                  <td>
                    <Badge
                      bg={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                      className={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', false)}
                    >
                      {item.is_deleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <EmployeeTypeActionDropDown theme={item as any} />
                  </td>
                </tr>
              ))}
            </EmployeeTypeWrapper>
            <EmployeeTypeList modules={employmentTypes as any} />
          </>
        );
      }
      case 'leave_type': {
        const res = await LeaveTypeService.getAll(undefined, token);
        const leaveTypes = (Array.isArray(res?.data) ? res.data : res?.data?.data || []) as ILeaveType[];
        metaList = {
          totalCount: leaveTypes.length,
          currentCount: leaveTypes.length,
          currentPage: '1',
          currentLimit: String(leaveTypes.length || 100),
        };
        return (
          <>
            <LeaveTypeWrapper>
              {leaveTypes.map((item) => (
                <tr key={item.id} className="tableHover">
                  <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                  <td style={{ textTransform: 'capitalize' }}>{item.applicable_gender || 'All'}</td>
                  <td>
                    <Badge bg={item.is_paid ? 'success' : 'secondary'} className="">
                      {item.is_paid ? 'Paid' : 'Unpaid'}
                    </Badge>
                  </td>
                  <td>{item.max_consecutive_days ?? '-'}</td>
                  <td>
                    <Badge
                      bg={getStatusColor(item.is_active ? 'ACTIVE' : 'DELETED', true)}
                      className={getStatusColor(item.is_active ? 'ACTIVE' : 'DELETED', false)}
                    >
                      {item.is_active ? 'Active' : 'Inactive'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <LeaveTypeActionDropDown theme={item as any} />
                  </td>
                </tr>
              ))}
            </LeaveTypeWrapper>
            <LeaveTypeList modules={leaveTypes as any} />
          </>
        );
      }
      case 'work_shift': {
        const res = await WorkShiftService.getAll(filterParams, token);
        const shifts = (res?.data?.data || []) as IWorkShift[];
        const meta = res?.data?.meta;
        if (meta) metaList = {
          totalCount: meta.totalCount ?? 0,
          currentCount: meta.currentCount ?? 0,
          currentPage: String(meta.currentPage ?? 1),
          currentLimit: String(meta.limit ?? meta.currentLimit ?? 100),
        };
        return (
          <>
            <WorkShiftWrapper>
              {shifts.map((item) => (
                <tr key={item.id} className="tableHover">
                  <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                  <td>{item.start_time_24hr || item.start_time}</td>
                  <td>{item.end_time_24hr || item.end_time}</td>
                  <td>{item.working_hours} hrs</td>
                  <td>
                    <Badge
                      bg={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                      className={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', false)}
                    >
                      {item.is_deleted ? 'Deleted' : 'Active'}
                    </Badge>
                  </td>
                  <td className="text-center">
                    <WorkShiftActionDropDown theme={item as any} />
                  </td>
                </tr>
              ))}
            </WorkShiftWrapper>
            <WorkShiftList modules={shifts as any} />
          </>
        );
      }
      case 'work_schedule': {
        const res = await WorkScheduleService.getAll(undefined, token);
        const schedules = (Array.isArray(res?.data) ? res.data : res?.data?.data || []) as IWorkSchedule[];
        metaList = {
          totalCount: schedules.length,
          currentCount: schedules.length,
          currentPage: '1',
          currentLimit: String(schedules.length || 100),
        };
        return (
          <>
            <WorkScheduleWrapper>
              {schedules.map((item) => {
                const workingDays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday_week_1', 'sunday']
                  .filter((d) => item[d as keyof IWorkSchedule])
                  .map((d) => d.charAt(0).toUpperCase() + d.slice(1, 3))
                  .join(', ');
                return (
                  <tr key={item.id} className="tableHover">
                    <td style={{ textTransform: 'capitalize' }}>{item.name}</td>
                    <td>{workingDays || '-'}</td>
                    <td>{item.description || '-'}</td>
                    <td>{formatDateList(item.updated_at)}</td>
                    <td>
                      <Badge
                        bg={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', true)}
                        className={getStatusColor(item.is_deleted ? 'DELETED' : 'ACTIVE', false)}
                      >
                        {item.is_deleted ? 'Deleted' : 'Active'}
                      </Badge>
                    </td>
                    <td className="text-center">
                      <WorkScheduleActionDropDown theme={item as any} />
                    </td>
                  </tr>
                );
              })}
            </WorkScheduleWrapper>
            <WorkScheduleList modules={schedules as any} />
          </>
        );
      }
      default:
        return <PageNotFound />;
    }
  }

  return (
    <div>
      <SubNav activePage={params?.slug} />
      <PageWrapper
        stackComponent={
          <div className="d-flex align-items-center">
            <div className="desktop-search w-100 me-3">
              <Search params={filterParams as Params} />
            </div>
            <div className="desktop-search" style={{ minWidth: '200px' }}>
              <Sort params={filterParams as Params} />
            </div>
            <div className="common-sort ms-3">
              <Filter>
                <MasterFilter params={filterParams} slug={params?.slug} />
              </Filter>
            </div>
            <div className="mt-2 ms-2">
              <InviteButton
                btnName={convertToPascalCase(
                  params?.slug?.replace(/_/g, ' ') || '',
                )}
              />
            </div>
          </div>
        }
      >
        <div className="common-mobile-searchsection mb-3">
          <Search params={params as Params} />
        </div>
        {await RenderComponents()}
        <div className="my-4 pagination_padding">
          <Pagination
            meta={metaList}
            currentPage={searchParams?.page || '1'}
            component={convertToPascalCase(
              params?.slug?.replaceAll('_', ' ') || '',
            )}
          />
        </div>
      </PageWrapper>
    </div>
  );
}
