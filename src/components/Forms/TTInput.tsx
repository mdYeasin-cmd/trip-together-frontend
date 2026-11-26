import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  sx?: SxProps;
  required?: boolean;
  multiline?: boolean;
  minRows?: number;
  "data-testid"?: string;
};

const TTInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  required,
  multiline = false,
  minRows = 1,
  "data-testid": dataTestId,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
          multiline={multiline}
          minRows={minRows}
          inputProps={{ "data-testid": dataTestId }}
        />
      )}
    />
  );
};

export default TTInput;
