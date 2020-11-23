import React from 'react';
import ReactDOM from 'react-dom';

const menuItemsOptions = [
    { text: 'Audio Studio' },
    { text: 'Music Visualizer' },
    { text: 'About' },
    { text: 'Exit' },
]

function Menu() {
    const [activeItem, setActiveItem] = React.useState('')
    const [activeItemPos, setActiveItemPos] = React.useState(0)
    const [activeItemColor, setActiveItemColor] = React.useState('')

    const createClickHandler = (activeItem) => e => {
        e.preventDefault()

        setActiveItem(activeItem)
        setActiveItemPos(document.getElementById(activeItem).offsetTop)
        setActiveItemColor(window.getComputedStyle(document.getElementById(activeItem)).getPropertyValue('background-color'))
    }

    const menuItems = menuItemsOptions.map(item => <MenuItem item={item} createClickHandler={createClickHandler} />)

    return (
        <div className='menu-container'>
            <span className='menu-item--active' style={{ top: activeItemPos, backgroundColor: activeItemColor }} />
            { menuItems}
        </div>
    )

    function MenuItem({ createClickHandler, item }) {
        const clickHandler = createClickHandler(item.text)

        return (
            <button
                className='menu-item'
                id={item.text}
                onClick={clickHandler}
            >
                { item.text.toUpperCase()}
            </button>
        )
    }
}

function MenuItem({ createClickHandler, item }) {
    const clickHandler = createClickHandler(item.text)

    return (
        <button
            className='menu-item'
            id={item.text}
            onClick={clickHandler}
        >
            { item.text.toUpperCase()}
        </button>
    )
}

export default Menu;