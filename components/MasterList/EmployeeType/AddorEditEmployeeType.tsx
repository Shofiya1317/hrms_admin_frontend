import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
import { EmploymentTypeService } from '@/lib/service';import { btnName } from '@/lib/utils';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

interface IFields {
  employment_type: string;
  description: string;
  id: string;
}

export default function AddorEditEmployeeType({
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
    employment_type: currentModule?.name ?? '',
    description: currentModule?.description ?? '',
    id: currentModule?.id ?? '',
  };

  const validationSchema = object({
    employment_type: string()
      .max(150, 'Module Name must be between 3 and 150 characters')
      .min(3, 'Module Name must be between 3 and 150 characters')
      .required('Module Name is required'),
    description: string()
      .max(5000, 'Module description must be between 3 and 5000 characters')
      .min(3, 'Module description must be between 3 and 5000 characters')
      .notRequired(),
  });

  const toastMessage = () => {
    switch (actionType) {
      case 'Create':
        return 'Created Modules!';
      case 'Edit':
        return 'Updated Modules!';
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
      name: values.employment_type,
      description: values.description,
    };

    switch (actionType) {
      case 'Create':
        res = await EmploymentTypeService.create({ name: values.employment_type, description: values.description });
        toastAndCloseModal(res);
        return;
      case 'Edit':
        res = await EmploymentTypeService.update({ name: values.employment_type, description: values.description }, values?.id || '');
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
                name="employment_type"
                type="text"
                validationSchema={validationSchema}
                label="Employment Type"
                errors={errors as Record<string, string>}
                autoFocus
                placeholder="Employment Type"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                as="textarea"
                name="description"
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
