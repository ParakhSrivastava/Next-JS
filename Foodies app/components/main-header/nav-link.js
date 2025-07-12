"use client";
import { usePathname } from 'next/navigation';
import classes from './nav-link.module.css';
import Link from 'next/link';

// NOTE: This component was created to make sure that only leaf components are turned into client-side components.

export default function NavLink({ href, children }) {
  // NOTE: Using usePathname to get the current path
  const path = usePathname();
  const isActive = path.startsWith(href);

  return (
    <Link href={href} className={isActive ? `${classes.link} ${classes.active}` : classes.link} >
      {children}
    </Link>
  );
}