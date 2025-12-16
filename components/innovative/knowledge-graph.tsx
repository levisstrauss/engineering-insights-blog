"use client"

import { motion } from "framer-motion"
import { useRef, useState } from "react"
import { X, ZoomIn, ZoomOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface Node {
  id: string
  label: string
  category: string
  x: number
  y: number
  connections: string[]
}

const MOCK_NODES: Node[] = [
  { id: "1", label: "Machine Learning", category: "AI/ML", x: 250, y: 200, connections: ["2", "3", "4"] },
  { id: "2", label: "Neural Networks", category: "AI/ML", x: 400, y: 100, connections: ["1", "5"] },
  { id: "3", label: "Python", category: "Programming", x: 100, y: 300, connections: ["1", "6"] },
  { id: "4", label: "Data Science", category: "Data", x: 400, y: 300, connections: ["1", "7"] },
  { id: "5", label: "Deep Learning", category: "AI/ML", x: 500, y: 200, connections: ["2", "8"] },
  { id: "6", label: "TensorFlow", category: "Frameworks", x: 150, y: 150, connections: ["3", "5"] },
  { id: "7", label: "Statistics", category: "Data", x: 350, y: 400, connections: ["4"] },
  { id: "8", label: "Computer Vision", category: "AI/ML", x: 550, y: 350, connections: ["5"] },
]

const CATEGORY_COLORS: Record<string, string> = {
  "AI/ML": "from-purple-500 to-pink-500",
  Programming: "from-blue-500 to-cyan-500",
  Data: "from-green-500 to-emerald-500",
  Frameworks: "from-orange-500 to-amber-500",
}

export function KnowledgeGraph({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [selectedNode, setSelectedNode] = useState<Node | null>(null)
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-background/95 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold">Knowledge Graph</h2>
          <p className="text-muted-foreground">Explore how topics connect</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setZoom((z) => Math.max(0.5, z - 0.1))}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm font-mono w-16 text-center">{Math.round(zoom * 100)}%</span>
          <button
            onClick={() => setZoom((z) => Math.min(2, z + 0.1))}
            className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
          >
            <ZoomIn className="w-5 h-5" />
          </button>
          <button onClick={onClose} className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors ml-4">
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Graph Container */}
      <div ref={containerRef} className="absolute inset-0 top-24 overflow-hidden" style={{ cursor: "grab" }}>
        <svg className="w-full h-full" style={{ transform: `scale(${zoom})`, transformOrigin: "center" }}>
          {/* Connections */}
          {MOCK_NODES.map((node) =>
            node.connections.map((targetId) => {
              const target = MOCK_NODES.find((n) => n.id === targetId)
              if (!target) return null

              const isHighlighted =
                hoveredNode === node.id ||
                hoveredNode === targetId ||
                selectedNode?.id === node.id ||
                selectedNode?.id === targetId

              return (
                <motion.line
                  key={`${node.id}-${targetId}`}
                  x1={node.x}
                  y1={node.y}
                  x2={target.x}
                  y2={target.y}
                  stroke={isHighlighted ? "#d4af37" : "#333"}
                  strokeWidth={isHighlighted ? 2 : 1}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: isHighlighted ? 1 : 0.3 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              )
            }),
          )}

          {/* Nodes */}
          {MOCK_NODES.map((node, index) => {
            const isHighlighted =
              hoveredNode === node.id ||
              selectedNode?.id === node.id ||
              (hoveredNode && node.connections.includes(hoveredNode)) ||
              (selectedNode && node.connections.includes(selectedNode.id))

            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, type: "spring" }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                onClick={() => setSelectedNode(node)}
                style={{ cursor: "pointer" }}
              >
                {/* Glow effect */}
                {isHighlighted && (
                  <motion.circle
                    cx={node.x}
                    cy={node.y}
                    r={40}
                    fill="url(#nodeGlow)"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                  />
                )}

                {/* Node circle */}
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isHighlighted ? 28 : 24}
                  className={cn("transition-all duration-300", isHighlighted ? "fill-gold" : "fill-muted")}
                  stroke={isHighlighted ? "#d4af37" : "#444"}
                  strokeWidth={2}
                />

                {/* Node label */}
                <text
                  x={node.x}
                  y={node.y + 45}
                  textAnchor="middle"
                  className={cn(
                    "text-xs font-medium transition-colors",
                    isHighlighted ? "fill-gold" : "fill-foreground",
                  )}
                >
                  {node.label}
                </text>

                {/* Category badge */}
                <text x={node.x} y={node.y + 4} textAnchor="middle" className="text-[10px] fill-background font-bold">
                  {node.label.substring(0, 2).toUpperCase()}
                </text>
              </motion.g>
            )
          })}

          {/* Gradient definitions */}
          <defs>
            <radialGradient id="nodeGlow">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      {/* Selected Node Details */}
      {selectedNode && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="absolute right-6 top-24 w-80 glass-card rounded-2xl border border-gold/20 p-5"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display text-lg font-semibold">{selectedNode.label}</h3>
            <button onClick={() => setSelectedNode(null)} className="p-1 rounded-lg hover:bg-muted transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div
            className={cn(
              "inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-4",
              `bg-gradient-to-r ${CATEGORY_COLORS[selectedNode.category]}`,
            )}
          >
            {selectedNode.category}
          </div>

          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-2">Connected Topics:</p>
            <div className="flex flex-wrap gap-2">
              {selectedNode.connections.map((connId) => {
                const connNode = MOCK_NODES.find((n) => n.id === connId)
                return connNode ? (
                  <button
                    key={connId}
                    onClick={() => setSelectedNode(connNode)}
                    className="px-3 py-1 rounded-lg bg-muted hover:bg-gold/20 hover:text-gold transition-colors text-sm"
                  >
                    {connNode.label}
                  </button>
                ) : null
              })}
            </div>
          </div>

          <button className="w-full py-2 rounded-xl bg-gold text-background font-medium hover:bg-gold-dark transition-colors">
            Explore Articles
          </button>
        </motion.div>
      )}

      {/* Legend */}
      <div className="absolute bottom-6 left-6 glass-card rounded-xl border border-border/50 p-4">
        <p className="text-xs font-medium mb-2">Categories</p>
        <div className="flex flex-wrap gap-2">
          {Object.entries(CATEGORY_COLORS).map(([category, color]) => (
            <div key={category} className="flex items-center gap-1.5">
              <div className={cn("w-3 h-3 rounded-full", `bg-gradient-to-r ${color}`)} />
              <span className="text-xs text-muted-foreground">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
