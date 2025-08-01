import React, { useCallback, useMemo, useEffect } from "react";
import {
  ReactFlow,
  Background,
  Handle,
  MarkerType,
  NodeProps,
  Position,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  ConnectionLineType,
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Team } from "@/types/tournament";

interface KnockoutBracketProps {
  teams: Team[];
  division?: number;
}

// Custom node for team matches
const MatchNode = ({ data, isConnectable }: NodeProps) => {
  const { team1, team2, label, result, winner, stage } = data as any;

  // Dynamically select colors based on tournament stage
  const getBgColor = () => {
    if (stage === "finals") return "bg-idl-gray";
    if (stage === "champion") return "bg-[#C49B33] dark:bg-[#C49B33]";
    if (stage === "semifinal") return "bg-idl-gray";
    if (stage === "quarterfinal") return "bg-idl-gray";
    return "bg-idl-gray";
  };

  const getBorderColor = () => {
    if (stage === "finals") return "border-idl-accent";
    if (stage === "champion") return "border-[#C49B33] dark:border-[#C49B33]";
    return "border-gray-600 dark:border-gray-600";
  };

  const getTextColor = () => {
    return "text-white dark:text-white";
  };

  return (
    <div className={`p-2 rounded border ${getBorderColor()} ${getBgColor()} min-w-40 shadow-md`}>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="!bg-red-500 dark:!bg-red-500" />

      <div className="text-xs text-idl-light truncate mb-1">{label}</div>

      {team1 && (
        <div className={`text-sm ${getTextColor()} truncate max-w-36 ${winner === team1.name ? "font-bold" : ""}`}>
          {result && winner === team1.name && "✓ "}
          {team1.name}
          {result && winner === team1.name && <span className="ml-1 text-xs">{result[0]}</span>}
        </div>
      )}

      {team2 && (
        <div className={`text-sm ${getTextColor()} truncate max-w-36 ${winner === team2.name ? "font-bold" : ""}`}>
          {result && winner === team2.name && "✓ "}
          {team2.name}
          {result && winner === team2.name && <span className="ml-1 text-xs">{result[1]}</span>}
        </div>
      )}

      {!team1 && !team2 && <div className={`text-sm ${getTextColor()} truncate`}>TBD</div>}

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="!bg-red-500 dark:!bg-red-500" />
    </div>
  );
};

// Seed box component showing just the team in its seed position
const SeedNode = ({ data, isConnectable }: NodeProps) => {
  const { team, seed } = data as any;

  return (
    <div className="p-2 rounded border border-gray-600 dark:border-gray-600 bg-idl-gray min-w-40 shadow-md">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} className="!bg-red-500 dark:!bg-red-500 !opacity-0" />

      <div className="text-xs text-idl-light truncate mb-1">{seed}</div>

      <div className="text-sm text-idl-light truncate max-w-36">{team?.name || "TBD"}</div>

      <Handle type="source" position={Position.Right} isConnectable={isConnectable} className="!bg-red-500 dark:!bg-red-500" />
    </div>
  );
};

// Custom node types
const nodeTypes = {
  match: MatchNode,
  seed: SeedNode,
};

