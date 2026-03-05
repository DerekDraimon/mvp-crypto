import { ReactNode } from 'react';

interface SectionProps {
  id: string;
  title: string;
  children: ReactNode;
}

const Section = ({ id, title, children }: SectionProps) => {
  return (
    <section id={id}>
      <h2>{title}</h2>
      {children}
    </section>
  );
};

export default Section;
