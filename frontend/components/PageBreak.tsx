import React from 'react';
import PlayButton from './PlayButton';
import useOnPlay from '@/hooks/useOnPlay';
import { Song } from '@/scheme/Song';

interface PageBreakProps {
  style?: React.CSSProperties;
  songs?: Song[];
  type?: string;
}

const PageBreak: React.FC<PageBreakProps> = ({ style, songs, type }) => {
  const onPlay = useOnPlay(songs as Song[]);

  return (
    <div className="h-20 p-8 flex flex-row items-center" style={style}>
      <PlayButton
        id={songs?.[0].id as string}
        onClick={(id: string) => onPlay(id)}
        isNotHidden={true}
      />
    </div>
  );
};

export default PageBreak;
