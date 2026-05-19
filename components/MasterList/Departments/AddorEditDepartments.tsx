'use client';

import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
import { DepartmentService } from '@/lib/service';
import { btnName } from '@/lib/utils';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

interface IFields {
  department_name: string;
  department_description: string;
  id: string;
}

export default function AddorEditDepartments({
  actionType,
  onClose,
  currentModule,
}: {
  actionType: ActionType;
  onClose?: () => void;
  currentModule?: IThemes | undefined;
}) {
  const router = useRouter();
  const initialValues = {
    department_name: currentModule?.name ?? '',
    department_description: currentModule?.description ?? '',
    id: currentModule?.id ?? '',
  };

  const validationSchema = object({
    department_name: string()
      .max(150, 'Department Name must be between 3 and 150 characters')
      .min(3, 'Department Name must be between 3 and 150 characters')
      .required('Department Name is required'),
    department_description: string()
      .max(5000, 'Department description must be between 3 and 5000 characters')
      .min(3, 'Department description must be between 3 and 5000 characters')
      .notRequired(),
  });

  const toastMessage = () => {
    switch (actionType) {
      case 'Create':
        return 'Created Departments!';
      case 'Edit':
        return 'Updated Departments!';
      default:
        return '';
    }
  };

  const toastAndCloseModal = (res: any) => {
    if (res?.status === 200 || res?.status === 201 || res?.data?.success) {
      toast.success(toastMessage());
      onClose?.();
      router.refresh();
    } else {
      const err = res?.data?.error || res?.data?.message || 'Something went wrong';
      toast.error(Array.isArray(err) ? err[0] : err);
    }
  };

  const onSubmit = async (
    values: IFields,
    { validateForm }: FormikHelpers<IFields>,
  ) => {
    await validateForm(values);
    let res;
    const params = {
      name: values.department_name,
      description: values.department_description,
    };

    switch (actionType) {
      case 'Create':
        res = await DepartmentService.create(params);
        toastAndCloseModal(res);
        return;
      case 'Edit':
        res = await DepartmentService.update(params, values?.id || '');
        toastAndCloseModal(res);
        return;
      default:
        // eslint-disable-next-line consistent-return
        return null;
    }
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      validateOnChange={false}
    >
      {({
        errors, handleSubmit, isSubmitting, resetForm,
      }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="department_name"
                type="text"
                validationSchema={validationSchema}
                label="Department Name"
                errors={errors as Record<string, string>}
                autoFocus
                placeholder="Department Name"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                as="textarea"
                name="department_description"
                type="text"
                validationSchema={validationSchema}
                label="Description"
                errors={errors as Record<string, string>}
                autoFocus
                placeholder="Enter your Description"
              />
            </Col>
          </Row>
          <Stack direction="horizontal" className="justify-content-end ">
            <Button
              className="my-4 py-2 btn-sm px-sm-4 Cancelbtn me-3"
              onClick={() => {
                onClose?.();
                resetForm();
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="my-4 py-2 btn-sm px-sm-4 savebtn"
              disabled={isSubmitting}
            >
              {btnName(isSubmitting, actionType)}
            </Button>
          </Stack>
        </form>
      )}
    </Formik>
  );
}
