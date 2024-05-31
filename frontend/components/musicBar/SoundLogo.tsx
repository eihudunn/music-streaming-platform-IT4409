'use client';

import React, { useEffect, useState } from 'react';
import MutedVolume from '@/components/musicBar/musicBar_logos/Muted_volume';
import LowVolume from '@/components/musicBar/musicBar_logos/low_volume';
import MediumVolume from '@/components/musicBar/musicBar_logos/Medium_volume';
import HighVolume from '@/components/musicBar/musicBar_logos/High_volume';
import ConfigButton from './ConfigButton';

interface SoundLogoProps {
  volume: number;
}

const SoundLogo: React.FC<SoundLogoProps> = ({ volume }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getVolumeIcon = () => {
    if (volume === 0) return <MutedVolume />;
    if (volume <= 0.3) return <LowVolume />;
    if (volume <= 0.65) return <MediumVolume />;
    return <HighVolume />;
  };

  if (!isClient) {
    return null; // Wait for client-side render
  }

  return <ConfigButton>{getVolumeIcon()}</ConfigButton>;
};

export default SoundLogo;
