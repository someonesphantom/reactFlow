import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Background,
    MiniMap,
} from 'react-flow-renderer';
//import Sidebar from './sidebar';
//import './index.css';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Handle } from 'react-flow-renderer';
import Lbar from './lbar';
import Rbar from './rbar';
import Topbar from './topbar';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple,blue } from '@mui/material/colors';
import CustomEdge from './customedge';


const sourceNode = ({ data }) => {
    console.log(data)
    return (
        <>
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'primary.dark',
                    '&:hover': {
                        backgroundColor: 'primary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>

                <Avatar sx={{ bgcolor: blue[500],width: 24, fontSize: "80%",height: 24 }}>BML</Avatar>
                </center>
                
            </Box>

            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'primary.main' }}
                isConnectable={true}
            />
        </>
    );
}

const destinationNode = ({ data }) => {
    console.log(data)
    return (
        <>
        <Handle
                type="target"
                position="left"
                onConnect={(params)=>console.log('handle onConnect',params)}
                style={{ backgroundColor: 'secondary.main' }}
                isConnectable={true}
            />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'secondary.dark',
                    '&:hover': {
                        backgroundColor: 'secondary.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>
                {/* src ="https://source.unsplash.com/random/200x200?sig=3"  */}
                <Avatar sx={{ bgcolor: deepPurple[500],width: 24, fontSize: "60%",height: 24 }}>
                MIT
                </Avatar>
                </center>
                
            </Box>
            
        </>
    );
}

const mNode = ({ data }) => {
    console.log(data)
    return (
        <>
        <Handle
                type="target"
                position="left"
                onConnect={(params)=>console.log('handle onConnect',params)}
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            <Box
                sx={{
                    width: 50,
                    height: 50,
                    fontSize: "60%",
                    backgroundColor: 'warning.dark',
                    '&:hover': {
                        backgroundColor: 'warning.main',
                        opacity: [0.9, 0.8, 0.7],
                    },
                }}
            >
                {data.name}
                <center>
                <Avatar sx={{ bgcolor: deepOrange[500],width: 24, fontSize: "60%",height: 24 }}>
                EAIESB
                </Avatar>
                </center>
                
            </Box>
            <Handle
                type="source"
                position="right"
                id="a"
                style={{ backgroundColor: 'warning.main' }}
                isConnectable={true}
            />
            
        </>
    );
}

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { source: sourceNode, destination: destinationNode,middle:mNode };
const edgeTypes = {
    custom: CustomEdge,
  };
const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));


const Talking = () => {
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    
    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const onDrop = useCallback(
        (event) => {
            event.preventDefault();

            const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
            const nodeObjstr = event.dataTransfer.getData('application/reactflow');
            let nodeObj = JSON.parse(nodeObjstr)
            const type = nodeObj.type
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
                return;
            }

            const position = reactFlowInstance.project({
                x: event.clientX - reactFlowBounds.left,
                y: event.clientY - reactFlowBounds.top,
            });
            const newNode = {
                id: getId(),
                type,
                position,
                data: { label: `${type} node` ,name:nodeObj.nodeType},
            };

            setNodes((nds) => nds.concat(newNode));
        },
        [reactFlowInstance]
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <div className="dndflow" >
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Topbar />
                    </Grid>
                    <Grid item xs={1}>
                        <Item><Lbar /></Item>
                    </Grid>
                    <Grid item xs={10}>
                        <Item>
                            <ReactFlowProvider>
                                <div className="reactflow-wrapper" style={{ width: "100%", height: "70vh" }} ref={reactFlowWrapper}>
                                    <ReactFlow
                                        nodes={nodes}
                                        edges={edges}
                                        onNodesChange={onNodesChange}
                                        onEdgesChange={onEdgesChange}
                                        onConnect={onConnect}
                                        onInit={setReactFlowInstance}
                                        onDrop={onDrop}
                                        onDragOver={onDragOver}
                                        nodeTypes={nodeTypes}
                                        edgeTypes={edgeTypes}
                                        fitView
                                    >
                                        <Controls />
                                        <Background />
                                        <MiniMap />
                                    </ReactFlow>
                                </div>

                            </ReactFlowProvider>

                        </Item>
                    </Grid>
                    <Grid item xs={1}>
                        <Item><Rbar /></Item>
                    </Grid>

                </Grid>
            </div>
        </Box>

    );
};

export default Talking;