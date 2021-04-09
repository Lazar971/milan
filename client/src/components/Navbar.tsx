

import React from 'react'
import { Link } from 'react-router-dom'
import { Menu } from 'semantic-ui-react'

export default function Navbar() {
    return (
        <Menu fluid >
            <Menu.Item as={Link} to='/' >
                Home
           </Menu.Item>
            <Menu.Item as={Link} to='/radnik'>

                Radnik
           </Menu.Item>
            <Menu.Item as={Link} to='/javniPoziv'>
                Javni poziv
           </Menu.Item>
        </Menu>
    )
}
