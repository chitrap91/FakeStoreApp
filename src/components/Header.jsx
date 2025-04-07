import React from "react";

export default function Header({ cartCount, openCartModal }) {
    return (
        <nav className="bg-dark p-4 text-white flex flex-col">
            <h1 className="text-2xl  font-bold ">Fake Store</h1>
            <button className="relative" onClick={openCartModal}>
                <span className="2xl">🛒</span>
                {cartCount > 0 && (
                    <span className="absolute top-0 right-0  bg-red-500 text-white text-xs rounded-full px-2 ">{cartCount}</span>

                )}
            </button>
        </nav>
    )
}


