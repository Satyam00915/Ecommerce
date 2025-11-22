import { adminSidebarMenuItems } from "@/config";
import { UserStar } from "lucide-react";
import React, { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "../ui/sheet";

function MenuItems({ navigate, setOpen }) {
  return (
    <nav className="mt-8 flex flex-col gap-2">
      {adminSidebarMenuItems.map((menu) => (
        <div
          onClick={() => {
            navigate(menu.path);
            setOpen ? setOpen(false) : null;
          }}
          key={menu.id}
          className="flex cursor-pointer text-xl text-gray-800 hover:bg-gray-200 active:bg-gray-300 transition-all ease-in items-center gap-2 rounded-md px-3 py-2"
        >
          <menu.icon />
          <span>{menu.label}</span>
        </div>
      ))}
    </nav>
  );
}

const AdminSidebar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64">
          <div className="flex flex-col h-full">
            <SheetHeader className={"border-b"}>
              <SheetTitle className={"flex gap-3  items-center"}>
                <UserStar size={30} />
                <span className="text-lg py-1">Admin Panel</span>
              </SheetTitle>
            </SheetHeader>

            <MenuItems navigate={navigate} setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-2"
        >
          <UserStar size={30} />
          <h1 className="text-xl pt-1 font-extrabold">Admin Panel</h1>
        </div>
        <MenuItems navigate={navigate} />
      </aside>
    </Fragment>
  );
};

export default AdminSidebar;
