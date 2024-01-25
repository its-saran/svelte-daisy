<script>
    export let width = 32;
    export let height = 32;
    export let color = "currentColor"
    const stroke = `stroke: ${color};`
</script>
  
<svg {width} {height} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <defs>
      <style>
          .cls-1 {
              fill: none;
              stroke-linecap: round;
              stroke-linejoin: bevel;
              stroke-width: 1.5px;
          }
      </style>
    </defs>
  
    <g id="ic-actions-close-simple">
      <line style={stroke} class="cls-1" x1="18.36" y1="18.36" x2="5.64" y2="5.64" />
      <line style={stroke} class="cls-1" x1="18.36" y1="5.64" x2="5.64" y2="18.36" />
    </g>
</svg>
  
