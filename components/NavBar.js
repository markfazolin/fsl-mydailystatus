import React from 'react'
import Link from 'next/link'

const NavLink = ({ href, children }) => {
    return (
        <Link href={href}>
            <a className='p-2 hover:underline hover:text-red-800'>{children}</a>
        </Link>
    )
}

const NavBar = () => {
    return (
        <div className='bg-gray-500 py-4 text-center'>
            <NavLink href='/about'>Sobre</NavLink>
            <NavLink href='/autoregister'>Cadastre-se</NavLink>
            <NavLink href='/access'>Entrar</NavLink>
        </div>
    )
}

export default NavBar
