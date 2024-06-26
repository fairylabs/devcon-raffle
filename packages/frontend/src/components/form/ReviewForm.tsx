import { TransactionAction, Transactions } from '@/blockchain/transaction'
import { TxFlowSteps } from '../auction/TxFlowSteps'
import { useAccount, useBalance } from 'wagmi'
import { Form, FormRow } from '.'
import { formatEther } from 'viem'
import { Button } from '../buttons'
import { heading } from '../auction/AuctionTransaction'
import { formatBalance } from '@/utils/formatters/formatBalance'

const amountLabel = {
  [Transactions.Place]: 'Your Bid',
  [Transactions.Bump]: 'Your Bid Bump',
  [Transactions.Withdraw]: 'Withdraw amount',
}

interface ReviewFormProps {
  action: TransactionAction
  amount: bigint
  impact?: bigint
  view: TxFlowSteps
  setView: (state: TxFlowSteps) => void
}

export const ReviewForm = ({ action: { status, ...action }, amount, impact, view, setView }: ReviewFormProps) => {
  const { address } = useAccount()
  const etherBalance = useBalance({ address }).data?.value
  const isPending = status === 'pending'

  const sendTransaction = async () => {
    const transactionHash = await action.send()
    transactionHash && setView(view + 1)
  }

  return (
    <Form>
      <FormRow>
        <span>{amountLabel[action.type]}</span>
        <span>{formatEther(amount)} ETH</span>
      </FormRow>
      {!!impact && (
        <FormRow>
          <span>Your Bid after the bump</span>
          <span>{formatEther(impact)} ETH</span>
        </FormRow>
      )}
      <FormRow>
        <span>Wallet Balance</span>
        <span>{formatBalance(etherBalance)} ETH</span>
      </FormRow>
      <Button view="primary" isLoading={isPending} onClick={sendTransaction} wide>
        {heading[action.type]}
      </Button>
    </Form>
  )
}
