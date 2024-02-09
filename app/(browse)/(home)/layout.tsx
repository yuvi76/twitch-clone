import { Navbar } from "../_components/navbar";

const BrowseLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className="flex h-fll pt-20">{children}</div>
    </>
  );
};

export default BrowseLayout;
