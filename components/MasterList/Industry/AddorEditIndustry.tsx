'use client';

import Button from '@/components/Button/Button';
import { FormikField } from '@/components/FormikField/FormikField';
import { ActionType } from '@/components/types';
import { IIndustry } from '@/lib/interface/IIndustry.interface';
import { IndustryService } from '@/lib/service';
import { btnName } from '@/lib/utils';
import { Formik, FormikHelpers } from 'formik';
import { useRouter } from 'next/navigation';
import { Col, Row, Stack } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { object, string } from 'yup';

interface IFields {
  name: string;
  sector: string;
  description: string;
  id: string;
}

export default function AddorEditIndustry({
  actionType,
  onClose,
  currentModule,
}: {
  actionType: ActionType;
  onClose?: () => void;
  currentModule?: IIndustry | undefined;
}) {
  const router = useRouter();

  const initialValues: IFields = {
    name: currentModule?.name ?? '',
    sector: currentModule?.sector ?? '',
    description: currentModule?.description ?? '',
    id: currentModule?.id ?? '',
  };

  const validationSchema = object({
    name: string()
      .min(3, 'Industry Name must be at least 3 characters')
      .max(150, 'Industry Name must be at most 150 characters')
      .required('Industry Name is required'),
    sector: string()
      .min(2, 'Sector must be at least 2 characters')
      .required('Sector is required'),
    description: string().notRequired(),
  });

  const toastMessage = () => (actionType === 'Create' ? 'Industry Created!' : 'Industry Updated!');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  const onSubmit = async (values: IFields, { validateForm }: FormikHelpers<IFields>) => {
    await validateForm(values);
    const params = {
      name: values.name,
      sector: values.sector,
      description: values.description,
    };
    let res;
    switch (actionType) {
      case 'Create':
        res = await IndustryService.create(params);
        toastAndCloseModal(res);
        return;
      case 'Edit':
        res = await IndustryService.update(params, values.id);
        toastAndCloseModal(res);
        return;
      default:
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
      {({ errors, handleSubmit, isSubmitting, resetForm }) => (
        <form onSubmit={handleSubmit}>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="name"
                type="text"
                validationSchema={validationSchema}
                label="Industry Name"
                errors={errors as Record<string, string>}
                autoFocus
                placeholder="e.g. Information Technology"
              />
            </Col>
          </Row>
          <Row>
            <Col className="mt-3">
              <FormikField
                name="sector"
                type="text"
                validationSchema={validationSchema}
                label="Sector"
                errors={errors as Record<string, string>}
                placeholder="e.g. Technology"
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
          <Stack direction="horizontal" className="justify-content-end">
            <Button
              className="my-4 py-2 btn-sm px-sm-4 Cancelbtn me-3"
              onClick={() => { onClose?.(); resetForm(); }}
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
