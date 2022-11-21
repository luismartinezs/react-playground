import { useState } from "react";

type Checked = string | null;

type ChildrenProp = {
  children: React.ReactNode;
};

type BaseButtonProps = {
  label: string;
  value: string;
};

type Name = {
  name: string;
};

type OnChange = { onChange: (value: string) => void };

type RadioButtonProps = Name &
  BaseButtonProps &
  OnChange & {
    id: string;
    checked?: boolean;
  };

type RadioGroupProps = {
  legend: string;
};

type RadioButtonsProps = RadioGroupProps &
  Name &
  OnChange & {
    buttons: BaseButtonProps[];
  };

const RadioButton = ({
  label,
  id,
  name,
  value,
  checked,
  onChange,
}: RadioButtonProps) => {
  const handleChange = () => {
    onChange(value);
  };
  return (
    <>
      <input
        type="radio"
        id={id}
        name={name}
        value={value}
        checked={checked}
        onChange={handleChange}
        className="mr-1"
      />
      <label htmlFor={id}>{label}</label>
    </>
  );
};

const RadioGroup = ({ children, legend }: RadioGroupProps & ChildrenProp) => {
  return (
    <fieldset>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
};

const RadioButtons = ({
  buttons,
  legend,
  name,
  onChange,
}: RadioButtonsProps) => {
  const [checked, setChecked] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setChecked(value);
    onChange(value + name);
  };

  return (
    <RadioGroup legend={legend}>
      {buttons.map(({ label, value }) => (
        <RadioButton
          key={value}
          label={label}
          id={value}
          name={name}
          value={value}
          checked={checked === value}
          onChange={handleChange}
        />
      ))}
    </RadioGroup>
  );
};

const Comp1 = ({ onChange }: OnChange) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <FakeModal title="Pirates">
      <RadioButtons
        buttons={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        legend="Are you a pirate?"
        name="pirate"
        onChange={handleChange}
      />
    </FakeModal>
  );
};

const Comp2 = ({ onChange }: OnChange) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <FakeModal title="Ninjas">
      {" "}
      <RadioButtons
        buttons={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        legend="Are you a ninja?"
        name="ninjas"
        onChange={handleChange}
      />
    </FakeModal>
  );
};

const Comp3 = ({ onChange }: OnChange) => {
  const handleChange = (value: string) => {
    onChange(value);
  };
  return (
    <FakeModal title="Robots">
      {" "}
      <RadioButtons
        buttons={[
          { label: "Yes", value: "yes" },
          { label: "No", value: "no" },
        ]}
        legend="Are you a robot?"
        name="robots"
        onChange={handleChange}
      />
    </FakeModal>
  );
};

const FakeModal = ({ title, children }: ChildrenProp & { title: string }) => {
  return (
    <div className="p-2 border border-sky-500">
      <h3 className="font-bold">{title}</h3>
      <div>{children}</div>
    </div>
  );
};

const Root = () => {
  const [condition, setCondition] = useState("pirate");
  const [checked, setChecked] = useState<string | null>(null);
  const [showError, setShowError] = useState(false);

  const validate = () => checked !== null;

  const handleChecked = (value: string) => {
    setShowError(false);
    setChecked(value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      console.log(checked);
    } else {
      setShowError(true);
    }
  };

  const Buttons = () => (
    <div className="flex gap-1 mb-1">
      <button onClick={() => setCondition("pirate")} className="button">
        Pirate
      </button>
      <button onClick={() => setCondition("ninja")} className="button">
        Ninja
      </button>
      <button onClick={() => setCondition("robot")} className="button">
        Robot
      </button>
    </div>
  );

  const Wrapper = ({ children }: ChildrenProp) => (
    <>
      <Buttons />
      <form onSubmit={handleSubmit}>
        {children}
        {showError && <p className="text-red-500">Please select an option</p>}
        <button className="mt-1 button">Submit</button>
      </form>
    </>
  );

  if (condition === "pirate") {
    return (
      <Wrapper>
        <Comp1 onChange={handleChecked} />
      </Wrapper>
    );
  }
  if (condition === "ninja") {
    return (
      <Wrapper>
        <Comp2 onChange={handleChecked} />
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <Comp3 onChange={handleChecked} />
    </Wrapper>
  );
};

const FieldsetUsage = () => {
  return (
    <div>
      <h2>FieldsetUsage</h2>
      <p>Root renders fieldset + controlled radio buttons based on condition</p>
      <Root />
    </div>
  );
};

export default FieldsetUsage;
