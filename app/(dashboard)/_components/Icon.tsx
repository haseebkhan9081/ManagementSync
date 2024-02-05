import { LucideProps } from 'lucide-react';

function Icon({ icon: Icon }: { icon: React.FC<LucideProps> }) {
  return <Icon className="text-customTeal" />;
}
export default Icon;