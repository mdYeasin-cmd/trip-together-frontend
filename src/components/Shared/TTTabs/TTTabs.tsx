import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import type { TabsProps } from "@mui/material/Tabs";
import {
  alpha,
  type SxProps,
  type Theme,
  useTheme,
} from "@mui/material/styles";

export type TTTabsItem = {
  label: React.ReactNode;
  icon?: React.ReactElement;
  value?: string | number;
  disabled?: boolean;
  iconPosition?: "top" | "bottom" | "start" | "end";
};

export type TTTabsProps = {
  value: string | number;
  onChange: (value: string | number) => void;
  tabs: TTTabsItem[];
  sx?: SxProps<Theme>;
} & Omit<TabsProps, "value" | "onChange" | "children" | "sx">;

const TTTabs = ({
  value,
  onChange,
  tabs,
  sx,
  variant,
  ...props
}: TTTabsProps) => {
  const theme = useTheme();

  const defaultSx: SxProps<Theme> = {
    p: 0.5,
    borderRadius: 999,
    backgroundColor: alpha(theme.palette.primary.main, 0.12),
    border: `1px solid ${alpha(theme.palette.primary.main, 0.18)}`,
    "& .MuiTabs-indicator": { display: "none" },
    "& .MuiTab-root": {
      minHeight: 40,
      textTransform: "none",
      fontWeight: 800,
      color: "rgba(0,0,0,0.65)",
      borderRadius: 999,
    },
    "& .MuiTab-root.Mui-selected": {
      color: "rgba(0,0,0,0.9)",
      backgroundColor: theme.palette.common.white,
      boxShadow: 1,
    },
  };

  return (
    <Tabs
      value={value}
      onChange={(_, v) => onChange(v)}
      variant={variant ?? "fullWidth"}
      sx={{
        ...defaultSx,
        ...sx,
      }}
      {...props}
    >
      {tabs.map((tab, i) => {
        console.log(tab?.value, "tab?.value");
        return (
          <Tab
            key={String(tab.value ?? i)}
            value={tab.value ?? i}
            icon={tab.icon}
            iconPosition={tab.iconPosition ?? "start"}
            label={tab.label}
            disabled={tab.disabled}
          />
        );
      })}
    </Tabs>
  );
};

export default TTTabs;
