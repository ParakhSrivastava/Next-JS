import MainHeaderBackground from './main-header-background';
import classes from './main-header.module.css';
import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import logoImg from "@/assets/logo.png";
import NavLink from './nav-link';

const MainHeader = () => {
  return (
    <>
      <MainHeaderBackground />
      <header className={classes.header}>
        <Link className={classes.logo} href="/">
          <Image src={logoImg} alt="A plate of food" priority />
          NextLevel food
        </Link>

        <nav className={classes.nav}>
          <ul>
            <li>
              <NavLink href="/meals">Browse meals</NavLink>
            </li>
            <li>
              <NavLink href="/community">Foodies community</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    </>
  )
}

export default MainHeader
