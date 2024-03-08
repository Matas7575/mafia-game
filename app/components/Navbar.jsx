import React from 'react'
import Link from 'next/link'

export default function Navbar() {
  return (
    <nav>
        <Link href="/rules">Game rules</Link>
        <Link href="/">Roles </Link>
        <Link href="/overseer">Overseer view </Link>
        {/* <Link href="/roleSelection">Role selection</Link> */}
        <Link href="/allPlayers">Alive players</Link>
        <Link href="/registerPlayer">Register player</Link>
    </nav>
  )
}
