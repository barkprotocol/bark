'use client'

import React from 'react'
import { Gallery, GalleryItem } from './gallery'

const clubImageUrl = "https://example.com/underdogs-logo.png" // Replace with actual logo URL

const members: GalleryItem[] = [
  {
    id: 1,
    title: "Diesel",
    subtitle: "President NFT",
    description: "A gruff Rottweiler NFT with a heart of gold, Diesel leads the Underdogs with unwavering loyalty and strength.",
    imageUrl: clubImageUrl,
    badge: "Founder NFT",
  },
  {
    id: 2,
    title: "Rebel",
    subtitle: "Vice President CNFT",
    description: "A sleek Doberman compressed NFT known for his strategic mind and fierce protection of the club.",
    imageUrl: clubImageUrl,
    badge: "Officer CNFT",
  },
  {
    id: 3,
    title: "Scrapper",
    subtitle: "Sergeant at Arms NFT",
    description: "A scrappy Jack Russell Terrier NFT who maintains order and isn't afraid to get into the thick of things.",
    imageUrl: clubImageUrl,
    badge: "Officer NFT",
  },
  {
    id: 4,
    title: "Throttle",
    subtitle: "Road Captain CNFT",
    description: "A sleek Greyhound compressed NFT who plans the best routes and leads the pack on thrilling digital rides.",
    imageUrl: clubImageUrl,
    badge: "Officer CNFT",
  },
  {
    id: 5,
    title: "Wrench",
    subtitle: "Mechanic NFT",
    description: "A clever Border Collie NFT with an uncanny ability to fix any smart contract issue that comes up.",
    imageUrl: clubImageUrl,
    badge: "Member NFT",
  },
  {
    id: 6,
    title: "Shadow",
    subtitle: "Scout CNFT",
    description: "A stealthy Black Labrador compressed NFT who keeps an eye out for blockchain opportunities for the club.",
    imageUrl: clubImageUrl,
    badge: "Member CNFT",
  },
  {
    id: 7,
    title: "Patches",
    subtitle: "Secretary NFT",
    description: "A detail-oriented Beagle NFT who keeps the club's digital records and manages on-chain communications.",
    imageUrl: clubImageUrl,
    badge: "Officer NFT",
  },
  {
    id: 8,
    title: "Growler",
    subtitle: "Treasurer CNFT",
    description: "An intimidating Bulldog compressed NFT who manages the club's crypto finances with a surprisingly gentle touch.",
    imageUrl: clubImageUrl,
    badge: "Officer CNFT",
  },
  {
    id: 9,
    title: "Maverick",
    subtitle: "Prospect NFT",
    description: "An eager German Shepherd NFT pup, working hard to earn his place in the Underdogs MC digital ecosystem.",
    imageUrl: clubImageUrl,
    badge: "Prospect NFT",
  },
]

export default function UnderdogsGallery() {
  return (
    <Gallery
      items={members}
      title="Meet the Underdogs MC NFT Collection"
      description="Get to know the rough and tough canine NFTs and CNFTs that make up our digital motorcycle club!"
      columns={3}
    />
  )
}

