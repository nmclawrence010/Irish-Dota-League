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

  // Generate bracket for Division 1 (5 teams, stepladder style)
  const generateDivision1Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Layout
    const xStart = 50;
    const xGap = 220;
    const yStart = 100;
    const yGap = 120;

    // Quarterfinal: 4th vs 5th
    nodes.push({
      id: "qf",
      type: "match",
      data: {
        label: "Quarterfinal (4th vs 5th)",
        team1: sortedTeams[3],
        team2: sortedTeams[4],
        stage: "quarterfinal",
      },
      position: { x: xStart, y: yStart + yGap },
    });

    // Semifinal 1: 1st seed vs TBD (winner of QF)
    nodes.push({
      id: "sf1",
      type: "match",
      data: {
        label: "Semifinal 1 (1st vs Winner QF)",
        team1: sortedTeams[0],
        team2: { name: "TBD" },
        stage: "semifinal",
      },
      position: { x: xStart + xGap, y: yStart + yGap },
    });

    // Semifinal 2: 2nd vs 3rd
    nodes.push({
      id: "sf2",
      type: "match",
      data: {
        label: "Semifinal 2 (2nd vs 3rd)",
        team1: sortedTeams[1],
        team2: sortedTeams[2],
        stage: "semifinal",
      },
      position: { x: xStart + xGap, y: yStart },
    });

    // Final
    nodes.push({
      id: "final",
      type: "match",
      data: {
        label: "Final",
        team1: sortedTeams[1],
        team2: { name: "TBD" },
        stage: "finals",
      },
      position: { x: xStart + xGap * 2, y: yStart + yGap / 2 },
    });

    // Champion
    nodes.push({
      id: "champion",
      type: "match",
      data: {
        label: "👑 Champion",
        stage: "champion",
      },
      position: { x: xStart + xGap * 3, y: yStart + yGap / 2 },
    });

    // Edges
    edges.push(
      {
        id: "e-qf-sf1",
        source: "qf",
        target: "sf1",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf1-final",
        source: "sf1",
        target: "final",
        markerEnd: { type: MarkerType.Arrow },
        style: { stroke: "#FFFFFF", strokeWidth: 2 },
        type: "smoothstep",
      },
      {
        id: "e-sf2-final",
        source: "sf2",
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

  // Generate bracket for Division 2 (hardcoded QF matchups)
  const generateDivision2Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Helper to find team by name (case-insensitive, trimmed)
    const findTeam = (name: string) =>
      sortedTeams.find(
        (t) => t.name?.trim().toLowerCase() === name.trim().toLowerCase()
      ) || { name };

    // Layout
    const xStart = 50;
    const xGap = 200;
    const yStart = 100;
    const yGap = 80;

    // Quarterfinals (hardcoded)
    nodes.push(
      {
        id: "qf-1",
        type: "match",
        data: {
          label: "Quarterfinal 1",
          team1: findTeam("BDC"),
          team2: findTeam("Lughs Last Hitters"),
          stage: "quarterfinal",
        },
        position: { x: xStart, y: yStart },
      },
      {
        id: "qf-2",
        type: "match",
        data: {
          label: "Quarterfinal 2",
          team1: findTeam("Fear the Samurai"),
          team2: findTeam("Cavan Champions"),
          stage: "quarterfinal",
        },
        position: { x: xStart, y: yStart + yGap },
      },
      {
        id: "qf-3",
        type: "match",
        data: {
          label: "Quarterfinal 3",
          team1: findTeam("Creep Enjoyers"),
          team2: findTeam("Ausgang"),
          stage: "quarterfinal",
        },
        position: { x: xStart, y: yStart + yGap * 2 },
      },
      {
        id: "qf-4",
        type: "match",
        data: {
          label: "Quarterfinal 4",
          team1: findTeam("Mike's Army"),
          team2: findTeam("Cavan Chumpions"),
          stage: "quarterfinal",
        },
        position: { x: xStart, y: yStart + yGap * 3 },
      }
    );

    // Semifinals (TBD)
    nodes.push(
      {
        id: "sf-1",
        type: "match",
        data: {
          label: "Semifinal 1",
          team1: { name: "TBD" },
          team2: findTeam("Cavan Champions"),
          stage: "semifinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap / 2 },
      },
      {
        id: "sf-2",
        type: "match",
        data: {
          label: "Semifinal 2",
          team1: findTeam("Creep Enjoyers"),
          team2: findTeam("Cavan Chumpions"),
          stage: "semifinal",
        },
        position: { x: xStart + xGap, y: yStart + yGap * 2.5 },
      }
    );

    // Final
    nodes.push({
      id: "final",
      type: "match",
      data: {
        label: "Final",
        team1: { name: "TBD" },
        team2: { name: "TBD" },
        stage: "finals",
      },
      position: { x: xStart + xGap * 2, y: yStart + yGap * 1.5 },
    });

    // Champion
    nodes.push({
      id: "champion",
      type: "match",
      data: {
        label: "👑 Champion",
        team1: { name: "TBD" },
        stage: "champion",
      },
      position: { x: xStart + xGap * 3, y: yStart + yGap * 1.5 },
    });

    // Edges
    edges.push(
      { id: "e-qf1-sf1", source: "qf-1", target: "sf-1", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-qf2-sf1", source: "qf-2", target: "sf-1", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-qf3-sf2", source: "qf-3", target: "sf-2", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-qf4-sf2", source: "qf-4", target: "sf-2", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-sf1-final", source: "sf-1", target: "final", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-sf2-final", source: "sf-2", target: "final", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" },
      { id: "e-final-champion", source: "final", target: "champion", markerEnd: { type: MarkerType.Arrow }, style: { stroke: "#FFFFFF", strokeWidth: 2 }, type: "smoothstep" }
    );

    return { nodes, edges };
  }, [sortedTeams]);

  // Generate bracket for Division 3 (2 semifinals: 1st vs 4th, 2nd vs 3rd)
  const generateDivision3Bracket = useCallback(() => {
    const nodes: any[] = [];
    const edges: any[] = [];

    // Layout
    const xStart = 50;
    const xGap = 250;
    const yStart = 100;
    const yGap = 120;

    // Semifinals
    nodes.push(
      {
        id: "sf-1",
        type: "match",
        data: {
          label: "Semifinal 1 (1st vs 4th)",
          team1: sortedTeams[0],
          team2: sortedTeams[3],
          stage: "semifinal",
        },
        position: { x: xStart, y: yStart },
      },
      {
        id: "sf-2",
        type: "match",
        data: {
          label: "Semifinal 2 (2nd vs 3rd)",
          team1: sortedTeams[1],
          team2: sortedTeams[2],
          stage: "semifinal",
        },
        position: { x: xStart, y: yStart + yGap },
      }
    );

    // Final
    nodes.push({
      id: "final",
      type: "match",
      data: {
        label: "Final",
        team1: sortedTeams[0],
        team2: sortedTeams[2],
        stage: "finals",
      },
      position: { x: xStart + xGap, y: yStart + yGap / 2 },
    });

    // Champion
    nodes.push({
      id: "champion",
      type: "match",
      data: {
        label: "👑 Champion",
        stage: "champion",
      },
      position: { x: xStart + xGap * 2, y: yStart + yGap / 2 },
    });

    // Edges
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

export const SeasonFiveKnockoutBracket: React.FC<KnockoutBracketProps> = ({ teams, division = 1 }) => {
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