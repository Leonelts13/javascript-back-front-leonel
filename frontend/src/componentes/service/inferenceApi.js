

export const inferenceApi = async ({ data }) => {
    try {
      console.log('entraaaaaaaaaaaamos al try??????????????')
      const response = await fetch('http://192.168.100.8:3000/upload', { //se manda la ip de la pc para que el celular pueda detectar el localhost
        method: 'POST',
        body: data
      });
      console.log('***********************', response)
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
      return json;
    } catch (error) {
      console.error('Error al obtener la respuesta de la API usando LangChain:********', error);
      throw error; // Propaga el error para que el llamador pueda manejarlo
    }
  };
  