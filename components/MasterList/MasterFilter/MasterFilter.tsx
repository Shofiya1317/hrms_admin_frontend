'use client';

import Button from '@/components/Button/Button';
import FilterHeader from '@/components/Filter/FilterHeader';
import { Params, resetFilter } from '@/lib/utils';
import { Form, Formik } from 'formik';
import { usePathname, useRouter } from 'next/navigation';

export default function MasterFilter({
  params,
  onCancel,
  slug,
}: {
  params: Params;
  onCancel?: () => void;
  slug: string;
}) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Formik initialValues={{}} onSubmit={() => {}}>
      {({ resetForm }) => (
        <>
          <FilterHeader resetButton={() => resetFilter(router, resetForm, pathname)} />
          <Form>
            <div className="d-flex justify-content-between mt-4 px-5">
              <Button
                onClick={() => {
                  onCancel?.();
                  resetFilter(router, resetForm, pathname);
                }}
                className="my-4 py-2 btn-sm px-sm-4 Cancelbtn me-3"
              >
                Cancel
              </Button>
              <Button type="submit" className="my-4 py-2 btn-sm px-sm-4 savebtn">
                Apply
              </Button>
            </div>
          </Form>
        </>
      )}
    </Formik>
  );
}
