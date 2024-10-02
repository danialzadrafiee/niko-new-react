import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Fundraise } from "./types"
import { Eye } from "lucide-react"

interface FundraiseCardProps {
  fundraise: Fundraise
  title: string
  onViewDetails: (fundraise: Fundraise) => void
}

const FundraiseCard: React.FC<FundraiseCardProps> = ({ fundraise, title, onViewDetails }) => {
  return (
    <Card className="mb-4 overflow-hidden">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-sm">{fundraise.title}</h3>
          <span className="text-xs px-2 py-1 bg-secondary rounded-full">{fundraise.status}</span>
        </div>
        <Progress value={fundraise.completion_percentage} className="h-2 mb-2" />
        <div className="flex justify-between text-xs mb-2">
          <span>{fundraise.price_collected.toLocaleString()} تومان</span>
          <span>{fundraise.completion_percentage.toFixed(0)}%</span>
          <span>{fundraise.price_total.toLocaleString()} تومان</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">{title}</span>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => onViewDetails(fundraise)}
            className="p-1 h-auto"
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default FundraiseCard