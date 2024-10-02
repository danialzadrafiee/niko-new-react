import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import { useLoginForm } from "@/features/auth/hooks/useLoginForm"
import { Button } from "@/components/ui/button"

const AuthLoginForm: React.FC = () => {
  const { initialValues, validationSchema, handleAuth } = useLoginForm()

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleAuth}>
      {({ values, handleChange, handleBlur }) => (
        <Form className="space-y-4">
          <div>
            <Field name="phone" type="tel" placeholder="Phone number" className="w-full p-2 border rounded" value={values.phone} onChange={handleChange} onBlur={handleBlur} disabled />
          </div>
          <div>
            <Field name="password" type="password" placeholder="Password" className="w-full p-2 border rounded" value={values.password} onChange={handleChange} onBlur={handleBlur} />
            <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
          </div>
          <Button type="submit" className="w-full" variant="primary">
            ورود
          </Button>
        </Form>
      )}
    </Formik>
  )
}

export default AuthLoginForm
