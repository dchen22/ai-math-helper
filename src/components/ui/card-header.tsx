import * as React from "react"

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={className}
      {...props}
    />
  )
}

export { CardHeader }
