export   function calcCoordinates(e: any,ref:React.MutableRefObject<HTMLDivElement | null>) {
    let x = 0,
      y = 0;
    if (ref.current) {
      const { width, left, top } = ref.current.getBoundingClientRect();
      const size = width / 8;
      y = Math.floor((e.clientX - left) / size);
      x = Math.floor((e.clientY - top) / size);
    }
    return { x, y };
  }