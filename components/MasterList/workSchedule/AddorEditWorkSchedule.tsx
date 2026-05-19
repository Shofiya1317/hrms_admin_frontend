import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
import { WorkScheduleService } from '@/lib/service';import { btnName } from '@/lib/utils';
import { Field, Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { boolean, object, string } from 'yup';

interface IFields {
  name: string;
  description: string;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday_week_1: boolean;
  saturday_week_2: boolean;
  saturday_week_3: boolean;
  saturday_week_4: boolean;
  saturday_week_5: boolean;
  sunday: boolean;
  id: string;
}

const DAY_FIELDS: { key: keyof IFields; label: string }[] = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'sunday', label: 'Sunday' },
];

const SATURDAY_FIELDS: { key: keyof IFields; label: string }[] = [
  { key: 'saturday_week_1', label: 'Week 1' },
  { key: 'saturday_week_2', label: 'Week 2' },
  { key: 'saturday_week_3', label: 'Week 3' },
  { key: 'saturday_week_4', label: 'Week 4' },
  { key: 'saturday_week_5', label: 'Week 5' },
];

export default function AddorEditWorkSchedule({
  actionType,
  onClose,
  currentModule,
}: {
  actionType: ActionType;
  onClose?: () => void;
  currentModule?: IThemes | undefined;
}) {
  const router = useRouter();

  const initialValues: IFields = {
    name: currentModule?.name ?? '',
    description: currentModule?.description ?? '',
    monday: (currentModule as any)?.monday ?? false,
    tuesday: (currentModule as any)?.tuesday ?? false,
    wednesday: (currentModule as any)?.wednesday ?? false,
    thursday: (currentModule as any)?.thursday ?? false,
    friday: (currentModule as any)?.friday ?? false,
    saturday_week_1: (currentModule as any)?.saturday_week_1 ?? false,
    saturday_week_2: (currentModule as any)?.saturday_week_2 ?? false,
    saturday_week_3: (currentModule as any)?.saturday_week_3 ?? false,
    saturday_week_4: (currentModule as any)?.saturday_week_4 ?? false,
    saturday_week_5: (currentModule as any)?.saturday_week_5 ?? false,
    sunday: (currentModule as any)?.sunday ?? false,
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
    monday: boolean(),
    tuesday: boolean(),
    wednesday: boolean(),
    thursday: boolean(),
    friday: boolean(),
    saturday_week_1: boolean(),
    saturday_week_2: boolean(),
    saturday_week_3: boolean(),
    saturday_week_4: boolean(),
    saturday_week_5: boolean(),
    sunday: boolean(),
  });

  const toastMessage = () => {
    switch (actionType) {
      case 'Create':
        return 'Created Work Schedule!';
      case 'Edit':
        return 'Updated Work Schedule!';
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
      name: values.name,
      description: values.description,
      monday: values.monday,
      tuesday: values.tuesday,
      wednesday: values.wednesday,
      thursday: values.thursday,
      friday: values.friday,
      saturday_week_1: values.saturday_week_1,
      saturday_week_2: values.saturday_week_2,
      saturday_week_3: values.saturday_week_3,
      saturday_week_4: values.saturday_week_4,
      saturday_week_5: values.saturday_week_5,
      sunday: values.sunday,
    };

    switch (actionType) {
      case 'Create':
        res = await WorkScheduleService.create(params);
        toastAndCloseModal(res);
        return;
      case 'Edit':
        res = await WorkScheduleService.update(params, values?.id || '');
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
        errors, handleSubmit, isSubmitting, resetForm, values, setFieldValue,
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
                placeholder="e.g. 5-Day Week"
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

          <Row className="mt-3">
            <Col>
              <Form.Label className="fw-semibold">Working Days</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {DAY_FIELDS.map(({ key, label }) => (
                  <Form.Check
                    key={key}
                    type="checkbox"
                    id={key}
                    label={label}
                    checked={values[key] as boolean}
                    onChange={(e) => setFieldValue(key, e.target.checked)}
                  />
                ))}
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col>
              <Form.Label className="fw-semibold">Saturday Working Weeks</Form.Label>
              <div className="d-flex flex-wrap gap-3">
                {SATURDAY_FIELDS.map(({ key, label }) => (
                  <Form.Check
                    key={key}
                    type="checkbox"
                    id={key}
                    label={label}
                    checked={values[key] as boolean}
                    onChange={(e) => setFieldValue(key, e.target.checked)}
                  />
                ))}
              </div>
            </Col>
          </Row>

          <Stack direction="horizontal" className="justify-content-end">
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
