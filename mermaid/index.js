'use strict';

const { lightTheme, darkTheme, colors } = require('bold-ui');

// Bold categorical palette for Mermaid diagram color scales.
// Uses the mid-tone shades from each Bold color family.
const CSCALE_LIGHT = [
  colors.blue.c40,      // #0069D0 - primary
  colors.turquoise.c40, // #02786D
  colors.purple.c40,    // #AB00E7
  colors.green.c40,     // #217B00
  colors.orange.c50,    // #C85D00
  colors.red.c40,       // #D01E29
  colors.pink.c40,      // #C8206F (if available)
  colors.gray.c40,      // #696979
  colors.blue.c30,      // #0051A2
  colors.turquoise.c60, // lighter teal
  colors.purple.c60,    // lighter purple
  colors.yellow ? colors.yellow.c40 : '#866600',
];

const CSCALE_DARK = [
  colors.blue.c60,      // #498FFF
  colors.turquoise.c60,
  colors.purple.c60,
  colors.green.c60,     // #40A42B
  colors.orange.c70,    // #FF8C54
  colors.red.c60,       // #F75B60
  colors.pink ? colors.pink.c60 : '#E25EA0',
  colors.gray.c60,      // #8F8FA2
  colors.blue.c70,      // #84AAFF
  colors.turquoise.c40,
  colors.purple.c40,
  colors.yellow ? colors.yellow.c60 : '#D4A800',
];

function cScaleEntries(scale) {
  return Object.fromEntries(scale.filter(Boolean).map((v, i) => [`cScale${i}`, v]));
}

const lp = lightTheme.pallete;
const dp = darkTheme.pallete;

const light = {
  theme: 'base',
  themeVariables: {
    background:            lp.surface.main,
    primaryColor:          lp.surface.background,
    primaryTextColor:      lp.text.main,
    primaryBorderColor:    lp.divider,
    secondaryColor:        lp.surface.background,
    secondaryTextColor:    lp.text.secondary,
    secondaryBorderColor:  lp.divider,
    tertiaryColor:         lp.surface.main,
    tertiaryTextColor:     lp.text.main,
    tertiaryBorderColor:   lp.divider,

    lineColor:             lp.text.secondary,
    textColor:             lp.text.main,
    mainBkg:               lp.surface.background,
    nodeBkg:               lp.surface.background,
    nodeBorder:            lp.divider,
    clusterBkg:            lp.surface.main,
    clusterBorder:         lp.divider,
    defaultLinkColor:      lp.primary.main,
    titleColor:            lp.text.main,
    edgeLabelBackground:   lp.surface.main,
    labelBackground:       lp.surface.main,
    labelColor:            lp.text.main,

    fontFamily:            "'IBM Plex Sans', sans-serif",
    fontSize:              '16px',

    actorBkg:              lp.surface.background,
    actorBorder:           lp.divider,
    actorTextColor:        lp.text.main,
    actorLineColor:        lp.divider,
    signalColor:           lp.text.main,
    signalTextColor:       lp.text.main,
    labelBoxBkgColor:      lp.surface.background,
    labelBoxBorderColor:   lp.divider,
    labelTextColor:        lp.text.main,
    loopTextColor:         lp.text.main,
    noteBorderColor:       lp.divider,
    noteBkgColor:          lp.surface.background,
    noteTextColor:         lp.text.main,
    activationBorderColor: lp.primary.main,
    activationBkgColor:    lp.surface.background,

    errorBkgColor:         lp.status.danger.background,
    errorTextColor:        lp.status.danger.main,

    ...cScaleEntries(CSCALE_LIGHT),
  },
};

const dark = {
  theme: 'base',
  themeVariables: {
    background:            dp.surface.main,
    primaryColor:          dp.surface.background,
    primaryTextColor:      dp.text.main,
    primaryBorderColor:    dp.divider,
    secondaryColor:        dp.surface.background,
    secondaryTextColor:    dp.text.secondary,
    secondaryBorderColor:  dp.divider,
    tertiaryColor:         dp.surface.main,
    tertiaryTextColor:     dp.text.main,
    tertiaryBorderColor:   dp.divider,

    lineColor:             dp.text.secondary,
    textColor:             dp.text.main,
    mainBkg:               dp.surface.background,
    nodeBkg:               dp.surface.background,
    nodeBorder:            dp.divider,
    clusterBkg:            dp.surface.main,
    clusterBorder:         dp.divider,
    defaultLinkColor:      dp.primary.main,
    titleColor:            dp.text.main,
    edgeLabelBackground:   dp.surface.background,
    labelBackground:       dp.surface.background,
    labelColor:            dp.text.main,

    fontFamily:            "'IBM Plex Sans', sans-serif",
    fontSize:              '16px',

    actorBkg:              dp.surface.background,
    actorBorder:           dp.divider,
    actorTextColor:        dp.text.main,
    actorLineColor:        dp.divider,
    signalColor:           dp.text.main,
    signalTextColor:       dp.text.main,
    labelBoxBkgColor:      dp.surface.background,
    labelBoxBorderColor:   dp.divider,
    labelTextColor:        dp.text.main,
    loopTextColor:         dp.text.main,
    noteBorderColor:       dp.divider,
    noteBkgColor:          dp.surface.background,
    noteTextColor:         dp.text.main,
    activationBorderColor: dp.primary.main,
    activationBkgColor:    dp.surface.background,

    errorBkgColor:         dp.status.danger.background,
    errorTextColor:        dp.status.danger.main,

    ...cScaleEntries(CSCALE_DARK),
  },
};

module.exports = { light, dark };
