import Navbar from "./navbar";

const LayoutEmployee = ({children}: {children: React.ReactNode}) => {
  return (
    <main className="flex h-screen w-full flex-col">
      <Navbar />
      <div>{children}</div>
    </main>
  );
};

export default LayoutEmployee;
