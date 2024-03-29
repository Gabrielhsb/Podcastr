import { createContext, useState, ReactNode, useContext }from 'react';

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}


type PlayerContextData = {
  episodeList: Episode[];
  currentEpisodeIndex: number;
  isPlaying: boolean;
  isLooping: boolean;
  isShuffling: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
  playList: (list: Episode[], index: number) => void;
  clearPlayerState: () => void;
  hasPrevious: boolean;
  hasNext: boolean;
}
export const PlayerContext = createContext({} as PlayerContextData);

type PlayerContextProviderProps = {
  children: ReactNode;
};

export function PlayerContextProvider({children} : PlayerContextProviderProps) {
  const [episodeList, setEpisodeList] = useState([]);
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0);
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ isLooping, setIsLooping ] = useState(false);
  const [ isShuffling, setIsShuffling ] = useState(false);


  function play(episode: Episode) {
    setEpisodeList([episode]);
    setCurrentEpisodeIndex(0);
    setIsPlaying(true);
  }
  const hasPrevious = currentEpisodeIndex > 0;
  const hasNext = isShuffling || (currentEpisodeIndex + 1) < episodeList.length;

  function playNext(){

    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if(isShuffling){
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length);
      setCurrentEpisodeIndex(nextRandomEpisodeIndex);
    }else if(hasNext){
        setCurrentEpisodeIndex(nextEpisodeIndex);
      }
    }

  function playPrevious(){
    if(hasPrevious){
      setCurrentEpisodeIndex(currentEpisodeIndex - 1);
    }
  }

  function playList(list: Episode[], index: number){
    setEpisodeList(list);
    setCurrentEpisodeIndex(index);
    setIsPlaying(true);
  }
  function togglePlay() {
    setIsPlaying(!isPlaying);
  }

  function toggleLoop() {
    setIsLooping(!isLooping);
  }

  function clearPlayerState() {
    setEpisodeList([]);
    setCurrentEpisodeIndex(0);
  }
  function toggleShuffle() {
    setIsShuffling(!isShuffling);
  }
  function setPlayingState(state: boolean) {
    setIsPlaying(state);
  }
  return (

    <PlayerContext.Provider value={{
      episodeList, 
      currentEpisodeIndex, 
      play, 
      isPlaying,
      isLooping, 
      isShuffling,
      togglePlay,
      toggleLoop,
      setPlayingState,
      playList,
      playNext,
      playPrevious,
      hasPrevious,
      hasNext,
      toggleShuffle,
      clearPlayerState,
      }}>
      {children}
      </PlayerContext.Provider>
  )
}

export const usePlayer = () => {
  return useContext(PlayerContext);
}