import { ReactNode, MouseEvent } from 'react'
import styled from 'styled-components'
import { Colors } from '@/styles/colors'
import { Button } from '@/components/buttons'

interface TooltipButtonProps {
  color?: string
  label?: string
  children?: ReactNode
  onClick?: (event?: MouseEvent<HTMLButtonElement>) => void
  onMouseDown?: (event?: MouseEvent<HTMLButtonElement>) => void
}

export const TooltipButton = ({ color = Colors.Grey, label, children, ...props }: TooltipButtonProps) => {
  return (
    <TooltipButtonComponent color={color} label={label} {...props}>
      {children}
    </TooltipButtonComponent>
  )
}

const TooltipButtonComponent = styled(Button)<Pick<TooltipButtonProps, 'color' | 'label'>>`
  color: ${({ color }) => color};
  background-color: ${Colors.White};
  width: max-content;
  height: 100%;
  padding: ${({ label }) => (label ? '4px 12px 4px 4px' : '0')};
  transition: all 0.25s ease;

  &:hover,
  &:focus-visible {
    color: ${Colors.Black};
    background-color: ${Colors.Pink};
  }
`
