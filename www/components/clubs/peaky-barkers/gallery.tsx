'use client'

import React from 'react'
import { Gallery, GalleryItem } from './gallery'
import { StarIcon, BoltIcon, ShieldIcon, BatteryChargingIcon, BrainCircuitIcon, ZapIcon, HeartIcon, LaptopIcon, CompassIcon } from 'lucide-react'

const clubImageUrl = "https://ucarecdn.com/bbc74eca-8e0d-4147-8a66-6589a55ae8d0/bark.webp"

const mascots: GalleryItem[] = [
  {
    id: 1,
    title: "BARK",
    subtitle: "The Visionary",
    description: "BARK combines the tenacity of a Bulldog with the majestic leadership of a Lion. With a sturdy build and a magnificent mane, BARK stands out as the visionary leader of the pack.",
    imageUrl: clubImageUrl,
    badge: "#001",
  },
  {
    id: 2,
    title: "Sparky",
    subtitle: "The Leader",
    description: "Sparky is a bundle of energy with the charm of a French Bulldog and the whirlwind enthusiasm of a Tasmanian Devil. Always seen in his signature flat cap and pinstriped vest.",
    imageUrl: clubImageUrl,
    badge: "#002",
  },
  {
    id: 3,
    title: "Tuffy",
    subtitle: "The Resilient",
    description: "Tuffy embodies resilience with the determination of a Terrier and the fearlessness of a Honey Badger. Small in size but big in spirit, often seen with a bandana and a never-give-up attitude.",
    imageUrl: clubImageUrl,
    badge: "#003",
  },
  {
    id: 4,
    title: "Buster",
    subtitle: "The Energizer",
    description: "Buster is a powerhouse of energy, combining the spirited nature of a Jack Russell with the bouncing prowess of a Kangaroo. Always ready for action with a sweatband and sneakers.",
    imageUrl: clubImageUrl,
    badge: "#004",
  },
  {
    id: 5,
    title: "Trixie",
    subtitle: "The Creative Genius",
    description: "Trixie blends the cleverness of a Fox with the wild creativity of a Tasmanian Devil. Her vibrant orange fur is often speckled with paint, and she's never seen without her trusty idea notebook.",
    imageUrl: clubImageUrl,
    badge: "#005",
  },
  {
    id: 6,
    title: "Bruno",
    subtitle: "The Strong Protector",
    description: "Bruno is the gentle giant of the team, with the loyal heart of a Bulldog and the protective strength of a Bear. He sports a spiked collar and often carries a first-aid kit on his back.",
    imageUrl: clubImageUrl,
    badge: "#006",
  },
  {
    id: 7,
    title: "Dash",
    subtitle: "The Speedster",
    description: "Dash is the team's speedster, blending the sleek speed of a Greyhound with the whirlwind energy of a Tasmanian Devil. Always seen with racing goggles and a lightning bolt collar.",
    imageUrl: clubImageUrl,
    badge: "#007",
  },
  {
    id: 8,
    title: "Bella",
    subtitle: "The Heart of the Team",
    description: "Bella combines the grace of a Cat with the cuddly nature of a Koala. Her soft fur and warm eyes make her approachable to all. She wears a heart-shaped locket containing photos of the entire team.",
    imageUrl: clubImageUrl,
    badge: "#008",
  },
  {
    id: 9,
    title: "Max",
    subtitle: "The Tech Wizard",
    description: "Max merges the wisdom of an Owl with the dynamic energy of a Tasmanian Devil. His feathers have a unique digital pattern, and he's always seen with his high-tech smartglasses.",
    imageUrl: clubImageUrl,
    badge: "#009",
  },
]

export default function PeakyBarkersGallery() {
  return (
    <Gallery
      items={mascots}
      title="Meet the Peaky Barkers"
      description="Discover our pack of extraordinary mascots, each with their unique abilities and charm!"
      columns={3}
    />
  )
}
