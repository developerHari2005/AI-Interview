import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Interview Platform - Secure, Scalable, Fair Assessments',
  description: 'Revolutionary AI-powered interview platform with advanced proctoring, plagiarism detection, and real-time analytics.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-900 text-white antialiased">
        {children}
      </body>
    </html>
  );
}