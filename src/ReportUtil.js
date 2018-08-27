const transform = (x, count, spacing, op) => {
  let buffer = '';
  let buffer1 = '';
  const w = count + spacing;
  let pads;
  switch (op) {
      case 'under':
          {
              for (let i = 0; i < w - spacing; i++) {
                  buffer += '-';
              }
              const ptext = buffer; // need to be a copy?
              pads = "";
              buffer1 += ptext;
              let l = w - ptext.length;
              for (let j = 0; j < l; j++) {
                  pads += " ";
              }
              buffer1 += pads;
          }
          break;
      case 'pad':
          {
              pads = " ";
              let l = spacing;
              while (l > 1) {
                  pads = pads + " ";
                  l = l - 1;
              }
              buffer += x;
              buffer += pads;
              buffer1 += buffer;
          }
          break;
  }
  return buffer1;
}

module.exports = transform;