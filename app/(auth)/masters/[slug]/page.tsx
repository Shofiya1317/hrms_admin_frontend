/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */

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
import { IMeta } from '@/lib/interface/IMeta.interface';
import { unstable_noStore as noStore } from 'next/cache';
import { convertToPascalCase, Params } from '@/lib/utils';

export const dynamic = 'force-dynamic';

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: any;
}) {
  noStore();

  const filterParams = {
    page: searchParams?.page || '1',
    limit: searchParams?.limit || '50',
    search: searchParams?.search || '',
    status: searchParams?.status || '',
    sort: searchParams?.sort || '-createdAt',
  };

  const metaList: IMeta = {
    currentCount: 0,
    currentPage: '1',
    currentLimit: '50',
    totalCount: 0,
  };

  function RenderComponents() {
    switch (params?.slug) {
      case 'industry':
        return (
          <>
            <IndustryWrapper>{null}</IndustryWrapper>
            <IndustryList industries={[]} />
          </>
        );
      case 'departments':
        return (
          <>
            <DepartmentWrapper>{null}</DepartmentWrapper>
            <DepartmentList modules={[]} />
          </>
        );
      case 'employee_type':
        return (
          <>
            <EmployeeTypeWrapper>{null}</EmployeeTypeWrapper>
            <EmployeeTypeList modules={[]} />
          </>
        );
      case 'leave_type':
        return (
          <>
            <LeaveTypeWrapper>{null}</LeaveTypeWrapper>
            <LeaveTypeList modules={[]} />
          </>
        );
      case 'work_shift':
        return (
          <>
            <WorkShiftWrapper>{null}</WorkShiftWrapper>
            <WorkShiftList modules={[]} />
          </>
        );
      case 'work_schedule':
        return (
          <>
            <WorkScheduleWrapper>{null}</WorkScheduleWrapper>
            <WorkScheduleList modules={[]} />
          </>
        );
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
        {RenderComponents()}
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
