'use client'
import { Form, useField } from "react-final-form";
import "./styles.css";

const TypeSelect = () => {
  const { input } = useField("type");

  return (
    <select {...input}>
      <option value="text">Text</option>
      <option value="number">Number</option>
    </select>
  );
};

const TextField = ({ name, ...props }: any) => {
  const {
    input,
    meta: { error }
  } = useField(name, props);

  return (
    <>
      <input {...input} />
      <div>{error}</div>
    </>
  );
};

const ConditionalValidationTextField = () => {
  // validation is based on the type in the select
  const {
    input: { value: type }
  } = useField("type");

  return (
    <TextField
      name="field"
      data={type}
      validate={
        type === "number"
          ? (value: any) => isNaN(value) && "Not a number"
          : (value: any) =>
              (value === undefined || value === "") && "Empty text"
      }
    />
  );
};

export default function App() {
  return (
    <div className="App">
      <ol>
        <li>Type letters into the input</li>
        <li>Toggle from "Text" to "Number"</li>
        <li>Inspect the console</li>
      </ol>
      <Form onSubmit={() => {}}>
        {() => (
          <form>
            <div>
              <TypeSelect />
            </div>
            <div>
              <ConditionalValidationTextField />
            </div>
          </form>
        )}
      </Form>
    </div>
  );
}
