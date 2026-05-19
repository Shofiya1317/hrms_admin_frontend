import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IThemes } from '@/lib/interface/IThemes.interface';
import { LeaveTypeService } from '@/lib/service';import { btnName } from '@/lib/utils';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Form, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { boolean, number, object, string } from 'yup';

interface IFields {
  name: string;
  description: string;
  is_paid: boolean;
  is_encashable: boolean;
  requires_document: boolean;
  applicable_gender: string;
  is_system_type: boolean;
  max_consecutive_days: number | '';
  notice_days_required: number | '';
  id: string;
}

const TOGGLE_FIELDS: { key: keyof IFields; label: string }[] = [
  { key: 'is_paid', label: 'Paid Leave' },
  { key: 'is_encashable', label: 'Encashable' },
  { key: 'requires_document', label: 'Requires Document' },
  { key: 'is_system_type', label: 'System Type' },
];

export default function AddorEditLeaveType({
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
    is_paid: (currentModule as any)?.is_paid ?? false,
    is_encashable: (currentModule as any)?.is_encashable ?? false,
    requires_document: (currentModule as any)?.requires_document ?? false,
    applicable_gender: (currentModule as any)?.applicable_gender ?? 'all',
    is_system_type: (currentModule as any)?.is_system_type ?? false,
    max_consecutive_days: (currentModule as any)?.max_consecutive_days ?? '',
    notice_days_required: (currentModule as any)?.notice_days_required ?? '',
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
    is_paid: boolean(),
    is_encashable: boolean(),
    requires_document: boolean(),
    applicable_gender: string().required('Applicable Gender is required'),
    is_system_type: boolean(),
    max_consecutive_days: number()
      .min(1, 'Must be at least 1')
      .required('Max Consecutive Days is required'),
    notice_days_required: number()
      .min(0, 'Cannot be negative')
      .required('Notice Days Required is required'),
  });

  const toastMessage = () => {
    switch (actionType) {
      case 'Create':
        return 'Created Leave Type!';
      case 'Edit':
        return 'Updated Leave Type!';
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
      is_paid: values.is_paid,
      is_encashable: values.is_encashable,
      requires_document: values.requires_document,
      applicable_gender: values.applicable_gender,
      is_system_type: values.is_system_type,
      max_consecutive_days: values.max_consecutive_days,
      notice_days_required: values.notice_days_required,
    };

    switch (actionType) {
      case 'Create':
        res = await LeaveTypeService.create(params);
        toastAndCloseModal(res);
        return;
      case 'Edit':
        res = await LeaveTypeService.update(params, values?.id || '');
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
                placeholder="e.g. Casual Leave"
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
              <Form.Label className="fw-semibold">Applicable Gender</Form.Label>
              <Form.Select
                value={values.applicable_gender}
                onChange={(e) => setFieldValue('applicable_gender', e.target.value)}
                isInvalid={!!errors.applicable_gender}
              >
                <option value="all">All</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </Form.Select>
              {errors.applicable_gender && (
                <Form.Control.Feedback type="invalid">
                  {errors.applicable_gender}
                </Form.Control.Feedback>
              )}
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="max_consecutive_days"
                type="number"
                validationSchema={validationSchema}
                label="Max Consecutive Days"
                errors={errors as Record<string, string>}
                placeholder="e.g. 5"
              />
            </Col>
            <Col className="mt-3">
              <FormikField
                name="notice_days_required"
                type="number"
                validationSchema={validationSchema}
                label="Notice Days Required"
                errors={errors as Record<string, string>}
                placeholder="e.g. 2"
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col>
              <Form.Label className="fw-semibold">Options</Form.Label>
              <div className="d-flex flex-wrap gap-4">
                {TOGGLE_FIELDS.map(({ key, label }) => (
                  <Form.Check
                    key={key}
                    type="switch"
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
