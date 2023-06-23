import * as yup from 'yup';

export const constituencyValidationSchema = yup.object().shape({
  name: yup.string().required(),
  coordinator_id: yup.string().nullable().required(),
});
