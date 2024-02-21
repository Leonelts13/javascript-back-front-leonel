//import { OPENAI_API_KEY } from '@env';

export const completionApi = async ({prompt }) => {
    if (prompt == '') return //verificamos si el promt esta vacio

    const message = { message: prompt };

    try {
      const response = await fetch('http://192.168.100.8:5000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(message)
      });
      const jsonData = await response.json();
      console.log('Datos creados:', jsonData);
      return jsonData
    } catch (error) {
      console.error('Error al crear datos:', error);
    }

    /* try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${'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'}`
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          temperature: 0,
          messages: [
            {
              "role": "user",
              "content": prompt
            },
            {
              "role": "system",
              "content": "Eres una calculadora que convierte numeros naturales a binarios y respondes diciendo unicamente cual es el resultado de la conversion sin texto adicional"
            }
          ]
        })
      })
  
      const data = await response.json() //convertimos la respuesta a un json
      let numTokens = data.usage?.total_tokens || 0
      let message = data.choices[0]?.message?.content || 'No se puedo procesar la solicitud'
      return { numTokens, message }
    } catch (error) {
      console.log(error)
      throw new Error('Error al obtener la respuesta de la API')
    } */
  }