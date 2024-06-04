import { SxProps } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { Controller, useFormContext } from "react-hook-form";
import { Box, Stack, Typography } from "@mui/material";

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
      render={({
        field: { onChange, value, ...field },
        fieldState: { error },
      }) => {
        return (
          <Stack direction={"column"}>
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
                  console.log(files, "files");
                  onChange(files);
                  setFiles && setFiles(files);
                }}
                style={{ display: "none" }}
              />
            </Button>

            {!!error?.message && (
              <>
                <Box component={"div"} sx={{ mt: 1, textAlign: "center" }}>
                  <Typography color={"error"} sx={{ fontSize: "12px" }}>
                    {error?.message}
                  </Typography>
                </Box>
              </>
            )}
          </Stack>
        );
      }}
    />
  );
};

export default TTFileUploader;
