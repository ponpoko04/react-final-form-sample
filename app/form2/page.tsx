'use client'
import { Form, Field } from 'react-final-form'
import Styles from './styles'
import { onSubmit } from '@/components/utils'

type Error = {
  username?: string,
  password?: string,
  confirm?: string,
}

export default function Home() {
  return (
    <Styles>
      <h1>React Final Form Example</h1>
      <h2>Password / Confirm Validation</h2>
      <a
        href="https://final-form.org/react"
        target="_blank"
        rel="noopener noreferrer"
      >
        Read Docs
      </a>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: Error = {}
          if (!values.username) {
            errors.username = 'Required'
          }
          if (!values.password) {
            errors.password = 'Required'
          }
          if (!values.confirm) {
            errors.confirm = 'Required'
          } else if (values.confirm !== values.password) {
            errors.confirm = 'Must match'
          }
          // console.log('errors', errors);
          // return errors
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              console.log('promise', errors);
              resolve(errors);
            }, 5000);
          });
        }}
        render={({ handleSubmit, form, submitting, pristine, values, validating }) => (
          <form onSubmit={handleSubmit}>
            <Field name="username">
              {({ input, meta }) => (
                <div>
                  <label>Username</label>
                  <input {...input} type="text" placeholder="Username" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <div>
                  <label>Password</label>
                  <input {...input} type="password" placeholder="Password" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="confirm">
              {({ input, meta }) => (
                <div>
                  <label>Confirm</label>
                  <input {...input} type="password" placeholder="Confirm" />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting || validating}>
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
