'use client';

import { motion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  delay?: number;
}

export default function FeatureCard({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) {
  return (
    <motion.div
      className="glass-morphism rounded-xl p-6 hover:glow-cyan transition-all duration-300 group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ scale: 1.05 }}
      viewport={{ once: true }}
    >
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20 group-hover:from-blue-500/30 group-hover:to-cyan-500/30 transition-all duration-300">
          <Icon className="h-8 w-8 text-cyan-400" />
        </div>
        <h3 className="text-xl font-semibold text-white">{title}</h3>
        <p className="text-gray-400 leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
}