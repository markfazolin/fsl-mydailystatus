import React from 'react';

const Index = () => {
    return (
        <div>
            <h1>Home</h1>
            <a
                href='/api/login'
                className='py-4 px-2 rounded bg-pink-800 font-bold shadow-xl hover:shadow block w-1/4 text-center text-white mx-auto'>
                Comece Aqui
            </a>
        </div>
    )
}

export default Index;
