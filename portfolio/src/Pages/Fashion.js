import React, { useState, useEffect, useRef } from 'react';
import Matter from "matter-js";

import './Serve.css'

import FashionLoading from '../Loadings/FashionLoading'
import NavHeader from '../Components/NavHeader'
import CircleCard from '../Components/CircleCard'
import SecondFooter from '../Components/SecondFooter'

import fashion from '../assets/icons/fashion_icon.svg'
import pill from '../assets/main/main_img_pill.svg'

import example1 from '../assets/examples/example1.jpeg'
import example2 from '../assets/examples/example2.png'
import example3 from '../assets/examples/example3.jpeg'
import example4 from '../assets/examples/example4.jpeg'
import example5 from '../assets/examples/example5.jpg'
import example6 from '../assets/examples/example6.jpeg'

const STATIC_DENSITY = 15;

function Fashion() {

    const matterRef = useRef(null);

    const [constraints, setContraints] = useState();
    const [scene, setScene] = useState();

    const handleResize = () => {
        // scene.options.width = matterRef.current.getBoundingClientRect().width;
        // scene.options.height = matterRef.current.getBoundingClientRect().height;
        // scene.canvas.width = matterRef.current.getBoundingClientRect().width;
        // scene.canvas.height = matterRef.current.getBoundingClientRect().height;
        // setContraints(matterRef.current.getBoundingClientRect());
        setMatterWidth(window.innerWidth)
        setMatterHeight(document.getElementsByClassName('serveBody')[0].scrollHeight)
    };
    
    const [matterWidth, setMatterWidth] = useState(1680);
    const [matterHeight, setMatterHeight] = useState(1290);

    const serveType = 'fashion'
    const itemList = [
        { id: 1, title: 'FREEDOM', type: 'Lookbook', image: example1 },
        { id: 2, title: 'test1', type: 'Lookbook', image: example2 },
        { id: 3, title: 'test2-1', type: 'Film', image: example3 },
        { id: 4, title: 'test2-2', type: 'Film', image: example4 },
        { id: 4, title: 'test3-1', type: 'Pictorial', image: example5 },
        { id: 5, title: 'test3-2', type: 'Pictorial', image: example6 },
    ]

    // const [isLoading, setIsLoading] = useState(true)
    const [isLoading, setIsLoading] = useState(false);
    const [filter, setFilter] = useState('all');


    useEffect(() => {
    var Engine = Matter.Engine,
        Render = Matter.Render,
        World = Matter.World,
        // Runner = Matter.Runner,
        MouseConstraint = Matter.MouseConstraint,
        Mouse = Matter.Mouse,
        // Composite = Matter.Composite,
        Bodies = Matter.Bodies;
    var engine = Engine.create()
    var render = Render.create({
        // element: matterWrapperRef.current,
        element: matterRef.current,
        // canvas: matterRef.current,
        engine: engine,
        options: {
            width: window.innerWidth,
            height: matterHeight,
            wireframes: false,
            background: 'transparent',
            wireframeBackground: 'transparent'
    }});

    var topWall = Bodies.rectangle(window.innerWidth / 2 - 50, -50, window.innerWidth - 50, 50, { isStatic: true, render: { fillStyle: "fff" } }),
        bottomWall = Bodies.rectangle(window.innerWidth / 2, matterHeight, window.innerWidth, 50, { isStatic: true, render: { fillStyle: "fff" } }),
        leftWall = Bodies.rectangle(window.innerWidth + 50, matterHeight / 2, 50, matterHeight, { isStatic: true, render: { fillStyle: "fff" } }),
        rightWall = Bodies.rectangle(-50, matterHeight / 2, 50, matterHeight, { isStatic: true, render: { fillStyle: "fff" } })
    const pill1 = Bodies.circle(100, 300, 35, {
        restitution: 0.5,
        render: { sprite: { texture: pill } }
        }),
        pill2 = Bodies.circle(200, 400, 35, {
            restitution: 0.5,
            render: { sprite: { texture: pill } }
        }),
        pill3 = Bodies.circle(300, 200, 35, {
            restitution: 0.5,
            render: { sprite: { texture: pill } }
        }),
        pill4 = Bodies.circle(400, 500, 35, {
            restitution: 0.5,
            render: { sprite: { texture: pill } }
        }),
        pill5 = Bodies.circle(500, 100, 35, {
            restitution: 0.5,
            render: { sprite: { texture: pill } }
        });
    
        World.add(engine.world, [topWall, bottomWall, leftWall, rightWall, pill1, pill2, pill3, pill4, pill5]);

        var mouse = Mouse.create(render.canvas),
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse,
                constraint: {
                    stiffness: 0.2,
                    render: {
                        visible: false
                    }
                }
            });
        mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
        mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);
        render.mouse = mouse;

        World.add(engine.world, mouseConstraint);
        // fit the render viewport to the scene
        Render.lookAt(render, {
            min: { x: 0, y: 0 },
            max: { x: window.innerWidth, y: document.getElementsByClassName('serveBody')[0].scrollHeight }
        });

        Matter.Runner.run(engine);
        Render.run(render);

        setMatterWidth(window.innerWidth)
        setMatterHeight(matterHeight)
        // setContraints([document.getElementsByClassName('serveBody')[0].scrollHeight, window.innerHeight]);
        // setScene(render);

        // window.addEventListener('resize', handleResize);
    }, [])
    
    // useEffect(() => {
    //     const Render = Matter.Render
    //     Render.lookAt(scene, {
    //         min: { x: 0, y: 0 },
    //         max: { x: window.innerWidth, y: document.getElementsByClassName('serveBody')[0].scrollHeight }
    //     });
    //     if (constraints) {
    //         // let { width, height } = constraints;
            
    //         // Dynamically update canvas and bounds
    //         scene.bounds.max.x = matterWidth;
    //         scene.bounds.max.y = matterHeight;
    //         scene.options.width = matterWidth;
    //         scene.options.height = matterHeight;
    //         // scene.canvas.width = width;
    //         // scene.canvas.height = height;

    //         // Dynamically update floor
    //         var topWall = scene.engine.world.bodies[0],
    //             bottomWall = scene.engine.world.bodies[1];
    //             // leftWall = scene.engine.world.bodies[2],
    //             // rightWall = scene.engine.world.bodies[3];
            
    //         // Matter.Body.setPosition(topWall, {
    //         //     x: width / 2 - 50, 
    //         //     y: -50
    //         // });
    //         // Matter.Body.setPosition(bottomWall, {
    //         //     x: width / 2, 
    //         //     y: height
    //         // });
    //         // Matter.Body.setPosition(leftWall, {
    //         //     x: width + 50, 
    //         //     y: height / 2
    //         // });
    //         // Matter.Body.setPosition(rightWall, {
    //         //     x: - 50, 
    //         //     y: height / 2
    //         // });

    //         // Matter.Body.setVertices(bottomWall, [
    //         //     { x: 0, y: height },
    //         //     { x: width, y: height },
    //         //     { x: width, y: height + STATIC_DENSITY },
    //         //     { x: 0, y: height + STATIC_DENSITY }
    //         // ]);
    //     }
    // }, [constraints, scene]);

    return (
        <div className='page'>
            {isLoading ?
                <FashionLoading /> :
                <div id='fashion' className='page'>
                    <NavHeader isNav={true} isAbout={false} isBlog={false} />
                    <div className='serveBody flex-col'>
                            <div className='matter' ref={matterRef} />
                        <img id='fashionIcon' src={fashion} alt="" />
                        <div className='serveText'>Fashion Design</div>
                        <div className='filter flex'>
                            <div className='filterItem' style={{ color: filter === 'all' ? '#161619' : '#7E7E86' }} onClick={() => setFilter('all')}>ALL</div>
                            <div className='filterItem' style={{ color: filter === 'Lookbook' ? '#161619' : '#7E7E86' }} onClick={() => setFilter('Lookbook')}>Lookbook</div>
                            <div className='filterItem' style={{ color: filter === 'Film' ? '#161619' : '#7E7E86' }} onClick={() => setFilter('Film')}>Film</div>
                            <div className='filterItem' style={{ marginRight: 0, color: filter === 'Pictorial' ? '#161619' : '#7E7E86' }} onClick={() => setFilter('Pictorial')}>Pictorial</div>
                        </div>
                        <div className='cards'>
                            <div className='flex'>
                                {itemList.filter(item => item.type === filter || filter === 'all').map((filteredItem) => (
                                    <CircleCard serveType={serveType} id={filteredItem.id} type={filteredItem.type} title={filteredItem.title} image={filteredItem.image} />
                                ))}
                            </div>
                        </div>
                    </div>
                    <SecondFooter fashion={true} visual={false} media={false} />
                </div>}
        </div>
    )
}

export default Fashion