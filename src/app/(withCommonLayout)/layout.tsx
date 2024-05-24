import Nabvar from "@/components/Shared/Nabvar/Nabvar";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Nabvar />
      {children}
    </div>
  );
};

export default CommonLayout;
