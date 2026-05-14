/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */

'use client';

import { useRouter } from 'next/navigation';
import AddorEditAccount from '../AddorEditAccount/AddorEditAccount';
import AddorEditUser from '../AddorEditUser/AddorEditUser';
import Button from '../Button/Button';
import AddorEditDepartments from '../MasterList/Departments/AddorEditDepartments';
import AddorEditIndustry from '../MasterList/Industry/AddorEditIndustry';
import AddorEditEmployeeType from '../MasterList/EmployeeType/AddorEditEmployeeType';
import AddorEditLeaveType from '../MasterList/LeaveType/AddorEditLeaveType';
import AddorEditWorkShift from '../MasterList/WorkShift/AddorEditWorkShift';
import AddorEditWorkSchedule from '../MasterList/workSchedule/AddorEditWorkSchedule';
import { useModal } from '../Modal/Context';

export default function InviteButton({ btnName }: { btnName: string }) {
  const router = useRouter();
  const hideModal = useModal({});
  const closeModal = () => {
    router.refresh();
    hideModal();
  };
  // eslint-disable-next-line react/no-unstable-nested-components
  function RenderComponents() {
    switch (btnName) {
      case 'User':
        return (
          <AddorEditUser
            actionType="Invite"
            onClose={closeModal}
            currentUser={undefined}
          />
        );
      case 'Account':
        return <AddorEditAccount onClose={closeModal} actionType="Invite" />;
      case 'Departments':
        return <AddorEditDepartments actionType="Create" onClose={closeModal} />;
      case 'Industry':
        return <AddorEditIndustry actionType="Create" onClose={closeModal} />;
      case 'Employee Type':
        return <AddorEditEmployeeType actionType="Create" onClose={closeModal} />;
      case 'Leave Type':
        return <AddorEditLeaveType actionType="Create" onClose={closeModal} />;
      case 'Work Shift':
        return <AddorEditWorkShift actionType="Create" onClose={closeModal} />;
      case 'Work Schedule':
        return <AddorEditWorkSchedule actionType="Create" onClose={closeModal} />;
      default:
        return <div>Access not provided</div>;
    }
  }

  const buttonName = () => {
    switch (btnName) {
      case 'User':
      case 'Account':
        return 'Invite';
      default:
        return 'Create';
    }
  };

  const modal = useModal({
    style: {
      size: 'sm',
      title: `${buttonName()} ${btnName}`,
    },
    content: RenderComponents(),
  });

  return (
    <Button
      className="mb-2 btn-sm px-sm-4 savebtn"
      onClick={() => modal()}
    >
      {`+ ${buttonName()} ${btnName}`}
    </Button>
  );
}
