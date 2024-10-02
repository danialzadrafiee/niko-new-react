import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useInvestStore from "../store/investStore";
import { CreateInvestData } from "@/types/invest";
import { handleError } from "@/utils/errorHandler";

const investValidationSchema = Yup.object().shape({
  fundraise_id: Yup.number().required("Fundraise is required"),
  amount: Yup.number().required("Amount is required").min(1, "Amount must be positive"),
  anonymous: Yup.boolean().required("Anonymous field is required"),
});

const useInvestForm = (fundraiseId: number) => {
  const { createInvest } = useInvestStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik<CreateInvestData>({
    initialValues: {
      fundraise_id: fundraiseId,
      amount: 0,
      anonymous: false,
    },
    validationSchema: investValidationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        await createInvest(values);
        // Reset form or redirect user after successful submission
      } catch (error) {
        handleError(error, "Failed to create investment");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return { formik, isSubmitting };
};

export default useInvestForm;