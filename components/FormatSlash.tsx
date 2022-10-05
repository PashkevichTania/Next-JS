const styles = {
  BoxSizing: "border-box",
  display: "inline-block",
  transform: "rotate(25deg) translateY(2px)",
  width: "2px",
  height: "15px",
  background: "red",
  borderRadius: "3px",
}

const FormatSlash = ({ className }: { className?: string }) => {
  return <i className={className} style={styles}></i>
}

export default FormatSlash
