'use client';

import BlockOrUnblockOrDelete from '@/components/BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import Dropdown from '@/components/Dropdown/DropDown';
import { useModal } from '@/components/Modal/Context';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
import { LeaveTypeService } from '@/lib/service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddorEditLeaveType from './AddorEditLeaveType';

export default function LeaveTypeActionDropDown({
  theme,
}: {
  theme?: IThemes;
}) {
  const router = useRouter();
  const [actionType, setActionType] = useState<ActionType>(null);
  const [currentTheme, setCurrentTheme] = useState<IThemes>();

  const hideModal = useModal({});
  const closeMoal = () => {
    hideModal();
    setActionType(null);
    setCurrentTheme(undefined);
  };
  const modal = useModal({
    style: {
      size: 'sm',
      title: `${actionType} Module`,
    },
    content: (
      <AddorEditLeaveType
        actionType={actionType}
        onClose={closeMoal}
        currentModule={currentTheme}
      />
    ),
  });

  const handleConfirm = async () => {
    if (!currentTheme || !currentTheme.id) return;
    const response = await LeaveTypeService.deleteLeaveType(currentTheme.id);
    if (response?.status === 200 || response?.status === 201 || response?.data?.success) {
      toast.success('Leave Type Deleted');
      hideModal();
      setCurrentTheme(undefined);
      setActionType(null);
      router.refresh();
    } else {
      const err = response?.data?.error || response?.data?.message || 'Something went wrong';
      toast.error(Array.isArray(err) ? err[0] : err);
    }
  };

  const deleteOrActive = useModal({
    style: {
      size: 'sm',
      title: `${actionType} Module`,
    },
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={handleConfirm}
        onClose={closeMoal}
        deleteText={`Are you sure you want to ${actionType?.toLocaleLowerCase()} this Module ?`}
      />
    ),
  });

  useEffect(() => {
    if (!currentTheme && actionType === 'Invite') {
      modal();
    }
    switch (actionType) {
      case 'Edit':
        modal();
        break;
      case 'DeleteIndustry':
        break;
      case 'Activate':
      case 'Delete':
        deleteOrActive();
        break;
      default:
        break;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTheme, actionType]);

  return (
    <Dropdown>
      <ul className="dropdown_section row">
        <li
          aria-hidden
          className="dropdown_item px-4"
          onClick={() => {
            setActionType('Edit');
            setCurrentTheme(theme);
          }}
        >
          Edit
        </li>
        <li
          aria-hidden
          className="dropdown_item px-4"
          onClick={() => {
            setActionType('Delete');
            setCurrentTheme(theme);
          }}
        >
          Delete
        </li>
      </ul>
    </Dropdown>
  );
}
