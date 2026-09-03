import styles from './FlowChain.module.css'

type FlowNode = { label: string; showArrow?: boolean }
type FlowChainProps = {
  nodes: (FlowNode | string)[]
  variant?: 'default' | 'dark' | 'white'
  direction?: 'horizontal' | 'vertical'
}

export function FlowChain({ nodes, variant = 'default', direction = 'horizontal' }: FlowChainProps) {
  const normalized: FlowNode[] = nodes.map((n, i) =>
    typeof n === 'string' ? { label: n, showArrow: i > 0 } : n
  )

  return (
    <div className={`${styles.chain} ${direction === 'vertical' ? styles.vertical : ''}`}>
      {normalized.map((node, i) => (
        <div key={i} className={styles.node}>
          {node.showArrow && (
            <span className={`${styles.arrow} ${variant === 'dark' ? styles.arrowDark : ''}`}>
              {direction === 'vertical' ? '↓' : '→'}
            </span>
          )}
          <span className={`${styles.label} ${styles[variant]}`}>{node.label}</span>
        </div>
      ))}
    </div>
  )
}
