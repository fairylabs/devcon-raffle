import { useUserBid } from '@/blockchain/hooks/useUserBid'
import { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useAccount, useBalance } from 'wagmi'
import { formatInputAmount } from './formatInputAmount'
import { CloseCircleIcon, EtherIcon } from '../icons'
import { Colors } from '@/styles/colors'
import { formatBalance } from '@/utils/formatters/formatBalance'

interface InputProps {
  initialAmount: string
  setAmount: (val: string) => void
  notEnoughBalance: boolean
  bidTooLow: boolean
}

const numberInputRegex = /^((\d*)|(\d+[.,])|([.,]\d*)|(\d+[.,]\d+))$/

function checkOnChangeLength(value: string) {
  if (value[0] == '.' && value.length > 19) {
    return true
  }

  return value.length > 20
}

export const Input = ({ initialAmount, setAmount, notEnoughBalance, bidTooLow }: InputProps) => {
  const { address } = useAccount()
  const userBalance = useBalance({ address }).data?.value
  const userBid = useUserBid()

  const [inputValue, setInputValue] = useState(initialAmount)

  useEffect(() => setInputValue(initialAmount), [initialAmount])

  const setOnChangeValue = (value: string) => {
    setInputValue(value)
    setAmount(value)
  }

  const onChange = (value: string) => {
    if (!numberInputRegex.test(value)) {
      return
    }

    if (value !== '') {
      value = value.replace(',', '.')
    }

    if (checkOnChangeLength(value)) {
      return
    }

    setOnChangeValue(value)
  }

  const onBlur = (value: string) => {
    if (value !== '') {
      const formattedValue = formatInputAmount(value)
      setOnChangeValue(formattedValue)
    }
  }

  return (
    <InputWrapper $userHasBid={!!userBid}>
      <InputLabel>Balance: {formatBalance(userBalance)} ETH</InputLabel>
      <StyledInputWrapper $isBadAmount={notEnoughBalance || bidTooLow}>
        <TokenIconWrapper>
          <EtherIcon />
        </TokenIconWrapper>
        <StyledInput
          value={inputValue}
          onChange={(e) => onChange(e.target.value)}
          onBlur={(e) => onBlur(e.target.value)}
          role="input"
        />
        <InputTokenName>ETH</InputTokenName>
      </StyledInputWrapper>
      {notEnoughBalance && <ErrorMessage message="Not enough balance" />}
      {!notEnoughBalance && bidTooLow && (
        <ErrorMessage message={userBid ? 'Amount below min increment' : 'Bid amount must be at least Raffle price'} />
      )}
    </InputWrapper>
  )
}

const ErrorMessage = ({ message }: { message: string }) => {
  return (
    <InputErrors>
      <CloseCircleIcon size={16} color={Colors.Red} />
      <InputErrorLabel>{message}</InputErrorLabel>
    </InputErrors>
  )
}

const InputWrapper = styled.div<{ $userHasBid: boolean }>`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  margin-bottom: ${({ $userHasBid }) => ($userHasBid ? '16px' : '12px')};
`

export const InputLabel = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  max-width: 100%;
  margin-bottom: 4px;
  color: ${Colors.Black};
  font-size: 12px;
  line-height: 18px;
`
const StyledInputWrapper = styled.div<{ $isBadAmount?: boolean; disabled?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  width: 100%;
  height: 50px;
  padding: 13px;
  border-width: 2px;
  border-style: solid;
  border-color: ${({ $isBadAmount }) => ($isBadAmount ? Colors.Red : Colors.White)};
  background-color: ${({ disabled }) => (disabled ? Colors.GreyLight : Colors.White)};
  transition: all 0.25s ease;

  &:hover,
  &:focus-visible,
  &:focus-within {
    border-color: ${({ $isBadAmount }) => ($isBadAmount ? Colors.Red : Colors.White)};
  }
`

const StyledInput = styled.input`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  padding-left: 45px;
  border: none;
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  font-size: 16px;
  line-height: 24px;
  outline: none;
  cursor: inherit;
  color: ${Colors.Black};
  transition: all 0.25s ease;

  &,
  &:disabled {
    background-color: transparent;
  }
`

const TokenIconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  overflow: hidden;
  z-index: 2;
`

const InputTokenName = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.Black};
  z-index: 2;
`

const InputErrors = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
  width: 100%;
  max-width: 100%;
  position: absolute;
  top: calc(100% + 4px);
  overflow: hidden;
`

const InputErrorLabel = styled(InputLabel)`
  justify-content: flex-start;
  margin: 0;
  font-weight: 300;
  color: ${Colors.Red};
`
