import { NextResponse } from 'next/server'

// Simulated database
let proposals = [
  {
    id: "BARK-001",
    title: "Increase BARK token burn rate",
    description: "Proposal to increase the BARK token burn rate from 1% to 2% per transaction to reduce overall supply.",
    status: 'active',
    votesFor: 15000000,
    votesAgainst: 5000000
  },
  {
    id: "BARK-002",
    title: "Launch BARK NFT collection",
    description: "Introduce a limited edition BARK NFT collection with proceeds going to animal shelters.",
    status: 'passed',
    votesFor: 25000000,
    votesAgainst: 3000000
  },
  {
    id: "BARK-003",
    title: "Reduce staking rewards",
    description: "Proposal to reduce BARK staking rewards from 5% to 3% APY to ensure long-term sustainability.",
    status: 'rejected',
    votesFor: 8000000,
    votesAgainst: 22000000
  }
]

export async function GET() {
  console.log('\x1b[38;2;208;191;180m%s\x1b[0m', 'GET /api/governance - Fetching proposals')
  return NextResponse.json(proposals)
}

export async function POST(request: Request) {
  const data = await request.json()
  console.log('\x1b[38;2;208;191;180m%s\x1b[0m', 'POST /api/governance - Creating new proposal', data)

  if (!data.title || !data.description) {
    return NextResponse.json({ error: 'Title and description are required' }, { status: 400 })
  }

  const newProposal = {
    id: `BARK-${proposals.length + 1}`.padStart(7, '0'),
    title: data.title,
    description: data.description,
    status: 'active',
    votesFor: 0,
    votesAgainst: 0
  }

  proposals.push(newProposal)
  return NextResponse.json(newProposal, { status: 201 })
}

export async function PUT(request: Request) {
  const data = await request.json()
  console.log('\x1b[38;2;208;191;180m%s\x1b[0m', 'PUT /api/governance - Voting on proposal', data)

  if (!data.id || !data.vote) {
    return NextResponse.json({ error: 'Proposal ID and vote are required' }, { status: 400 })
  }

  const proposal = proposals.find(p => p.id === data.id)
  if (!proposal) {
    return NextResponse.json({ error: 'Proposal not found' }, { status: 404 })
  }

  if (proposal.status !== 'active') {
    return NextResponse.json({ error: 'Voting is only allowed on active proposals' }, { status: 400 })
  }

  if (data.vote === 'for') {
    proposal.votesFor += 1
  } else if (data.vote === 'against') {
    proposal.votesAgainst += 1
  } else {
    return NextResponse.json({ error: 'Invalid vote. Must be "for" or "against"' }, { status: 400 })
  }

  return NextResponse.json(proposal)
}
