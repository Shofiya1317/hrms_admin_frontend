'use client';

import BlockOrUnblockOrDelete from '@/components/BlockOrUnblockOrDelete/BlockOrUnblockOrDelete';
import Dropdown from '@/components/Dropdown/DropDown';
import { useModal } from '@/components/Modal/Context';
import { ActionType } from '@/components/types';
import { IIndustry } from '@/lib/interface/IIndustry.interface';
import { IndustryService } from '@/lib/service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import AddorEditIndustry from './AddorEditIndustry';

export default function IndustryActionDropDown({ theme }: { theme?: IIndustry }) {
  const router = useRouter();
  const [actionType, setActionType] = useState<ActionType>(null);
  const [current, setCurrent] = useState<IIndustry>();

  const hideModal = useModal({});
  const closeModal = () => {
    hideModal();
    setActionType(null);
    setCurrent(undefined);
  };

  const modal = useModal({
    style: { size: 'sm', title: `${actionType} Industry` },
    content: (
      <AddorEditIndustry
        actionType={actionType}
        onClose={closeModal}
        currentModule={current}
      />
    ),
  });

  const handleConfirm = async () => {
    if (!current?.id) return;
    const response = await IndustryService.deleteIndustry(current.id);
    if (response?.status === 200 || response?.status === 201 || response?.data?.success) {
      toast.success('Industry Deleted');
      hideModal();
      setCurrent(undefined);
      setActionType(null);
      router.refresh();
    } else {
      const err = response?.data?.error || response?.data?.message || 'Something went wrong';
      toast.error(Array.isArray(err) ? err[0] : err);
    }
  };

  const deleteModal = useModal({
    style: { size: 'sm', title: 'Delete Industry' },
    content: (
      <BlockOrUnblockOrDelete
        actionType={actionType}
        onConfirm={handleConfirm}
        onClose={closeModal}
        deleteText="Are you sure you want to delete this Industry?"
      />
    ),
  });

  useEffect(() => {
    switch (actionType) {
      case 'Edit':
        modal();
        break;
      case 'Delete':
        deleteModal();
        break;
      default:
        break;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, actionType]);

  return (
    <Dropdown>
      <ul className="dropdown_section row">
        <li
          aria-hidden
          className="dropdown_item px-4"
          onClick={() => { setActionType('Edit'); setCurrent(theme); }}
        >
          Edit
        </li>
        <li
          aria-hidden
          className="dropdown_item px-4"
          onClick={() => { setActionType('Delete'); setCurrent(theme); }}
        >
          Delete
        </li>
      </ul>
    </Dropdown>
  );
}
