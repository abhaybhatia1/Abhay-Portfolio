import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Server, Database, ShieldCheck, Activity, Cpu } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { sounds } from '../utils/audio';

const nodes = [
  {
    id: 'gateway',
    name: 'API Gateway',
    sub: 'Spring Cloud',
    icon: Server,
    color: 'text-purple-400',
    colorLight: 'text-purple-700',
    border: 'border-purple-500/40',
    glow: 'rgba(168,85,247,0.3)',
    desc: 'Centralized non-blocking router handling token bucket rate limiting & path routing.',
    metric: '99.98% uptime'
  },
  {
    id: 'auth',
    name: 'Auth Guard',
    sub: 'Spring Security',
    icon: ShieldCheck,
    color: 'text-emerald-400',
    colorLight: 'text-emerald-700',
    border: 'border-emerald-500/40',
    glow: 'rgba(16,185,129,0.3)',
    desc: 'Stateless JWT validation filter with role-based endpoint authorization.',
    metric: '0.4ms latency'
  },
  {
    id: 'services',
    name: 'Core Services',
    sub: 'REST Engine',
    icon: Cpu,
    color: 'text-sky-400',
    colorLight: 'text-sky-700',
    border: 'border-sky-500/40',
    glow: 'rgba(56,189,248,0.3)',
    desc: 'Business logic domain layer with transaction atomicity & JPA caching.',
    metric: '1,420 req/s'
  },
  {
    id: 'storage',
    name: 'Persistence',
    sub: 'MySQL + Redis',
    icon: Database,
    color: 'text-violet-400',
    colorLight: 'text-violet-700',
    border: 'border-violet-500/40',
    glow: 'rgba(139,92,246,0.3)',
    desc: 'Optimized relational schema with compound indexing and HikariCP connection pooling.',
    metric: '94.6% hit rate'
  }
];

export default function ArchitectureConsole() {
  const [selectedNode, setSelectedNode] = useState(nodes[0]);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleNodeClick = (node, index) => {
    sounds.playChime(index);
    setSelectedNode(node);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full rounded-2xl border p-5 md:p-6 transition-all duration-300 liquid-glass ${
        isLight
          ? 'bg-white/85 border-purple-200/90 shadow-xl shadow-purple-900/5'
          : 'bg-[#0b0816]/80 border-white/[0.08] shadow-2xl shadow-black/80'
      }`}
    >
      {/* Console Header Bar */}
      <div className={`flex items-center justify-between border-b pb-4 mb-5 ${
        isLight ? 'border-purple-200/60' : 'border-white/[0.08]'
      }`}>
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className={`text-[11px] font-mono tracking-widest uppercase ml-2 font-bold ${
            isLight ? 'text-purple-950/70' : 'text-neutral-400'
          }`}>
            System Topology // Live
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" />
          <span className="text-[11px] font-mono text-emerald-600 dark:text-emerald-400 font-bold tracking-wider">
            HEALTHY : 14ms
          </span>
        </div>
      </div>

      {/* Interactive Microservices Pipeline Nodes */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 relative mb-5">
        {nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode.id === node.id;

          return (
            <motion.button
              key={node.id}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onMouseEnter={() => sounds.playHover()}
              onClick={() => handleNodeClick(node, index)}
              className={`relative text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer ${
                isSelected
                  ? isLight
                    ? 'bg-purple-100/90 border-purple-500/70 shadow-md shadow-purple-500/10'
                    : 'bg-purple-500/15 border-purple-400/70 shadow-[0_0_20px_rgba(168,85,247,0.25)]'
                  : isLight
                  ? 'bg-white/60 border-purple-200/60 hover:bg-white hover:border-purple-300'
                  : 'bg-white/[0.02] border-white/[0.05] hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <Icon size={16} className={isLight ? node.colorLight : node.color} />
                <span className={`text-[9px] font-mono font-bold uppercase tracking-wider ${
                  isLight ? 'text-purple-900/60' : 'text-neutral-400'
                }`}>
                  {node.metric}
                </span>
              </div>
              <p className={`text-xs font-black leading-tight tracking-tight ${
                isLight ? 'text-[#140827]' : 'text-white'
              }`}>
                {node.name}
              </p>
              <p className={`text-[10px] font-mono mt-0.5 font-semibold ${
                isLight ? 'text-purple-800/80' : 'text-neutral-400'
              }`}>
                {node.sub}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Dynamic Data Flow Cable Simulation */}
      <div className="relative h-2 w-full rounded-full overflow-hidden mb-4 opacity-80 bg-purple-500/15">
        <motion.div
          className="h-full w-28 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
          animate={{ x: ['-100%', '600%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
        />
      </div>

      {/* Active Node Telemetry Panel */}
      <div className={`p-4 rounded-xl border text-xs font-mono transition-all liquid-glass ${
        isLight
          ? 'bg-purple-50/90 border-purple-200/90 text-purple-950'
          : 'bg-white/[0.03] border-white/[0.08] text-neutral-300'
      }`}>
        <div className="flex items-center justify-between mb-1.5">
          <div className="flex items-center gap-1.5 font-bold text-purple-600 dark:text-purple-300">
            <Activity size={14} />
            <span className="font-sans font-bold">{selectedNode.name} Inspector</span>
          </div>
          <span className={`text-[10px] font-bold ${
            isLight ? 'text-purple-900/70' : 'text-neutral-400'
          }`}>
            Status: ACTIVE
          </span>
        </div>
        <p className={`text-xs leading-relaxed font-sans ${
          isLight ? 'text-[#30214c]' : 'text-neutral-300'
        }`}>
          {selectedNode.desc}
        </p>
      </div>
    </motion.div>
  );
}
