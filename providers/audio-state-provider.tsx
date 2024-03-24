import React, { 
  createContext, 
  Dispatch, 
  SetStateAction, 
  useCallback, 
  useState 
} from 'react';

interface AudioContextType {
  isLoaded: boolean;
  playing: boolean;
  setPlaying: Dispatch<SetStateAction<boolean>>;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
  howlInstance: Howl | null;
  setHowlInstance: Dispatch<SetStateAction<Howl | null>>; 
  handleTogglePlay: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ 
  children 
}: { 
  children: React.ReactNode 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [playing, setPlaying] = useState<boolean>(false);
  const [howlInstance, setHowlInstance] = useState<Howl | null>(null);

  const handleTogglePlay = useCallback(() => {
    if (howlInstance) {
      if (playing) {
        howlInstance.pause();
      } else {
        howlInstance.play();
      }
      setPlaying(prevPlaying => !prevPlaying);
    }
  }, [howlInstance, playing]);

  return (
    <AudioContext.Provider value={{ 
      isLoaded, 
      setIsLoaded, 
      playing, 
      setPlaying, 
      handleTogglePlay,
      howlInstance,
      setHowlInstance
    }}>
      {children}
    </AudioContext.Provider>
  );
};