import styles from './FlowChain.module.css'

type FlowNode = { label: string; showArrow?: boolean }
type FlowChainProps = {
  nodes: (FlowNode | string)[]
  variant?: 'default' | 'dark' | 'white'
  direction?: 'horizontal' | 'vertical'
}

export function FlowChain({ nodes, variant = 'default', direction = 'horizontal' }: FlowChainProps) {
  const isVertical = direction === 'vertical'

  return (
    <div className={`${styles.chain} ${isVertical ? styles.vertical : ''}`}>
      {nodes.map((n, i) => {
        const label = typeof n === 'string' ? n : n.label
        const isLast = i === nodes.length - 1
        const showArrow = typeof n === 'string' ? !isLast : (n.showArrow !== false && !isLast)

        return (
          <div key={i} className={styles.node}>
            <span className={`${styles.label} ${styles[variant]}`}>{label}</span>
            {showArrow && (
              <span className={`${styles.arrow} ${variant === 'dark' ? styles.arrowDark : ''}`}>
                {isVertical ? '↓' : '→'}
              </span>
            )}
          </div>
        )
      })}
    </div>
  )
}
