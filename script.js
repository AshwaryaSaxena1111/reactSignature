const canvas = document.getElementById('signatureCanvas');
    const ctx = canvas.getContext('2d');
    let Drawing = false;
    let lastX = 0;
    let lastY = 0;

    canvas.addEventListener('mousedown', (e) => {
      Drawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', (e) => {
      if (Drawing) {
        const x = e.offsetX;
        const y = e.offsetY;
        ctx.strokeStyle = document.getElementById('penColor').value;
        ctx.lineWidth = document.getElementById('penWidth').value;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
      }
    });

    canvas.addEventListener('mouseup', () => {
      Drawing = false;
    });

    function clearCanvas() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    function downloadSignature() {
      const dataUrl = canvas.toDataURL('image/png');
      const pdf = new pdf();
      pdf.addImage(dataUrl, 'PNG', 0, 0, canvas.width, canvas.height);
      pdf.save('signature.pdf');
    }