import { Cloud } from 'react-icon-cloud'

export const cloudProps = {
  containerProps: {
    style: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
    },
  },
  options: {
    reverse:        true,
    depth:          1,
    wheelZoom:      false,
    imageScale:     1.3,
    activeCursor:   'pointer',
    tooltip:        'native',
    initial:        [0.08, -0.06],
    clickToFront:   600,
    tooltipDelay:   0,
    outlineColour:  '#0000',
    maxSpeed:       0.05,
    minSpeed:       0.02,
    fadeIn:         1200,
    imageMode:      'image',
    bgColour:       '#0000',
    textColour:     '#0000',
    noSelect:       true,
    pulsateTo:      0,
    shape:          'sphere',
  },
}

export { Cloud }
