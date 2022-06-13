import React from 'react';
//import './index.css';
import ReactFlow, {
    ReactFlowProvider,
    addEdge,
    useNodesState,
    useEdgesState,
    Controls,
    Handle,

} from 'react-flow-renderer';
import Box from '@mui/material/Box';
import ArrayObjectOfNodes  from './destinationnodes.json';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple,blue } from '@mui/material/colors';
const Rbar = () => {
    const onDragStart = (event, nodeType, srcType) => {
        let nodeInfo = { type: nodeType, nodeType: srcType }
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    let ArrayObjectOfNodes = [{ type: "Venkat",id:1 },{ type: "Vineel",id:2 },{ type: "Sahith",id:3 }]
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                MIT
            </div>
            {ArrayObjectOfNodes.map(
                nodeInfo => <div key={nodeInfo.id} onDragStart={(e) => onDragStart(e, 'destination', nodeInfo.type)} style={{display:"flex",justifyContent:"center"}} draggable>
                    {
                        DestinationNodes(nodeInfo.type)
                    }
                </div>
            )}
            
        </aside>
    );

}
const DestinationNodes = (type) => {
    return (
        <Box
            sx={{
                m:1,
                width: 150,
                height: 100,
                display:"flex",
                justifyContent:"center",
                backgroundColor: 'secondary.dark',
                '&:hover': {
                    backgroundColor: 'secondary.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >
            <center>
                {type}
                <Avatar sx={{ bgcolor: deepPurple[500], width: 40, fontSize: "50%", height: 40 }}>
                    MIT
                </Avatar>
            </center>
        </Box>
    );
}

export default Rbar;