import * as yup from 'yup';

export const issueValidationSchema = yup.object().shape({
  description: yup.string().required(),
  constituency_id: yup.string().nullable().required(),
  reporter_id: yup.string().nullable().required(),
});
