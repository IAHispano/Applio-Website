"use client";
import {
  Avatar,
  Chip,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from "@nextui-org/react";
import {
  type Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { Bell, Bug, LogOut, Settings, Shield, Sparkles, Upload, UserCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { Icons } from "../icons/icons";
import { IconBrandDiscord } from '@tabler/icons-react';
import { useEffect, useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";

export default function NavbarAvatar({
  userFullName,
}: {
  userFullName: string;
}) {
  const [showAlert, setShowAlert] = useState(false); 
  const [data, setData] = useState<any[] | null>(null);
  const [user, setUser] = useState<any | null>(null);
  const [error, setError] = useState<PostgrestError | null>(null);
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleProfileClick = () => {
    window.location.href = `/user/${user?.full_name}`;
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

  const handleSettings = () => {
    window.location.href = `/settings/${user?.id}`;
  };

  const handleAlerts = () => {
    window.location.href = `/alerts/${user?.id}`;
  };

  const handleAdminDashboardClick = () => {
    window.location.href = `/admin/${user?.id}`;
  };

  const handleTour = () => {
    window.location.href = `/tour`;
  };
  
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };
  useEffect(() => {
    async function fetchData() {
      // Fetch user data based on full name
      const { data: userData, error: userError } = await supabase
        .from("profiles")
        .select("*")
        .eq("full_name", userFullName);
  
      if (userError) {
        setError(userError);
        return;
      }
  
      setUser(userData[0]);
    }
  
    fetchData();
  }, [userFullName]);

  const iconClasses = "text-sm text-default-500 pointer-events-none flex-shrink-0";
  const tourClasses = "text-sm text-white pointer-events-none flex-shrink-0";
  const dropdownItems = [
    <DropdownItem key="tour" onClick={handleTour} startContent={<Sparkles  className={tourClasses} />} 
    className="p-3 my-1 hover:opacity-95 gtransition"
    style={{
      background: 'linear-gradient(to right, #41295a, #2F0743)',
    }}>
    <span className="z-50">Tour <span className="font-bold">2023</span></span>
  </DropdownItem>,
    <DropdownItem key="profile" onClick={handleProfileClick} startContent={<UserCircle className={iconClasses} />}>
                <p className="font-semibold">{userFullName}</p>
  </DropdownItem>,
      <DropdownItem key="settings" onClick={handleAlerts} startContent={<Bell  className={iconClasses} />}>
      Notifications
    </DropdownItem>,
    <DropdownItem key="settings" onClick={handleSettings} startContent={<Settings  className={iconClasses} />}>
        Settings
      </DropdownItem>,
      <DropdownItem key="upload" onClick={handleProfileClick3} startContent={<Upload  className={iconClasses} />}>
      Upload model
    </DropdownItem>,
    <DropdownItem key="discord" onClick={handleProfileClick1} startContent={<IconBrandDiscord className={iconClasses} />}>
    Discord
  </DropdownItem>,
    <DropdownItem key="bug" onClick={handleProfileClick2} startContent={<Bug className={iconClasses} />}>
    Report a bug
  </DropdownItem>,
      <DropdownItem key="logout" onClick={handleSignOut} className="text-danger" color="danger" startContent={<LogOut className={iconClasses} />}>
      Logout
    </DropdownItem>,
  ];

  if (user && user.role === "admin") {
    dropdownItems.push(
        <DropdownSection title="Admin zone">
        <DropdownItem key="admin" onClick={handleAdminDashboardClick} startContent={<Shield className={iconClasses} />}>
        Admin Dashboard
        </DropdownItem>
        </DropdownSection>
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
            src={user?.avatar_url}
            isBordered 
            color="success"
          /> 
      </div>
        </DropdownTrigger>
        <DropdownMenu aria-label="Static Actions">
          {dropdownItems}
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}