import { IconProps } from '@/components/icons/IconBase'

export const CrossIcon = ({ color, size, className }: IconProps) => {
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={className}>
      <path d="M4 4L12 12" stroke={color} strokeWidth="2" />
      <path d="M4 12L12 4" stroke={color} strokeWidth="2" />
    </svg>
  )
}
