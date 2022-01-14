import React from 'react'

export default function Nav() {
    return (
        <div className='nav'>
            <a href='/'>Home </a>
            <a href='/products/add'> Add product</a>
            <a href="/users/signup"> Sign up </a>
            <a href="/users/signin"> Sign In </a>
        </div>
    )
}
