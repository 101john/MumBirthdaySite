import { motion } from 'framer-motion';
import { Home, Film, Gamepad2, Music, Heart } from 'lucide-react';

interface NavigationProps {
  currentSection: string;
  onSectionChange: (section: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentSection, onSectionChange }) => {
  const navItems = [
    { id: 'hero', label: 'Home', icon: Home },
    { id: 'videos', label: 'Movies', icon: Film },
    { id: 'games', label: 'Games', icon: Gamepad2 },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'celebration', label: 'Celebrate', icon: Heart }
  ];

  return (
    <motion.nav
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50"
    >
      <div className="bg-white/90 backdrop-blur-lg rounded-full px-2 py-2 shadow-2xl border border-white/20">
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            const isActive = currentSection === item.id;

            return (
              <motion.button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={`relative px-4 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                  isActive
                    ? 'text-white'
                    : 'text-gray-600 hover:text-purple-600'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeBackground"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full"
                    transition={{ duration: 0.3 }}
                  />
                )}
                <div className="relative z-10 flex items-center gap-2">
                  <IconComponent className="w-5 h-5" />
                  {isActive && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: 'auto' }}
                      exit={{ opacity: 0, width: 0 }}
                      className="font-medium text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;