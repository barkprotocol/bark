import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CloudLightningIcon as Lightning, Shield, Zap } from 'lucide-react'

interface FeatureProps {
  icon: React.ReactNode
  title: string
  description: string
  badge: string
}

const Feature = ({ icon, title, description, badge }: FeatureProps) => (
  <Card className="bg-background/60 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-colors duration-300">
    <CardHeader>
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        {icon}
      </div>
      <div className="flex items-center justify-between mb-2">
        <CardTitle>{title}</CardTitle>
        <Badge variant="secondary">{badge}</Badge>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription>{description}</CardDescription>
    </CardContent>
  </Card>
)

export default function FeatureSection() {
  const features = [
    {
      icon: <Lightning className="w-6 h-6 text-primary" />,
      title: "Fast Transactions",
      description: "Experience lightning-fast transactions on the Solana blockchain, ensuring quick and efficient operations.",
      badge: "Speed"
    },
    {
      icon: <Shield className="w-6 h-6 text-primary" />,
      title: "Secure Protocol",
      description: "Our robust security measures protect your assets and data, providing peace of mind for all users.",
      badge: "Security"
    },
    {
      icon: <Zap className="w-6 h-6 text-primary" />,
      title: "Energy Efficient",
      description: "BARK leverages Solana's energy-efficient consensus mechanism, minimizing environmental impact.",
      badge: "Eco-friendly"
    }
  ]

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-background to-background/80">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4">Features</Badge>
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-4">
            Empowering the Future of MemeFi
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Discover how BARK Protocol is revolutionizing meme-powered finance with cutting-edge features and unparalleled performance.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}