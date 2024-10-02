import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { investValidationSchema, investInitialValues } from "@/features/invest/schemas/investSchema"

interface InvestFormProps {
  onSubmit: (values: typeof investInitialValues, actions: any) => Promise<void>
}

const InvestForm: React.FC<InvestFormProps> = ({ onSubmit }) => {
  return (
    <Formik initialValues={investInitialValues} validationSchema={investValidationSchema} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <div className="flex gap-4">
            <div className="grid shrink-0">
              <div className="text-sm">من قصد دارم</div>
              <div className="font-semibold">تا به میزان</div>
            </div>
            <Field type="number" name="amount" className="rounded-xl input-bordered input w-full flex items-center justify-center text-center" />
            <img src="/img/tooman.svg" className="size-[40px]" alt="Currency" />
          </div>
          <ErrorMessage name="amount" component="div" className="text-error mt-1" />
          <button type="submit" className="btn-primary w-full btn mt-2" disabled={isSubmitting}>
            {isSubmitting ? <span className="loading loading-spinner"></span> : "حمایت کنم"}
          </button>
        </Form>
      )}
    </Formik>
  )
}

export default InvestForm
