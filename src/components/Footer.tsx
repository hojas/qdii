export function Footer() {
  return (
    <footer className="mt-16 pt-8 border-t border-[var(--color-border)]">
      <div className="flex flex-col md:flex-row justify-between gap-4 text-xs text-[var(--color-text-muted)]">
        <p>
          数据来源: stock-sdk / 东方财富。基金规模为近似值，仅供参考。
        </p>
        <p className="flex items-center gap-3">
          <span>不构成投资建议</span>
          <span className="text-[var(--color-border)]">|</span>
          <span>数据延迟约15-30秒</span>
        </p>
      </div>
    </footer>
  );
}
