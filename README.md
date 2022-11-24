# osu-parser

Osu map parser

Translate this:

```
osu file format v14

[General]
AudioFilename: audio.mp3
AudioLeadIn: 0
PreviewTime: 15664
Countdown: 0
SampleSet: Normal
StackLeniency: 0.7
Mode: 1
LetterboxInBreaks: 0
WidescreenStoryboard: 1

[Editor]
DistanceSpacing: 1.9
BeatDivisor: 4
GridSize: 8
TimelineZoom: 2.1

[Metadata]
Title:Can You Feel My Heart (Cut Ver.)
TitleUnicode:Can You Feel My Heart (Cut Ver.)
Artist:Bring Me The Horizon
ArtistUnicode:Bring Me The Horizon
Creator:Yui Funami
Version:[-E S I A-]'s Kantan
Source:
Tags:alternative metal rock metalcore english enjoyer fan meme bmth e_s_i_a [-e_s_i_a-] esia [-esia-] arcpotato joltzzz Sempiternal sony music rca records gigachad
BeatmapID:3870264
BeatmapSetID:1857899

[Difficulty]
HPDrainRate:9
CircleSize:2
OverallDifficulty:2
ApproachRate:10
SliderMultiplier:1.4
SliderTickRate:1

[Events]
0,0,"bg.jpg",0,0

[TimingPoints]
664,468.75,4,1,0,60,1,0
13789,-100,4,1,0,65,0,0
70039,-100,4,1,0,10,0,0
71914,-100,4,1,0,5,0,0


[HitObjects]
306,203,664,5,0,0:0:0:0:
281,265,1367,1,8,0:0:0:0:
359,229,64414,1,12,0:0:0:0:
256,192,64882,12,0,71914,0:0:0:0:

```

Into this:

```
{
  General: {},
  Editor: {},
  Metadata: { Version: 'Chad', BeatmapID: '3818671', BeatmapSetID: '1857899' },
  Difficulty: {
    HPDrainRate: '6',
    CircleSize: '2',
    OverallDifficulty: '5',
    ApproachRate: '10',
    SliderTickRate: '1'
  },
  Events: {},
  TimingPoints: [
    '664,468.75,4,1,0,60,1,0',
    '70039,-100,4,1,0,10,0,0',
    '71914,-100,4,1,0,5,0,0',
    ...
  ],
  HitObjects: [
    '251,187,664,5,0,0:0:0:0:',
    '250,188,1015,1,0,0:0:0:0:',
    '248,190,1367,1,8,0:0:0:0:',
    '88,198,29492,1,0,0:0:0:0:',
    '154,199,29609,1,0,0:0:0:0:',
    '248,190,29726,1,8,0:0:0:0:',
    '248,190,29960,1,0,0:0:0:0:',
    ...
  ]
}
```
