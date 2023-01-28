import React from "react";

function useTensorHelpers() {
  const drawRectangles = (predictions, nextImageTensor) => {
    // if (!context.current || !canvas.current) {
    //   console.log("No context or canvas");
    //   return;
    // }
    console.log(
      "drawing rectangles .........................................\n"
    );
    // const scaleWidth = canvas.current.width / nextImageTensor.shape[1];
    // const scaleHeight = canvas.current.height / nextImageTensor.shape[0];

    // const flipHorizontal = Platform.OS === "ios" ? false : true;

    // const ctx = context.current;
    // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // const font = "16px sans-serif";
    // ctx.font = font;
    // ctx.textBaseline = "top";
    // predictions.forEach((prediction) => {
    //   const [x, y, width, height] = prediction.bbox;
    //   const boundingBoxX = flipHorizontal
    //     ? canvas.current.width - x * scaleWidth - width * scaleWidth
    //     : x * scaleWidth;

    //   const boundingBoxY = y * scaleHeight;

    //   // draw rectangle
    //   context.current.strokeStyle(
    //     boundingBoxX,
    //     boundingBoxY,
    //     width * scaleWidth,
    //     height * scaleHeight
    //   );

    //   // draw label text
    //   context.current.strokeText(
    //     prediction.class,
    //     boundingBoxX - 5,
    //     boundingBoxY - 5
    //   );
    //   // Draw the bounding box.
    //   ctx.strokeStyle = "#00FFFF";
    //   ctx.lineWidth = 4;

    //   ctx.strokeRect(x, y, width, height);
    //   // Draw the label background.
    //   ctx.fillStyle = "#00FFFF";
    //   const textWidth = ctx.measureText(prediction.class).width;
    //   const textHeight = parseInt(font, 10); // base 10
    //   ctx.fillRect(x, y, textWidth + 4, textHeight + 4);
    // });
    // predictions.forEach((prediction) => {
    //   const x = prediction.bbox[0];
    //   const y = prediction.bbox[1];
    //   // Draw the text last to ensure it's on top.
    //   ctx.fillStyle = "#000000";

    //   ctx.fillText(prediction.class, x, y);
    // });
  };

  // function handleCameraStream(images, updatePreview, gl) {
  //   console.log("handleCameraStream -> ", images);
  //   const loop = async () => {
  //     const nextImageTensor = images.next().value;
  //     if (!nextImageTensor) {
  //       console.log("no tensor");
  //       return;
  //     } else {
  //       console.log("tensor -> ", nextImageTensor);
  //     }
  //     console.log("triggered -> ");
  //     //
  //     // do something with tensor here
  //     //

  //     // if autorender is false you need the following two lines.
  //     // updatePreview();
  //     // gl.endFrameEXP();

  //     requestAnimationFrame(loop);
  //   };
  //   loop();
  // }

  const handleCanvas = async (canvas) => {
    if (canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = width;
      canvas.height = height;
      ctx.fillStyle = "red";
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;

      context.current = ctx;
      canvas.current = canvas;
    }
  };

  const handleCameraStream = (images, model, setClasses) => {
    console.log("handleCameraStream -> ", images);
    const loop = async () => {
      const nextImageTensor = images.next().value;
      if (!model || !nextImageTensor) {
        Speech.stop();
        Speech.speak("No model or image tensor");
        throw new Error("No model or image tensor");
      }

      model
        .detect(nextImageTensor)
        .then((predictions) => {
          console.log("Predictions -> ", predictions);
          console.log("Predictions[0] -> ", predictions[0].class);
          // if (predictions[0].class != detcClass) {
          //   detcClass = predictions[0].class;
          //   setClasses(predictions[0].class);
          // }
          setClasses(predictions[0].class);
          drawRectangles(predictions, nextImageTensor);
        })
        .catch((err) => {
          console.log("error in detetction ->", err);
          throw err;
        });
      // console.log(predictions);

      // Dispose the tensor to release the memory.
      // updatePreview();
      // gl.endFrameEXP();
      nextImageTensor.dispose();
      requestAnimationFrame(loop);
    };
    loop();
  };

  const cameraTexture =
    Platform.OS === "ios"
      ? {
          height: 1920,
          width: 1080,
        }
      : {
          height: 1200,
          width: 1600,
        };

  return { drawRectangles, handleCanvas, handleCameraStream, cameraTexture };
}

export default useTensorHelpers;
