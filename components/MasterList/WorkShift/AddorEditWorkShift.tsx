import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
// import { ThemeService } from '@/lib/service';
import { btnName } from '@/lib/utils';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { number, object, string } from 'yup';

interface IFields {
  name: string;
  description: string;
  start_time: string;
  end_time: string;
  working_hours: number | '';
  id: string;
}

export default function AddorEditModules({
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
    name: currentModule?.name ?? '',
    description: currentModule?.description ?? '',
    start_time: '',
    end_time: '',
    working_hours: '' as number | '',
    id: currentModule?.id ?? '',
  };

  const validationSchema = object({
    name: string()
      .max(150, 'Name must be between 3 and 150 characters')
      .min(3, 'Name must be between 3 and 150 characters')
      .required('Name is required'),
    description: string()
      .max(5000, 'Description must be between 3 and 5000 characters')
      .min(3, 'Description must be between 3 and 5000 characters')
      .notRequired(),
    start_time: string().required('Start Time is required'),
    end_time: string().required('End Time is required'),
    working_hours: number()
      .min(1, 'Working hours must be at least 1')
      .max(24, 'Working hours cannot exceed 24')
      .required('Working Hours is required'),
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toastAndCloseModal = (res: any) => {
    const { success, error } = res?.data as {
      success: boolean;
      error: string[];
    };
    if (success) {
      toast.success(toastMessage());
      onClose?.();
      router.refresh();
    } else {
      toast.error(error[0]);
    }
  };

  const onSubmit = async (
    values: IFields,
    { validateForm }: FormikHelpers<IFields>,
  ) => {
    await validateForm(values);
    let res;
    const params = {
      name: values.name,
      description: values.description,
      start_time: values.start_time,
      end_time: values.end_time,
      working_hours: values.working_hours,
    };

    switch (actionType) {
      // case 'Create':
      //   res = await ThemeService.create(params);
      //   toastAndCloseModal(res);
      //   return;
      // case 'Edit':
      //   res = await ThemeService.update(params, values?.id || '');
      //   toastAndCloseModal(res);
      //   return;
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
                name="name"
                type="text"
                validationSchema={validationSchema}
                label="Name"
                errors={errors as Record<string, string>}
                autoFocus
                placeholder="e.g. Morning Shift"
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
                placeholder="Enter Description"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="start_time"
                type="time"
                validationSchema={validationSchema}
                label="Start Time"
                errors={errors as Record<string, string>}
              />
            </Col>
            <Col className="mt-3">
              <FormikField
                name="end_time"
                type="time"
                validationSchema={validationSchema}
                label="End Time"
                errors={errors as Record<string, string>}
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="working_hours"
                type="number"
                validationSchema={validationSchema}
                label="Working Hours"
                errors={errors as Record<string, string>}
                placeholder="e.g. 8"
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
