// DEPENDENCIES
import React from 'react';
// COMPONENTS
import { RingProgress } from '@mantine/core';
// ICONS
import { FcLike, FcFeedIn, FcChargeBattery } from 'react-icons/fc';
import { IoIosWater } from 'react-icons/io';

function Feeling() {
  return (
    <article id="feeling">
      <RingProgress
        size={40}
        thickness={2}
        label={
          <FcLike size={18} />
        }
        sections={
          [
            { value: 80, color: 'cyan' }
          ]
        }
        className="progress"
      />
      <RingProgress
        size={40}
        thickness={2}
        label={
          <FcFeedIn size={18} />
        }
        sections={
          [
            { value: 100, color: 'green' }
          ]
        }
        className="progress"
      />
      <RingProgress
        size={40}
        thickness={2}
        label={
          <IoIosWater size={18} style={{ color: '#0be3af' }} />
        }
        sections={
          [
            { value: 50, color: 'orange' }
          ]
        }
        className="progress"
      />
      <RingProgress
        size={40}
        thickness={2}
        label={
          <FcChargeBattery size={18} />
        }
        sections={
          [
            { value: 15, color: 'red' }
          ]
        }
        className="progress"
      />
    </article>
  )
}

export { Feeling };
