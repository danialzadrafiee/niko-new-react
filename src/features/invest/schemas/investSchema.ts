// src/features/invest/schemas/investSchema.ts
import * as Yup from 'yup';

export const investValidationSchema = Yup.object().shape({
  amount: Yup.number().required('Amount is required').min(1, 'Amount must be positive'),
  anonymous: Yup.boolean().required('Anonymous field is required'),
});

export const investInitialValues = {
  amount: 0,
  anonymous: false,
};