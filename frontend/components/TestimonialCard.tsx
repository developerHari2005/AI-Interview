'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
}

export default function TestimonialCard({ name, role, company, quote, avatar }: TestimonialCardProps) {
  return (
    <motion.div
      className="glass-morphism rounded-xl p-6 hover:glow-blue transition-all duration-300 group cursor-pointer min-w-[300px] mx-4"
      whileHover={{ scale: 1.03 }}
    >
      <div className="flex flex-col space-y-4">
        <p className="text-gray-300 italic leading-relaxed">"{quote}"</p>
        <div className="flex items-center space-x-3">
          <Image
            src={avatar}
            alt={name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <div>
            <h4 className="text-white font-semibold">{name}</h4>
            <p className="text-gray-400 text-sm">{role} at {company}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}