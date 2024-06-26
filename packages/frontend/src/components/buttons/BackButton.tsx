import { useCallback } from 'react'
import styled from 'styled-components'
import { ArrowLeftIcon } from '@/components/icons'
import { Colors } from '@/styles/colors'
import { useRouter } from 'next/navigation'

interface BackButtonProps {
  view?: number
  setView?: (view: number) => void
  url?: string
  resetState?: () => void
}

export function BackButton({ view, setView, url, resetState }: BackButtonProps) {
  const router = useRouter()

  const goBack = useCallback(() => {
    if (view && setView) {
      setView(view - 1)
    }
    if (url) {
      router.push(`${url}`)
    }
    if (resetState) {
      resetState()
    }
  }, [setView, view, router, url, resetState])

  return (
    <BackBtn onClick={goBack}>
      <ArrowLeftIcon color={Colors.Black} />
    </BackBtn>
  )
}

const BackBtn = styled.button`
  display: flex;
  align-items: center;
  width: 35px;
  height: 32px;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-color: ${Colors.Transparent};
  color: ${Colors.Black};
  border: 1px solid ${Colors.Black};
  padding: 0;

  &:hover,
  &:focus-visible,
  &:active {
    background-color: ${Colors.Pink};
  }
`
