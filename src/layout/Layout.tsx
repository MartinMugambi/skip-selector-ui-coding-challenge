import NavBar from "./navBar/NavBar";
import BottomSheet from "./bottomSheet/BottomSheet";
import useBoundStore from "../store/useBoundStore";
import SpacingWrapper from "../components/spacingWrapper/SpacingWrapper";
const Layout = ({ children }: { children: React.ReactNode }) => {
  const isCardSelected = useBoundStore((state) => state.isCardSelected);

  return (
    <>
      <NavBar title="Select Skip" />

      <main>{children}</main>
      {isCardSelected && <BottomSheet />}
    </>
  );
};

export default Layout;
