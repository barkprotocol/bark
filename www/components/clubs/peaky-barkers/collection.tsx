'use client'

import React from 'react'
import { Gallery, GalleryItem } from './gallery'

const clubImageUrl = "https://example.com/underdogs-nft-logo.png" // Replace with actual NFT logo URL

const collectionItems: GalleryItem[] = [
  {
    id: 1,
    title: "Digital Leather Vest",
    subtitle: "Official Club NFT",
    description: "The iconic digital leather vest worn by Underdogs MC NFT holders, featuring the club's logo. Compressed CNFT for efficient storage.",
    imageUrl: clubImageUrl,
    badge: "Essential",
    link: "#digital-leather-vest"
  },
  {
    id: 2,
    title: "Pixel Spiked Collar",
    subtitle: "Rare Accessory NFT",
    description: "A pixelated tough leather collar with metal spikes, symbolizing the Underdogs' fierce loyalty and protection in the digital realm.",
    imageUrl: clubImageUrl,
    badge: "Rare",
    link: "#pixel-spiked-collar"
  },
  {
    id: 3,
    title: "Holographic Bandana",
    subtitle: "Animated NFT",
    description: "A holographic bandana featuring the club's animated paw print design, perfect for virtual rides or club gatherings.",
    imageUrl: clubImageUrl,
    badge: "Animated",
    link: "#holographic-bandana"
  },
  {
    id: 4,
    title: "Crypto Wrench",
    subtitle: "Utility NFT",
    description: "A digital wrench NFT that provides special privileges within the Underdogs MC ecosystem.",
    imageUrl: clubImageUrl,
    badge: "Utility",
    link: "#crypto-wrench"
  },
  {
    id: 5,
    title: "Virtual Growler",
    subtitle: "Social NFT",
    description: "A virtual mug NFT used for participating in the club's digital events and earning rewards.",
    imageUrl: clubImageUrl,
    badge: "Social",
    link: "#virtual-growler"
  },
  {
    id: 6,
    title: "Quantum Throttle",
    subtitle: "Power-Up NFT",
    description: "A quantum-themed throttle grip NFT that boosts your character's speed in Underdogs MC virtual events.",
    imageUrl: clubImageUrl,
    badge: "Power-Up",
    link: "#quantum-throttle"
  },
]

export default function UnderdogsCollection() {
  return (
    <Gallery
      items={collectionItems}
      title="Underdogs MC NFT Collection"
      description="Explore the unique digital NFTs and compressed CNFTs associated with the Underdogs Motorcycle Club!"
      columns={3}
    />
  )
}

