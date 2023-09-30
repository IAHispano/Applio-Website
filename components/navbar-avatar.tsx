"use client";
import {
  Avatar,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Bug, LogOut, Shield, Upload, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Icons } from "./icons";

export default function NavbarAvatar({
  id,
  userFullName,
  avatar_url,
  userRole,
}: {
  id: string;
  avatar_url: string;
  userFullName: string;
  userRole: string;
}) {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleProfileClick = () => {
    window.location.href = `/users/${userFullName}`;
  };

  const handleProfileClick1 = () => {
    window.open('https://discord.gg/iahispano', '_blank');
  };
  
  const handleProfileClick2 = () => {
    window.open('https://github.com/IAHispano/Applio-Website/issues/new', '_blank');
  };
  
  const handleProfileClick3 = () => {
    window.location.href = `/upload`;
  };

  const handleAdminDashboardClick = () => {
    window.location.href = `/admin`;
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  const iconClasses = "text-sm text-default-500 pointer-events-none flex-shrink-0";
  const dropdownItems = [
    <DropdownItem key="profile" onClick={handleProfileClick} isDisabled startContent={<UserCircle className={iconClasses} />}>
                <p className="font-semibold">Profile</p>
  </DropdownItem>,
      <DropdownItem key="upload" onClick={handleProfileClick3} isDisabled startContent={<Upload  className={iconClasses} />}>
      Upload model
    </DropdownItem>,
    <DropdownItem key="discord" onClick={handleProfileClick1} startContent={<Icons.discord className="h-5 w-5 fill-current" />}>
      Discord
    </DropdownItem>,
    <DropdownItem key="bug" onClick={handleProfileClick2} startContent={<Bug className={iconClasses} />}>
    Report a bug
  </DropdownItem>,
      <DropdownItem key="logout" onClick={handleSignOut} className="text-danger" color="danger" startContent={<LogOut className={iconClasses} />}>
      Logout
    </DropdownItem>,
  ];

  if (userRole === "admin") {
    dropdownItems.push(
      <DropdownItem key="admin" onClick={handleAdminDashboardClick} startContent={<Shield className={iconClasses}/>}>
        Admin Dashboard
      </DropdownItem>
    );
  }

  return (
    <div className="flex items-center">
      <Dropdown>
        <DropdownTrigger>
        <div
        className="mx-2"
        style={{
        cursor: 'pointer'
        }}>
          <Avatar
            src={avatar_url}
          /> 
        {userFullName}
      </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {dropdownItems}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}