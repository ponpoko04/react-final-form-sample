'use client'
import Styles from './styles'
import { Form, Field } from 'react-final-form'
import { onSubmit } from '@/components/utils'

const required = (value: any): string | undefined => (value ? undefined : 'Required')
const mustBeNumber = (value: any): string | undefined => (isNaN(value) ? 'Must be a number' : undefined)
const minValue = (min: number) => (value: any): string | undefined =>
  isNaN(value) || value >= min ? undefined : `Should be greater than ${min}`
const composeValidators = (...validators: any[]) => (value: any): string | undefined => {
  const errors = validators.reduce((error, validator) => {
    console.log(`validators.reduce: ${error}`);
    return error || validator(value)
  }, undefined)
  console.log(`composeValidators: ${errors}`);

  // returns an error if the value is invalid, or undefined if the value is valid.
  // https://final-form.org/docs/react-final-form/types/FieldProps#validate
  return errors;
}

export default function Home() {
  return (
    <Styles>
      <h1>React Final Form Example</h1>
      <h2>Synchronous Field-Level Validation</h2>
      <a
        href="https://final-form.org/react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Docs
      </a>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, submitting, pristine, values }) => (
          <form onSubmit={handleSubmit}>
            <Field name="firstName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>First Name</label>
                  <input {...input} type="text" placeholder="First Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="lastName" validate={required}>
              {({ input, meta }) => (
                <div>
                  <label>Last Name</label>
                  <input {...input} type="text" placeholder="Last Name" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field
              name="age"
              validate={composeValidators(required, mustBeNumber, minValue(18))}
            >
              {({ input, meta }) => (
                <div>
                  <label>Age</label>
                  <input {...input} type="text" placeholder="Age" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button
                type="button"
                onClick={form.reset}
                disabled={submitting || pristine}
              >
                Reset
              </button>
            </div>
            <pre>{JSON.stringify(values, (_, value) => value, 2)}</pre>
          </form>
        )}
      />
    </Styles>
  )
}