// Inner component that uses React Flow hooks - must be inside ReactFlowProvider
const KnockoutBracketFlow: React.FC<{ teams: Team[]; division: number }> = ({ teams, division }) => {
  // Sort teams by points to determine seeding
  const sortedTeams = useMemo(() => [...teams].sort((a, b) => b.points - a.points), [teams]);

  // Initialize state with empty arrays - these hooks must be inside ReactFlowProvider
  const [nodes, setNodes, onNodesChange] = useNodesState<any>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<any>([]);

  // Generate bracket for Division 2 (6 teams)
  const generateDivision2Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Base layout parameters
    const xStart = 50;
    const xGap = 250;
    const yStart = 100;
    const yGap = 100;

    // Round 1: Seeds
    // 3rd Seed vs 6th Seed
    nodes.push(
      {
        id: "seed-3",
        type: "seed",
        data: { seed: "3rd Seed", team: sortedTeams[2] },
        position: { x: xStart, y: yStart },
      },
      {
        id: "seed-6",
        type: "seed",
        data: { seed: "6th Seed", team: sortedTeams[5] },
        position: { x: xStart, y: yStart + yGap },
      },
      {
        id: "qf-1",
        type: "match",
        data: {
          label: "3rd Seed Won",
          team1: sortedTeams[2],
          stage: "quarterfinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap / 2 },
      }
    );

    // Connecting edges for quarterfinals
    edges.push(
      {
        id: "e-seed3-qf1",
        source: "seed-3",
        target: "qf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed6-qf1",
        source: "seed-6",
        target: "qf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // 4th Seed vs 5th Seed
    nodes.push(
      {
        id: "seed-4",
        type: "seed",
        data: { seed: "4th Seed", team: sortedTeams[3] },
        position: { x: xStart, y: yStart + yGap * 3 },
      },
      {
        id: "seed-5",
        type: "seed",
        data: { seed: "5th Seed", team: sortedTeams[4] },
        position: { x: xStart, y: yStart + yGap * 4 },
      },
      {
        id: "qf-2",
        type: "match",
        data: {
          label: "4th Seed Won",
          team1: sortedTeams[3],
          stage: "quarterfinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap * 3.5 },
      }
    );

    // Connecting edges for quarterfinals
    edges.push(
      {
        id: "e-seed4-qf2",
        source: "seed-4",
        target: "qf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed5-qf2",
        source: "seed-5",
        target: "qf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // Add 2nd seed and 1st seed
    nodes.push(
      {
        id: "seed-2",
        type: "seed",
        data: { seed: "2nd Seed", team: sortedTeams[1] },
        position: { x: xStart + xGap, y: yStart + yGap * 1.5 },
      },
      {
        id: "seed-1",
        type: "seed",
        data: { seed: "1st Seed", team: sortedTeams[0] },
        position: { x: xStart + xGap, y: yStart + yGap * 2.5 },
      }
    );

    // Semifinals
    nodes.push(
      {
        id: "sf-1",
        type: "match",
        data: {
          label: "2nd Seed vs 3rd Seed",
          team1: sortedTeams[1],
          team2: sortedTeams[2],
          winner: sortedTeams[1].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap * 2, y: yStart + yGap },
      },
      {
        id: "sf-2",
        type: "match",
        data: {
          label: "1st Seed vs 4th Seed",
          team1: sortedTeams[0],
          team2: sortedTeams[3],
          winner: sortedTeams[0].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap * 2, y: yStart + yGap * 3 },
      }
    );

    // Connecting edges for semifinals
    edges.push(
      {
        id: "e-seed2-sf1",
        source: "seed-2",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-qf1-sf1",
        source: "qf-1",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed1-sf2",
        source: "seed-1",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-qf2-sf2",
        source: "qf-2",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // Finals
    nodes.push({
      id: "final",
      type: "match",
      data: {
        label: "2nd Seed vs 1st Seed",
        team1: sortedTeams[1],
        team2: sortedTeams[0],
        stage: "finals",
      },
      position: { x: xStart + xGap * 3, y: yStart + yGap * 2 },
    });

    // Champion
    nodes.push({
      id: "champion",
      type: "match",
      data: {
        label: "👑 Champion",
        team1: sortedTeams[1],
        stage: "champion",
      },
      position: { x: xStart + xGap * 4, y: yStart + yGap * 2 },
    });

    // Connecting edges for finals and champion..
    edges.push(
      {
        id: "e-sf1-final",
        source: "sf-1",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf2-final",
        source: "sf-2",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-final-champion",
        source: "final",
        target: "champion",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    return { nodes, edges };
  }, [sortedTeams]);

  // Generate bracket for Division 1 (5 teams)
  const generateDivision1Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Base layout parameters
    const xStart = 50;
    const xGap = 250;
    const yStart = 100;
    const yGap = 100;

    // Round 1: Seeds (4th and 5th)
    nodes.push(
      {
        id: "seed-4",
        type: "seed",
        data: { seed: "4th Seed", team: sortedTeams[3] },
        position: { x: xStart, y: yStart + yGap * 3 },
      },
      {
        id: "seed-5",
        type: "seed",
        data: { seed: "5th Seed", team: sortedTeams[4] },
        position: { x: xStart, y: yStart + yGap * 4 },
      }
    );

    // Round 1: Quarterfinal
    nodes.push({
      id: "qf-1",
      type: "match",
      data: {
        label: "4th Seed Won",
        team1: sortedTeams[3],
        stage: "quarterfinal",
      },
      position: { x: xStart + xGap, y: yStart + yGap * 3.5 },
    });

    // Seeds for Round 2 (1st, 2nd, 3rd)
    nodes.push(
      {
        id: "seed-3",
        type: "seed",
        data: { seed: "3rd Seed", team: sortedTeams[2] },
        position: { x: xStart, y: yStart },
      },
      {
        id: "seed-2",
        type: "seed",
        data: { seed: "2nd Seed", team: sortedTeams[1] },
        position: { x: xStart, y: yStart + yGap },
      },
      {
        id: "seed-1",
        type: "seed",
        data: { seed: "1st Seed", team: sortedTeams[0] },
        position: { x: xStart + xGap, y: yStart + yGap * 2 },
      }
    );

    // Connecting edges for quarterfinal
    edges.push(
      {
        id: "e-seed4-qf1",
        source: "seed-4",
        target: "qf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed5-qf1",
        source: "seed-5",
        target: "qf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // Semifinals
    nodes.push(
      {
        id: "sf-1",
        type: "match",
        data: {
          label: "3rd Seed Won",
          team1: sortedTeams[1],
          team2: sortedTeams[2],
          winner: sortedTeams[2].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap / 2 },
      },
      {
        id: "sf-2",
        type: "match",
        data: {
          label: "1st Seed vs 4th Seed",
          team1: sortedTeams[0],
          team2: sortedTeams[3],
          winner: sortedTeams[0].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap * 2, y: yStart + yGap * 3 },
      }
    );

    // Finals and Champion
    nodes.push(
      {
        id: "final",
        type: "match",
        data: {
          label: "3rd Seed vs 1st Seed",
          team1: sortedTeams[2],
          team2: sortedTeams[0],
          stage: "finals",
        },
        position: { x: xStart + xGap * 3, y: yStart + yGap * 2 },
      },
      {
        id: "champion",
        type: "match",
        data: {
          label: "👑 Champion",
          team1: sortedTeams[0],
          stage: "champion",
        },
        position: { x: xStart + xGap * 4, y: yStart + yGap * 2 },
      }
    );

    // Connecting edges for semifinal 1
    edges.push(
      {
        id: "e-seed3-sf1",
        source: "seed-3",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed2-sf1",
        source: "seed-2",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // Connecting edges for semifinal 2
    edges.push(
      {
        id: "e-seed1-sf2",
        source: "seed-1",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-qf1-sf2",
        source: "qf-1",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    // Connecting edges for finals and champion
    edges.push(
      {
        id: "e-sf1-final",
        source: "sf-1",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf2-final",
        source: "sf-2",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-final-champion",
        source: "final",
        target: "champion",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    return { nodes, edges };
  }, [sortedTeams]);

  // Generate bracket for Division 3 (4 teams)
  const generateDivision3Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Base layout parameters
    const xStart = 50;
    const xGap = 250;
    const yStart = 100;
    const yGap = 100;

    // Seeds (all 4 teams go directly to semifinals)
    nodes.push(
      {
        id: "seed-1",
        type: "seed",
        data: { seed: "1st Seed", team: sortedTeams[0] },
        position: { x: xStart, y: yStart },
      },
      {
        id: "seed-4",
        type: "seed",
        data: { seed: "4th Seed", team: sortedTeams[3] },
        position: { x: xStart, y: yStart + yGap },
      },
      {
        id: "seed-2",
        type: "seed",
        data: { seed: "2nd Seed", team: sortedTeams[1] },
        position: { x: xStart, y: yStart + yGap * 3 },
      },
      {
        id: "seed-3",
        type: "seed",
        data: { seed: "3rd Seed", team: sortedTeams[2] },
        position: { x: xStart, y: yStart + yGap * 4 },
      }
    );

    // Semifinals
    nodes.push(
      {
        id: "sf-1",
        type: "match",
        data: {
          label: "1st Seed Won",
          team1: sortedTeams[0],
          team2: sortedTeams[3],
          winner: sortedTeams[0].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap / 2 },
      },
      {
        id: "sf-2",
        type: "match",
        data: {
          label: "3rd Seed Won",
          team1: sortedTeams[1],
          team2: sortedTeams[2],
          winner: sortedTeams[2].name,
          stage: "semifinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap * 3.5 },
      }
    );

    // Finals and Champion
    nodes.push(
      {
        id: "final",
        type: "match",
        data: {
          label: "1st Seed vs 3rd Seed",
          team1: sortedTeams[0],
          team2: sortedTeams[2],
          stage: "finals",
        },
        position: { x: xStart + xGap * 2, y: yStart + yGap * 2 },
      },
      {
        id: "champion",
        type: "match",
        data: {
          label: "👑 Champion",
          team1: sortedTeams[0],
          stage: "champion",
        },
        position: { x: xStart + xGap * 3, y: yStart + yGap * 2 },
      }
    );

    // Connecting edges
    edges.push(
      {
        id: "e-seed1-sf1",
        source: "seed-1",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed4-sf1",
        source: "seed-4",
        target: "sf-1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed2-sf2",
        source: "seed-2",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-seed3-sf2",
        source: "seed-3",
        target: "sf-2",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf1-final",
        source: "sf-1",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf2-final",
        source: "sf-2",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-final-champion",
        source: "final",
        target: "champion",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      }
    );

    return { nodes, edges };
  }, [sortedTeams]);

  // Update nodes and edges when division or teams change
  useEffect(() => {
    const newElements = (() => {
      switch (division) {
        case 1:
          return generateDivision1Bracket();
        case 3:
          return generateDivision3Bracket();
        case 2:
        default:
          return generateDivision2Bracket();
      }
    })();

    setNodes(newElements.nodes);
    setEdges(newElements.edges);
  }, [division, teams, generateDivision1Bracket, generateDivision2Bracket, generateDivision3Bracket]);

  // Flow configuration
  const defaultEdgeOptions = {
    style: { stroke: "#ffffff", strokeWidth: 2 },
    type: "smoothstep",
    markerEnd: {
      type: MarkerType.Arrow,
    },
  };

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      nodeTypes={nodeTypes}
      defaultEdgeOptions={defaultEdgeOptions}
      connectionLineType={ConnectionLineType.SmoothStep}
      connectionLineStyle={{ stroke: "#ffffff", strokeWidth: 2 }}
      fitView
      minZoom={0.5}
      maxZoom={1.5}
      nodesDraggable={false}
      edgesFocusable={false}
      nodesFocusable={false}
      elementsSelectable={false}
      zoomOnScroll={false}
      panOnScroll={true}
    >
      <Background color="#2D3748" gap={16} size={1} />
      <Controls showInteractive={false} className="!bg-gray-800 !text-white !border-gray-700" />
    </ReactFlow>
  );
};

export const SeasonFourKnockoutBracket: React.FC<KnockoutBracketProps> = ({ teams, division = 2 }) => {
  // Add check for empty teams array
  if (!teams || teams.length === 0) {
    return (
      <div className="w-full h-[600px] bg-idl-gray rounded-lg shadow-lg flex items-center justify-center">
        <p className="text-idl-light">No teams available</p>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] bg-idl-dark dark:bg-[#0D1B2A] rounded-lg shadow-lg">
      <ReactFlowProvider>
        <KnockoutBracketFlow teams={teams} division={division} />
      </ReactFlowProvider>
    </div>
  );
};
