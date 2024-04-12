import {IconBase, IconProps} from '@/components/icons/IconBase'

export const RedirectIcon = ({color, size, className}: IconProps) => {
  return (
    <IconBase color={color} size={size} className={className}>
      <path
        d="M12.5 12.25C12.4337 12.25 12.3701 12.2763 12.3232 12.3232C12.2763 12.3701 12.25 12.4337 12.25 12.5V19.5C12.25 19.5663 12.2763 19.6299 12.3232 19.6768C12.3701 19.7237 12.4337 19.75 12.5 19.75H19.5C19.5663 19.75 19.6299 19.7237 19.6768 19.6768C19.7237 19.6299 19.75 19.5663 19.75 19.5V18.75C19.75 18.3358 20.0858 18 20.5 18C20.9142 18 21.25 18.3358 21.25 18.75V19.5C21.25 19.9641 21.0656 20.4092 20.7374 20.7374C20.4092 21.0656 19.9641 21.25 19.5 21.25H12.5C12.0359 21.25 11.5908 21.0656 11.2626 20.7374C10.9344 20.4092 10.75 19.9641 10.75 19.5V12.5C10.75 12.0359 10.9344 11.5908 11.2626 11.2626C11.5908 10.9344 12.0359 10.75 12.5 10.75H13.25C13.6642 10.75 14 11.0858 14 11.5C14 11.9142 13.6642 12.25 13.25 12.25H12.5Z"
        fill="currentColor"
      />
      <path
        d="M16 11.5C16 11.0858 16.3358 10.75 16.75 10.75H20.5C20.9142 10.75 21.25 11.0858 21.25 11.5V15.25C21.25 15.6642 20.9142 16 20.5 16C20.0858 16 19.75 15.6642 19.75 15.25V13.3107L16.0607 17C15.7678 17.2929 15.2929 17.2929 15 17C14.7071 16.7071 14.7071 16.2322 15 15.9393L18.6893 12.25H16.75C16.3358 12.25 16 11.9142 16 11.5Z"
        fill="currentColor"
      />
    </IconBase>
  )
}
