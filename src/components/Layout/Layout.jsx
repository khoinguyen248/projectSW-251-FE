import SidebarLeft from "./SidebarLeft";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar trái */}
      <SidebarLeft />

      {/* Main content */}
      <div className="flex flex-col flex-1 bg-bg-gray">
        {/* Header */}
        <Header />

        {/* Nội dung chính */}
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>


    </div>
  );
};

export default Layout;
