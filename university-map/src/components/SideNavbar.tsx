'use client';
import React from 'react';
import { Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import { IoHome, IoLanguage, IoLogoGithub  } from 'react-icons/io5';
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
  return (
    <nav className={classes.navbar}>
      <div className={classes.bottomNav}>
        <Stack justify="center" gap={0}>
          <NavbarLink icon={IoLanguage} label="Change account" />
          <NavbarLink icon={IoLogoGithub} label="Logout" />
        </Stack>
      </div>
    </nav>
  );
};

export default SideNavbar;