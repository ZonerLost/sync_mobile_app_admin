import React from "react";
import TextField, { type TextFieldProps } from "./TextField";

type PasswordFieldProps = Omit<TextFieldProps, "type" | "rightIcon" | "onRightIconClick">;

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const [show, setShow] = React.useState(false);

  return (
    <TextField
      {...props}
      type={show ? "text" : "password"}
      rightIcon={
        <span className="text-[10px] font-semibold uppercase tracking-wide">
          {show ? "Hide" : "Show"}
        </span>
      }
      onRightIconClick={() => setShow((s) => !s)}
    />
  );
};

export default PasswordField;
