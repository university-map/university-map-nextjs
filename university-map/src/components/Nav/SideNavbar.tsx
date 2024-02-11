'use client';
import React, { useState } from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IoHome, IoLanguage, IoLogoGithub } from 'react-icons/io5';
import LanguagePicker from './LanguagePicker';
import classes from './SideNavbar.module.css';


interface NavbarLinkProps {
  icon: typeof IoHome;
  label: string;
  active?: boolean;
  onClick?(): void;
}

function NavbarLink({ icon: Icon, label, active, onClick }: NavbarLinkProps) {
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
        <Icon style={{ width: rem(20), height: rem(20) }} />
      </UnstyledButton>
    </Tooltip>
  );
}

const SideNavbar: React.FC = () => {
  const [showLanguages, setShowLanguages] = useState(false);
  return (
    <>
      <nav className={classes.navbar}>
        <div className={classes.bottomNav}>
          <Stack justify="center" gap={0}>
            <NavbarLink icon={IoLanguage} label="Locale" onClick={() => { setShowLanguages(true); }} />
            <NavbarLink icon={IoLogoGithub} label="Github" onClick={() => { window.location.href = 'https://github.com'; }} />
          </Stack>
        </div>
      </nav>
      {showLanguages &&
        <div className={classes.panel}>
          <LanguagePicker />
        </div>
      }
    </>
  );
};

export default SideNavbar;
