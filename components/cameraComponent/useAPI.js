import useSpeech from "../tts/useSpeech";

const useAPI = () => {
  const { speak } = useSpeech();
  const sendImage = async (picture) => {
    try {
      let formData = new FormData();
      formData.append("file", {
        uri: picture,
        name: "image.jpg",
        type: "image/jpeg",
      });
      let options = {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      };
      console.log("Sendinig data...");
      speak("Sending data to server. Please wait...");

      let response = await fetch(
        "http://742b-34-143-158-177.ngrok.io/predict",
        options
      );

      let responseJson = await response.json();

      const detObj = responseJson["name"][0];
      console.log("detObj: ", detObj);

      if (detObj === undefined) {
        speak("No object detected");
        return;
      }
      speak("There is a " + detObj);

      console.log("responseJson", responseJson);
    } catch (error) {
      console.error(error);
    }
  };

  const testRobo = (image) => {
    console.log("testRobo triggred");
    axios({
      method: "POST",
      url: "https://detect.roboflow.com/fyp-videos-annotations/10",
      params: {
        api_key: "qu0G59VlYOUBlvY0Lon7",
        // image: image.base64,
      },
      data: image.base64,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
      .then(function (response) {
        console.log("robo res->", response.data);
      })
      .catch(function (error) {
        console.log(error.message);
      });
  };
  return { sendImage };
};
export default useAPI;
