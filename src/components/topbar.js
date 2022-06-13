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
import ArrayObjectOfNodes from './destinationnodes.json';
import Avatar from '@mui/material/Avatar';
import { deepOrange, deepPurple, blue } from '@mui/material/colors';

const Topbar = () => {
    const onDragStart = (event, nodeType, srcType) => {
        let nodeInfo = { type: nodeType, nodeType: srcType }
        event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeInfo));
        event.dataTransfer.effectAllowed = 'move';
    };
    let ArrayObjectOfNodes = [{ type: "Vamsi", id: 1 }, { type: "Abhilash", id: 2 }, { type: "Srikanth", id: 3 }]
    return (
        <aside>
            <div className='groupsMagenta' style={{ fontSize: "1.25vw", textAlign: "center", marginTop: "6px", marginBottom: "8px" }} >
                EAIESB
            </div>
            <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
                {ArrayObjectOfNodes.map(
                    nodeInfo => <div key={nodeInfo.id} onDragStart={(e) => onDragStart(e, 'middle', nodeInfo.type)} draggable>
                        {
                            SourceNode(nodeInfo.type)
                        }
                    </div>
                )}
            </div>


        </aside>
    );

}
const SourceNode = (type) => {
    return (
        <Box
            sx={{
                width: 150,
                height: 80,
                backgroundColor: 'warning.dark',
                '&:hover': {
                    backgroundColor: 'warning.main',
                    opacity: [0.9, 0.8, 0.7],
                },
            }}
        >

            <center>
                {type}
                <Avatar sx={{ bgcolor: deepOrange[500], width: 30, fontSize: "40%", height: 30 }}>
                    EAIESB
                </Avatar>
            </center>
        </Box>
    );
}

export default Topbar;