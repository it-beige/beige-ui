export default (props: { expanded: boolean; onClick: () => void }) => {
  return (
    <svg
      onClick={() => props.onClick}
      style={{
        width: '18px',
        height: '18px',
        display: 'inline-block',
        transform: props.expanded ? 'rotate(90deg)' : ''
      }}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="currentColor" d="M384 192v640l384-320.064z"></path>
    </svg>
  )
}
