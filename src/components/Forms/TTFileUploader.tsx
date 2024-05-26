import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";

type TProps = {
  name: string;
  label?: string;
  sx?: SxProps;
  multiple?: boolean;
  setFiles?: React.Dispatch<React.SetStateAction<FileList | null>>;
};

const TTFileUploader = ({
  name,
  label,
  multiple = false,
  sx,
  setFiles,
}: TProps) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value, ...field } }) => {
        return (
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
            sx={{ ...sx }}
          >
            {label || "Upload file"}
            <input
              {...field}
              type={"file"}
              multiple={multiple}
              onChange={(e) => {
                const files = (e?.target as HTMLInputElement)?.files;
                onChange(files);
                setFiles && setFiles(files);
              }}
              style={{ display: "none" }}
            />
          </Button>
        );
      }}
    />
  );
};

export default TTFileUploader;
