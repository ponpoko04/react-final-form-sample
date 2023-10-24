'use client'
import { onSubmit } from "@/components/utils";
import { Form, Field, useField } from "react-final-form";
import Styles from "./styles";

const getValidator = (isRequired: boolean) =>
  isRequired ? (value: any): string | undefined => (value ? undefined : "Required") : () => {};
const Error = ({ name }: { name: string }) => (
  <Field name={name} subscription={{ error: true }}>
    {({ meta: { error } }) => (error ? <span>{error}</span> : null)}
  </Field>
);

const FirstRequiredCheckBox = ({ ...props }: any) => {
  const { input } = useField('firstRequired', props);

  return (
    <input {...input} />
  )
}

const First = ({...props}: any) => {
  const { input, meta: { error } } = useField('first', props);

  return (
    <>
      <input {...input} />
      <div>{error}</div>
    </>
  )
}

export default function Home() {
  return (
    <Styles>
      <h1>🏁 React Final Form</h1>
      <h2>Changing Field-Level Validators</h2>
      <a href="https://github.com/erikras/react-final-form#-react-final-form">
        Read Docs
      </a>
      <Form onSubmit={onSubmit} initialValues={{ firstRequired: true }}>
        {({ handleSubmit, form, submitting, errors, values }) => (
          <form onSubmit={handleSubmit}>
            <div>
              <label>First Required?</label>
              {/* <Field name="firstRequired" component="input" type="checkbox" /> */}
              <FirstRequiredCheckBox type="checkbox"/>
            </div>
            <div>
              <label>First</label>
              <Field
                name="first"
                component="input"
                placeholder="First"
                validate={getValidator(values.firstRequired)}
                // 👇 THIS IS THE KEY LINE (no pun intended).
                // Whatever parameters are being used to calculate
                // the validation function need to be combined in such
                // a way that, when they change, this key prop
                // changes, thus reregistering this field (and its
                // validation function) with Final Form.
                // key={values.firstRequired ? 1 : 0}
                
                // NOTE: ただし、これを書くと以下のWarningがコンソールに出る(初期表示後、チェックボックスを2回変更した時のみ)
                // ＊もしかしたらvalidate fnを動的に変更するのではなく、異なるvalidate fnを設定したコンポーネントを切り替えたほうがよいのかもしれない
                // Warning: Cannot update a component (`ForwardRef(Field)`) while rendering a different component (`ForwardRef(Field)`).
                // To locate the bad setState() call inside `ForwardRef(Field)`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
                
                // `key`ではなく以下`data`を使うことで解決する
                data={values.firstRequired}
                // data = Initial state for arbitrary values to be placed by mutators.
                // cf. https://final-form.org/docs/final-form/types/Mutator
              />
              {/* <First
                component="input"
                placeholder="First"
                validate={getValidator(values.firstRequired)}
                // key={values.firstRequired ? 1 : 0}
              /> */}
              <Error name="first" />
            </div>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Submit
              </button>
              <button type="button" onClick={form.reset} disabled={submitting}>
                Reset
              </button>
            </div>
            <h3>Values</h3>
            <pre>{JSON.stringify(values, undefined, 2)}</pre>
            <h3>Errors</h3>
            <pre>{JSON.stringify(errors, undefined, 2)}</pre>
          </form>
        )}
      </Form>
    </Styles>
  )
}
